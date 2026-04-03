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
    $stmt = $pdo->prepare("DELETE FROM paquetes WHERE id_paquete = ?");
    $stmt->execute([$data['id_paquete']]);
    
    echo json_encode(['success' => $stmt->rowCount() > 0]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al eliminar paquete: ' . $e->getMessage()]);
}
?>