<?php
$host = 'localhost'; 
$dbname = 'coffetours'; 
$username = 'root'; 
$password = ''; 

try {
    $conexion = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo = $conexion;
    
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

function sanitizar($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
?>