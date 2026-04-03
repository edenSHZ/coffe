<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id_reserva']) || !isset($data['estado_pago'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$id_reserva = $data['id_reserva'];
$estado_pago = $data['estado_pago'];

try {
    $sql = "UPDATE reservas SET estado_pago = ? WHERE id_reserva = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$estado_pago, $id_reserva]);
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>