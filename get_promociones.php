<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'coffetours';
$username = 'root';
$password = '';

try {
    // Conexión a la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener TODOS los paquetes (sin filtro de fecha)
    $query = "SELECT 
                id_paquete, 
                nombre, 
                descripcion, 
                precio, 
                imagen_principal, 
                DATE_FORMAT(fecha_inicio, '%d') AS dia_inicio,
                DATE_FORMAT(fecha_inicio, '%M') AS mes_inicio,
                DATE_FORMAT(fecha_fin, '%d') AS dia_fin,
                DATE_FORMAT(fecha_fin, '%M') AS mes_fin
            FROM paquetes
            ORDER BY fecha_inicio ASC";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $paquetes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Procesar imágenes: asegurar que la ruta es correcta
    foreach ($paquetes as &$paquete) {
        // Si la imagen no tiene ruta completa, añadir la carpeta base
        if (!empty($paquete['imagen_principal']) && strpos($paquete['imagen_principal'], 'imagenes/') === false) {
            $paquete['imagen_principal'] = 'imagenes/' . $paquete['imagen_principal'];
        }

        // Formatear fechas en español (ej: "22 DE FEBRERO")
        $meses_ES = [
            'January' => 'ENERO', 'February' => 'FEBRERO', 'March' => 'MARZO',
            'April' => 'ABRIL', 'May' => 'MAYO', 'June' => 'JUNIO',
            'July' => 'JULIO', 'August' => 'AGOSTO', 'September' => 'SEPTIEMBRE',
            'October' => 'OCTUBRE', 'November' => 'NOVIEMBRE', 'December' => 'DICIEMBRE'
        ];
        $paquete['fecha_formateada'] = $paquete['dia_inicio'] . ' DE ' . $meses_ES[$paquete['mes_inicio']];
    }

    if (empty($paquetes)) {
        echo json_encode(['error' => 'No hay paquetes disponibles.']);
    } else {
        echo json_encode($paquetes);
    }

} catch(PDOException $e) {
    echo json_encode([
        'error' => 'Error de conexión a la base de datos.',
        'detalles' => $e->getMessage()  // Solo para desarrollo, quitar en producción
    ]);
}
?>
