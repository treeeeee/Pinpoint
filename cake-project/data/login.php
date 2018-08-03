<?php
header("Content-Type:application/json;charset=utf-8");
$unameOrPhone=$_REQUEST['unameOrPhone'] or die("用户名或手机号是必须的");
$upwd=$_REQUEST['upwd']  or die("密码是必须的");
require('init.php');
$sql="SELECT uid,uname,phone FROM t_user WHERE (uname='$unameOrPhone' AND upwd='$upwd') OR (phone='$unameOrPhone' AND upwd='$upwd')";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
  $output['code'] = 1;
  $output['uid'] = intval($row['uid']);
  $output['uname'] = $row['uname'];
  $output['phone'] = $row['phone'];
}else {
  $output['code'] = -1;
}
echo json_encode($output);
?>