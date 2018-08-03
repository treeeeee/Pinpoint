<?php
    header("Content-Type:application/json;charset=utf-8");
    @$oid=$_REQUEST['oid'] or die('{"code":-1,"msg":"订单id是必须的"}');
    require ('init.php');
    $sql="DELETE FROM t_order_detail WHERE orderId=$oid";
    mysqli_query($conn,$sql);
    $sql="DELETE FROM t_order WHERE 
oid=$oid";
    $result=mysqli_query($conn,$sql);
    if($result===true){
        echo '{"code":1,"msg":"删除成功"}';
    }else{
        echo '{"code":-2,"msg":"删除失败"}';
    }

?>