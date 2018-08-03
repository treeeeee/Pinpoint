<?php
header("Content-Type:application/json;charset=utf-8");
//功能：购物车数量显示
//如果没有用户名就显示数量为0
@$uid=$_REQUEST['uid'] or die('{"code":-1,"count":0}');
require('init.php');
//查询当前用户购物车列表的购物车编号
$sql="SELECT cid FROM t_cart WHERE uid=$uid";
$result=mysqli_query($conn,$sql);
//5.抓取多条记录
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//查询结果的购物车数量
$count=sizeof($rows);
echo '{"count":'.$count.'}';
?>