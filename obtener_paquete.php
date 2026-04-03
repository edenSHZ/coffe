<?php
header('Content-Type: application/json');

$id_paquete = $_GET['id_paquete'] ?? '';
if (empty($id_paquete)) {
    echo json_encode(['error' => 'ID de paquete no proporcionado']);
    exit;
}

$conexion = new mysqli("localhost", "root", "", "coffetours");
if ($conexion->connect_error) {
    echo json_encode(['error' => 'Error de conexión a la BD']);
    exit;
}

$query = "SELECT nombre, descripcion, precio, imagen_principal, fecha_inicio, fecha_fin FROM paquetes WHERE id_paquete = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $id_paquete);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode($resultado->fetch_assoc());
} else {
    echo json_encode(['error' => 'Paquete no encontrado']);
}

$stmt->close();
$conexion->close();
?>