<?php
session_start();
header('Content-Type: application/json');

// Destruir la sesión
$_SESSION = array();
session_destroy();

echo json_encode(['success' => true]);
?>