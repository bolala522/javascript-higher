<?php
header('Content-Type:text/plain;charset=utf-8');
$count=$_GET['name'];
$data=array("name"=>$count,"price"=>rand(1,10));
echo json_encode($data);



