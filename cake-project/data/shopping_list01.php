<?php
header("Content-Type:application/json;charset=utf-8");
@$uid=$_REQUEST['uid'] or die('{"code":-2,"msg":"用户id是必须的"}');
require('init.php');
$sql="SELECT c.cid,p.pic_md,p.pname,p.price,c.count,p.pid FROM";
$sql.=" t_cart c,product p WHERE c.pid=p.pid AND c.uid=$uid";
$result=mysqli_query($conn,$sql);
//5.抓取多条记录
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($rows);
?>