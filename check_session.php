<?php
session_start();
header('Content-Type: application/json');

$response = [
    'loggedIn' => false,
    'username' => ''
];

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $response['loggedIn'] = true;
    $response['username'] = $_SESSION['username'];
}

echo json_encode($response);
?>