<?php
    header("Content-Type:application/json;charset=utf-8");
    @$cid=$_REQUEST['cid'] or die('{"code":-1,"msg":"购物车id是必须的"}');
    require('init.php');
    $sql="DELETE FROM t_cart WHERE cid=$cid";
    $result=mysqli_query($conn,$sql);
    if($result===true){
        echo '{"code":1,"msg":"删除成功"}';
    }else{
        echo '{"code":-1,"msg":"删除失败"}';
    }
?>