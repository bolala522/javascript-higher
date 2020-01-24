
<?php
header('Content-Type:text/event-stream');
ini_set('max_execution_time', 10);
header('cache-control:no-cache');
//默认请求最大30秒
error_reporting(0);
while(true){	//不断推送消息
    $time = date('r');
    echo "data: The server time is: {$time}\n\n";
    //输出的特殊格式
    ob_flush();flush();sleep(1);
}
?>

