<?php
    header("Content-Type:application/json;charset=utf-8");
    $uname=$_REQUEST['user_name'] or die("{code:-2}");
    $upwd=$_REQUEST['user_pwd'] or die("{code:-3}");
    $phone=$_REQUEST['user_phone'] or die("{code:-4}");
    $email=$_REQUEST['user_email'] or die("{code:-5}");
    require('init.php');
    $sql="SELECT * FROM t_user WHERE uname='$uname' OR phone=$phone";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row!==null){
        echo '{"code":-1,"msg":"注册失败"}';
    }else{
        $sql="INSERT INTO t_user VALUES(NULL,'$uname','$email','$upwd',$phone)";
		$result=mysqli_query($conn,$sql);
        if($result){
            echo '{"code":1,"msg":"注册成功"}';
        }else{
            echo 'err';
        }
    }
?>