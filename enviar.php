<?php
// Configuración de la base de datos
$host = "localhost";        // Cambiar si es necesario
$usuario = "root";          // Usuario de la BD
$contrasena = "";           // Contraseña
$base_de_datos = "cofftours"; // Cambia esto por el nombre de tu base

// Crear conexión
$conn = new mysqli($host, $usuario, $contrasena, $base_de_datos);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$pais = $_POST['pais'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$observaciones = $_POST['observaciones'] ?? '';

// Validación básica
if (!empty($nombre) && !empty($pais) && !empty($telefono)) {
    // Preparar y ejecutar consulta
    $stmt = $conn->prepare("INSERT INTO contacto (nombre, email, pais_region, telefono, observaciones) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $email, $pais, $telefono, $observaciones);

    if ($stmt->execute()) {
        echo "¡Formulario enviado correctamente!";
    } else {
        echo "Error al guardar los datos: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Por favor completa los campos obligatorios.";
}

$conn->close();
?>
