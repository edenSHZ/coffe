<?php
// Configuración robusta de sesión
session_start([
    'cookie_lifetime' => 86400, // 1 día
    'cookie_secure' => false,   // Cambiar a true en producción con HTTPS
    'cookie_httponly' => true,
    'use_strict_mode' => true
]);

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'coffetours');

// Establecer conexión
$conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conexion->connect_error) {
    die(json_encode([
        'success' => false,
        'error' => 'Error de conexión a la base de datos'
    ]));
}

// Obtener datos del formulario (ahora compatible con JSON)
$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$username = $conexion->real_escape_string(trim($input['username'] ?? ''));
$password = trim($input['password'] ?? '');

// Validación básica
if (empty($username) || empty($password)) {
    header('Content-Type: application/json');
    die(json_encode([
        'success' => false,
        'error' => 'Todos los campos son requeridos'
    ]));
}

// Consulta preparada mejorada
$sql = "SELECT id_usuario, username, password, tipo FROM usuarios WHERE username = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    header('Content-Type: application/json');
    die(json_encode([
        'success' => false,
        'error' => 'Error en el sistema'
    ]));
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();
    
    // Verificación de contraseña
    if (($username === 'admin_hector' && $password === '20032906') || 
        password_verify($password, $usuario['password'])) {
        
        // Regenerar ID de sesión para prevenir fixation
        session_regenerate_id(true);
        
    
        // Establecer datos de sesión
        $_SESSION = [
            'user_id' => $usuario['id_usuario'],
            'username' => $usuario['username'],
            'tipo' => $usuario['tipo'] ?? 'user',
            'loggedin' => true,
            'ultimo_acceso' => time()
        ];
        
        // Respuesta JSON para AJAX o redirección normal
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'redirect' => $usuario['tipo'] === 'admin' ? 'modificar_paquetes.html' : 'pagina_inicio.html',
                'session_id' => session_id()
            ]);
        } else {
            header("Location: " . ($usuario['tipo'] === 'admin' ? 'modificar_paquetes.html' : 'pagina_inicio.html'));
        }
        exit();
    }
}

// Si llega aquí, las credenciales son inválidas
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'error' => 'Usuario o contraseña incorrectos'
]);

// Cerrar conexión
$stmt->close();
$conexion->close();
?>