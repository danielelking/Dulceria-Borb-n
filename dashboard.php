<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: login.html");
    exit();
}

echo "Bienvenido, " . $_SESSION['usuario'] . "! <a href='logout.php'>Cerrar sesión</a>";
?>
