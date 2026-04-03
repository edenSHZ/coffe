<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'conexion.php';

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]);
    exit;
}

// Verificar si las tablas existen
$tables = ['reservas', 'usuarios', 'paquetes', 'metodos_pago'];
foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows == 0) {
        echo json_encode(['error' => "La tabla $table no existe"]);
        exit;
    }
}

try {
    // Consulta SQL mejorada con alias más claros y manejo de posibles NULL
    $query = "SELECT 
                r.id_reserva, 
                u.username AS nombre_usuario, 
                p.nombre AS nombre_paquete, 
                r.fecha_reserva, 
                r.fecha_viaje, 
                r.cantidad_personas, 
                r.monto_total, 
                r.estado_pago, 
                m.nombre AS metodo_pago
            FROM reservas r
            LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
            LEFT JOIN paquetes p ON r.id_paquete = p.id_paquete
            LEFT JOIN metodos_pago m ON r.id_metodo = m.id_metodo
            ORDER BY r.fecha_reserva DESC";
    
    error_log("Consulta SQL ejecutada: " . $query); // Log para depuración
    
    $result = $conn->query($query);
    
    if (!$result) {
        $errorMsg = 'Error en consulta SQL: ' . $conn->error;
        error_log($errorMsg);
        echo json_encode(['error' => $errorMsg]);
        exit;
    }
    
    $reservas = [];
    while ($row = $result->fetch_assoc()) {
        $reservas[] = $row;
    }
    
    error_log("Número de reservas encontradas: " . count($reservas)); // Log cantidad
    
    if (empty($reservas)) {
        echo json_encode([
            'error' => 'No hay reservas en la base de datos',
            'debug' => 'Las tablas existen pero no hay datos o los JOIN no coinciden'
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'count' => count($reservas),
            'data' => $reservas
        ]);
    }
    
} catch (Exception $e) {
    $errorMsg = 'Excepción: ' . $e->getMessage();
    error_log($errorMsg);
    echo json_encode(['error' => $errorMsg]);
}

$conn->close();
?>