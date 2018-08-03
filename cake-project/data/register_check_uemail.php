<?php
/**
*验证用户名是否已经存在
*请求参数：
  email-邮箱
*输出结果：
* {"code":1,"msg":"exist"}  存在
* 或
* {"code":2,"msg":"non-exist"}  不存在
*/
@$email = $_REQUEST['email'] or die('email required');
require('init.php');

$sql = "SELECT uid FROM t_user WHERE email='$email'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output['code'] = 1;
  $output['msg'] = 'exist';
}else {
  $output['code'] = 2;
  $output['msg'] = 'non-exist';
}

echo json_encode($output);