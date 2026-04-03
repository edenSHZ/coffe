<?php
// Configuración detallada de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// Configuración de sesión
session_start();

// Headers para CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Verificar sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

// Conexión a la base de datos
$conn = new mysqli('localhost', 'root', '', 'coffetours');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a BD']);
    exit;
}

// Obtener datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Validación básica
if (empty($data['nombre_completo']) || empty($data['email']) || empty($data['telefono']) || empty($data['pais']) || empty($data['mensaje'])) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit;
}

// Preparar datos
$id_usuario = $_SESSION['id_usuario'];
$nombre = $conn->real_escape_string($data['nombre_completo']);
$email = $conn->real_escape_string($data['email']);
$telefono = $conn->real_escape_string($data['telefono']);
$pais = $conn->real_escape_string($data['pais']);
$mensaje = $conn->real_escape_string($data['mensaje']);

// Consulta SQL para insertar
$sql = "INSERT INTO contacto (id_usuario, nombre_completo, email, telefono, pais, observaciones) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar consulta']);
    exit;
}

$stmt->bind_param("isssss", $id_usuario, $nombre, $email, $telefono, $pais, $mensaje);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Mensaje guardado']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar']);
}

$stmt->close();
$conn->close();
?>