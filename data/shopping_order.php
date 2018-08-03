<?php
    header("Content-Type:application/json;charset=utf-8");
    //功能6：点击确认订单按钮跳转到成功提交订单，并将订单数据
    require('init.php');
    @$uid=$_REQUEST['uid'] or die('{"code":-6,"msg":"用户编号是必须的"}');
    @$conName=$_REQUEST['conName'] or die('{"code":-1,"msg":"用户名是必须的"}');
    @$phoneNum=$_REQUEST['phoneNum'] or die('{"code":-2,"msg":"用户联系方式是必须的"}');
    @$address=$_REQUEST['address'] or die('{"code":-3,"msg":"用户联系方式是必须的"}');
    @$price=$_REQUEST['price'] or die('{"code":-4,"msg":"价格是必须的"}');
    @$payment=$_REQUEST['payment'] or die('{"code":-5,"msg":"用户支付方式是必须的"}');
    $sql="INSERT INTO t_order VALUES(NULL,'$conName','$phoneNum',$price,$payment,now(),$uid)";
    mysqli_query($conn,$sql);
    //获取刚刚插入订单的$orderId
    $orderId=mysqli_insert_id($conn);//返回连接上刚刚执行insert语句产生自增编号.
//查询当前用户购物车商品信息
    $sql="SELECT * FROM t_cart WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    //    echo json_encode($rows);
//遍历每一件购物车中商品的产品号和数量
    foreach($rows as $row){
        $pid=$row['pid'];
        $count=$row['count'];
//插入订单详情表
        $sql="INSERT INTO t_order_detail VALUES (NULL,$orderId,$pid,$count)";
        mysqli_query($conn,$sql);
    }
    //订单提交后删除该用户购物车的数据
    $sql = "DELETE FROM t_cart WHERE uid=$uid";
    mysqli_query($conn,$sql);
    //输出订单编号到客户端
    echo $orderId;
?>