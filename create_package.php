<?php
require 'conexion.php';
header('Content-Type: application/json');

session_start(); // Asegúrate de tener la sesión iniciada

// Obtener el ID del admin desde la sesión (ejemplo)
$id_admin = $_SESSION['admin_id'] ?? 11; // Usa 1 como fallback, pero deberías manejar el caso cuando no hay sesión

$data = json_decode(file_get_contents('php://input'), true);

// Validación
$required = ['nombre', 'descripcion', 'precio', 'imagen_principal', 'fecha_inicio', 'fecha_fin'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "El campo $field es requerido"]);
        exit;
    }
}

try {
    // Verificar que el admin existe
    $stmt = $pdo->prepare("SELECT 1 FROM administradores WHERE id_admin = ?");
    $stmt->execute([$id_admin]);
    
    if (!$stmt->fetch()) {
        throw new PDOException("El administrador con ID $id_admin no existe");
    }

    // Insertar el paquete
    $stmt = $pdo->prepare("INSERT INTO paquetes 
                          (nombre, descripcion, precio, imagen_principal, fecha_inicio, fecha_fin, id_admin) 
                          VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        sanitizar($data['nombre']),
        sanitizar($data['descripcion']),
        $data['precio'],
        sanitizar($data['imagen_principal']),
        $data['fecha_inicio'],
        $data['fecha_fin'],
        $id_admin
    ]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al crear paquete: ' . $e->getMessage()]);
}
?>