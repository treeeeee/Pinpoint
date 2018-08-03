<?php
    header("Content-Type:application/json;charset=utf-8");
//点击立即购买跳转页面
    @$pid=$_REQUEST['pid'] or die('{"code":-1,"msg":"产品编号是必须的"}');
    @$uid=$_REQUEST['uid'] or die('{"code":-2,"msg":"用户编号是必须的"}');
//    $count=$_REQUEST['count'] or die('{"code":-2,"msg":"产品数量是必须的"}');
    require ('init.php');
    //查询有没有购物车
    $sql="SELECT cid FROM t_cart WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
//    echo $row;
//判断是否有购物车
    if($row){
        $cid=$row[0];
        //查询有没有该商品
        $sql="SELECT count FROM t_cart WHERE uid=$uid AND pid=$pid";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_row($result);
        if($row){
            $count=$row[0]+1;
            $sql="UPDATE t_cart SET count=$count WHERE uid=$uid AND pid=$pid";
            mysqli_query($conn,$sql);
        }else{//判断如果购物车没有该商品 就添加当前商品到购物车
            $sql="INSERT INTO t_cart VALUE(null,$uid,$pid,1)";
            mysqli_query($conn,$sql);
        }
    }else{
        //如果没有购物车就插入该商品到购物车
        $sql="INSERT INTO t_cart VALUE(null,$uid,$pid,1)";
        mysqli_query($conn,$sql);
    }
    echo '{"msg":"succ"}';
?>