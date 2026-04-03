<?php
$conn = new mysqli("localhost", "root", "", "coffetours");
if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
} else {
    echo "¡Conexión exitosa a la base de datos!";
    $conn->close();
}
?>