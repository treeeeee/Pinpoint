<?php
    header("Content-Type:application/json;charset=utf-8");
    @$pid=$_REQUEST['pid'] or die('{"code":-1,"msg":"产品好是必须的"}');
    require('init.php');
    $sql="SELECT * FROM product WHERE pid=$pid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    echo json_encode($row);
?>