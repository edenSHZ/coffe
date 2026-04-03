<?php
require 'conexion.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id_paquete'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de paquete no proporcionado']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE paquetes SET 
                          nombre = ?,
                          descripcion = ?,
                          precio = ?,
                          imagen_principal = ?,
                          fecha_inicio = ?,
                          fecha_fin = ?
                          WHERE id_paquete = ?");
    
    $success = $stmt->execute([
        sanitizar($data['nombre']),
        sanitizar($data['descripcion']),
        $data['precio'],
        sanitizar($data['imagen_principal']),
        $data['fecha_inicio'],
        $data['fecha_fin'],
        $data['id_paquete']
    ]);
    
    echo json_encode(['success' => $success]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al actualizar paquete: ' . $e->getMessage()]);
}
?>