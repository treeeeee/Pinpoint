<?php
    header("Content-Type:application/json;charset=utf-8");
    require('init.php');
    $pid=$_REQUEST['pid'];
    if($pid<4){
        $pid=6;
        }else if($pid>32){
            $pid=29;
        };
    $sql="SELECT * FROM product WHERE (pid>=$pid-2 AND pid<$pid) OR (pid>$pid AND pid<=$pid+3)";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $str=json_encode($rows);
    echo $str;
?>