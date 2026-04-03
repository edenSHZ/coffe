<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'coffetours';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        echo json_encode(['error' => 'ID de paquete no proporcionado']);
        exit;
    }

    $query = "SELECT * FROM paquetes WHERE id_paquete = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $paquete = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$paquete) {
        echo json_encode(['error' => 'Paquete no encontrado']);
    } else {
        echo json_encode($paquete);
    }

} catch(PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
}
?>