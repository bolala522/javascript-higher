<?php
header('Content-Type:text/plain;charset=utf-8');
$name = $_POST["name"];
$email = $_POST["email"];
if ($name == "" || $email == "") {
    echo "服务器端验证失败！";
} else {
    echo "服务器端验证成功！";
}
?>




