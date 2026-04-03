<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM paquetes ORDER BY fecha_inicio DESC");
    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($packages)) {
        echo json_encode(['message' => 'No hay paquetes registrados']);
    } else {
        echo json_encode($packages);
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener paquetes: ' . $e->getMessage()]);
}
?>