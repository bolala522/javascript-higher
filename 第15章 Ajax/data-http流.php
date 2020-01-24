
<?php
ini_set('max_execution_time', 10);
//默认请求最大30秒
error_reporting(0);
$i = 0;
while(true){	//不断推送消息
    echo "Number is $i\n";
    ob_flush();	//将php缓存冲出
    flush();	//从php缓存中输出到tcp缓存
    $i++;
    sleep(1);
}
?>



