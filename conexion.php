<?php
$host = "localhost";
$user = "root"; // Cambia esto si tu usuario de MySQL es diferente
$password = "";
$dbname = "sistema_usuarios";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
