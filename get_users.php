<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT id_usuario, username, email, tipo, fecha_registro FROM usuarios");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener usuarios: ' . $e->getMessage()]);
}
?>