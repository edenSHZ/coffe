<?php
header('Content-Type: application/json');
require_once 'conexion.php';

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID de reserva no proporcionado']);
    exit;
}

$id_reserva = $_GET['id'];

$sql = "SELECT r.*, u.username AS nombre_usuario, u.email AS email_usuario, 
            p.nombre AS nombre_paquete, m.nombre AS metodo_pago
        FROM reservas r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
        JOIN paquetes p ON r.id_paquete = p.id_paquete
        JOIN metodos_pago m ON r.id_metodo = m.id_metodo
        WHERE r.id_reserva = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_reserva);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $reserva = $result->fetch_assoc();
    echo json_encode($reserva);
} else {
    echo json_encode(['error' => 'Reserva no encontrada']);
}

$stmt->close();
$conn->close();
?>