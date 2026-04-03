<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = ['success' => false, 'users' => []];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT id_usuario, username, email, tipo, fecha_registro FROM usuarios");
    $stmt->execute();
    
    $response['users'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['success'] = true;
} catch(PDOException $e) {
    $response['message'] = "Error: " . $e->getMessage();
}

echo json_encode($response);
?>