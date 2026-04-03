<?php
// Configuración robusta de sesión
session_start([
    'cookie_lifetime' => 86400, // 1 día
    'cookie_secure' => false,   // Cambiar a true en producción con HTTPS
    'cookie_httponly' => true,
    'use_strict_mode' => true
]);

// Configuración inicial
header('Content-Type: application/json');

// Verificar sesión de usuario
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true || !isset($_SESSION['user_id'])) {
    http_response_code(401);
    die(json_encode([
        'error' => 'Debes iniciar sesión para reservar',
        'session_status' => session_status(),
        'session_id' => session_id()
    ]));
}

// Conexión a la base de datos
require 'conexion.php'; // Archivo que contiene la conexión PDO

// Verificar método de solicitud
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Método no permitido']));
}

// Obtener datos del cuerpo de la solicitud (compatible con JSON y FormData)
$input = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    $input = $_POST;
}

// Validar campos requeridos
$required_fields = ['id_paquete', 'fecha_viaje', 'personas', 'monto_total', 'id_metodo'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        die(json_encode(['error' => "Falta el campo requerido: $field"]));
    }
}

try {
    // Validación y sanitización de datos
    $id_paquete = filter_var($input['id_paquete'], FILTER_VALIDATE_INT);
    $fecha_viaje = $input['fecha_viaje'];
    $personas = filter_var($input['personas'], FILTER_VALIDATE_INT);
    $monto_total = filter_var(
        str_replace(['$', ','], '', $input['monto_total']),
        FILTER_VALIDATE_FLOAT
    );
    $id_metodo = filter_var($input['id_metodo'], FILTER_VALIDATE_INT);

    // Validaciones adicionales
    if ($id_paquete === false || $id_paquete < 1) {
        throw new Exception('ID de paquete inválido');
    }

    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_viaje)) {
        throw new Exception('Formato de fecha inválido. Use YYYY-MM-DD');
    }

    if ($personas === false || $personas < 1) {
        throw new Exception('Número de personas inválido');
    }

    if ($monto_total === false || $monto_total <= 0) {
        throw new Exception('Monto total inválido');
    }

    if ($id_metodo === false || $id_metodo < 1) {
        throw new Exception('Método de pago inválido');
    }

    // Verificar existencia del paquete
    $stmt = $pdo->prepare("SELECT id_paquete, precio FROM paquetes WHERE id_paquete = ?");
    $stmt->execute([$id_paquete]);
    
    if ($stmt->rowCount() === 0) {
        throw new Exception('El paquete seleccionado no existe');
    }

    // Obtener precio base para validación adicional
    $paquete = $stmt->fetch(PDO::FETCH_ASSOC);
    $precio_base = (float)$paquete['precio'];
    
    // Validación de monto (opcional pero recomendado)
    $monto_minimo = $precio_base * $personas * 0.9; // 90% del precio mínimo esperado
    $monto_maximo = $precio_base * $personas * 1.5; // 150% del precio máximo esperado
    
    if ($monto_total < $monto_minimo || $monto_total > $monto_maximo) {
        throw new Exception('El monto total no coincide con el precio del paquete');
    }

    // Verificar existencia del método de pago
    $stmt = $pdo->prepare("SELECT id_metodo FROM metodos_pago WHERE id_metodo = ?");
    $stmt->execute([$id_metodo]);
    
    if ($stmt->rowCount() === 0) {
        throw new Exception('El método de pago seleccionado no existe');
    }

    // Insertar reserva
    $stmt = $pdo->prepare("
        INSERT INTO reservas (
            id_usuario,
            id_paquete,
            id_metodo,
            fecha_viaje,
            cantidad_personas,
            monto_total,
            estado_pago,
            fecha_reserva
        ) VALUES (
            :id_usuario,
            :id_paquete,
            :id_metodo,
            :fecha_viaje,
            :personas,
            :monto_total,
            'pendiente',
            NOW()
        )
    ");

    $stmt->execute([
        ':id_usuario' => $_SESSION['user_id'],
        ':id_paquete' => $id_paquete,
        ':id_metodo' => $id_metodo,
        ':fecha_viaje' => $fecha_viaje,
        ':personas' => $personas,
        ':monto_total' => $monto_total
    ]);

$reserva_id = $pdo->lastInsertId();

$response = [
    'success' => true,
    'reserva_id' => $reserva_id,
    'redirect' => 'finalizar-compra.html?id=' . $reserva_id,
    'session_info' => [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'] ?? ''
    ]
];

// Limpia el buffer de salida por si hay algún texto extra
ob_clean();
header('Content-Type: application/json');
echo json_encode($response);
exit();

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error en la base de datos',
        'details' => $e->getMessage(),
        'code' => $e->getCode()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}