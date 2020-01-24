<?php
header('Content-Type:text/plain;charset=utf-8');
$callback=$_GET['callback'];
$code=$_GET['code'];
$data=array("code"=>$code,"price"=>288,"ticket"=>34);
$data=$callback.'('.json_encode($data).')';
echo $data;
//flight({"code":"ca1998","price":288,"ticket":34})






