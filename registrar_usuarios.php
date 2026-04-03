<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    
    $errores = [];
    
    
    if ($password !== $confirm_password) {
        $errores[] = "Las contraseñas no coinciden";
    }
    
   
    if (strlen($password) < 8) {
        $errores[] = "La contraseña debe tener al menos 8 caracteres";
    }
    
    
    if (empty($errores)) {
        try {
           
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            
            // Preparar la consulta SQL
            $sql = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $conexion->prepare($sql);
            
            // Vincular parámetros
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password_hash);
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                
                header("Location: inicio_sesion.html");
                exit();
            } else {
                $errores[] = "Error al registrar el usuario";
            }
        } catch(PDOException $e) {
           
            if ($e->getCode() == 23000) {
                if (strpos($e->getMessage(), 'username') !== false) {
                    $errores[] = "El nombre de usuario ya está en uso";
                } elseif (strpos($e->getMessage(), 'email') !== false) {
                    $errores[] = "El correo electrónico ya está registrado";
                }
            } else {
                $errores[] = "Error en la base de datos: " . $e->getMessage();
            }
        }
    }
}
?>