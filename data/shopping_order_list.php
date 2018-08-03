<?php
    header("Content-Type:application/json;charset=utf-8");
//订单详情页面
    @$uid=$_REQUEST['uid'] or die('{"code":-1,"msg":"用户编号是必须的"}');
    require ('init.php');
    $sql="SELECT * FROM t_order WHERE userId=$uid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    for($i=0;$i<sizeof($rows);$i++){
        $oid=$rows[$i]['oid'];
        $sql="SELECT * FROM product WHERE pid IN (SELECT productId FROM t_order_detail WHERE orderId=$oid)";
        $result=mysqli_query($conn,$sql);
        //获取的商品信息
        $productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
//        echo json_encode($productList);
        $rows[$i]['productList']=$productList;
    }
    echo json_encode($rows);
?>