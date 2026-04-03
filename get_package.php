<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = [
    'success' => false,
    'message' => '',
    'package' => null
];

// Verificar que se recibió el ID del paquete
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    $response['message'] = 'ID de paquete no válido o no proporcionado';
    http_response_code(400);
    echo json_encode($response);
    exit;
}

$packageId = (int)$_GET['id'];

try {
    $stmt = $pdo->prepare("SELECT 
                          id_paquete,
                          nombre,
                          descripcion,
                          precio,
                          imagen_principal,
                          DATE_FORMAT(fecha_inicio, '%Y-%m-%d') as fecha_inicio,
                          DATE_FORMAT(fecha_fin, '%Y-%m-%d') as fecha_fin
                          FROM paquetes 
                          WHERE id_paquete = ?");
    
    $stmt->execute([$packageId]);
    $package = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($package) {
        $response = [
            'success' => true,
            'package' => $package,
            'message' => 'Paquete encontrado'
        ];
    } else {
        $response['message'] = 'Paquete no encontrado';
        http_response_code(404);
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    $response['message'] = "Error al obtener paquete: " . $e->getMessage();
    error_log("Error en paquetes.php: " . $e->getMessage());
}

echo json_encode($response);
?>