<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['usuario'] = $row['nombre'];
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Contraseña incorrecta. <a href='login.html'>Intenta nuevamente</a>";
        }
    } else {
        echo "No existe una cuenta con este email. <a href='registro.html'>Regístrate aquí</a>";
    }
}

$conn->close();
?>
