
<?php
header('Content-Type:application/json;charset=utf-8');
$name=$_GET["name"];//接收GET方式传递的参数
$arr = [
    "name" => $name,
    "age" => 25,
    'data' => [
        'phone' => 'oppo',
        'pc' => 'xiaomi'
    ]
];
echo json_encode($arr);
?>





