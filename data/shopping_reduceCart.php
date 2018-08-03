 <?php
 header("Content-Type:application/json;charset=utf-8");
 //功能4：商品数量减
    @$cid=$_REQUEST['cid'] or die('{"code":-1,"msg":"购物车编号是必须的"}');
    require('init.php');
    $sql="UPDATE t_cart SET count=count-1 WHERE cid=$cid AND count>1";
    $result=mysqli_query($conn,$sql);
    if($result===true){
        $sql="SELECT * FROM t_cart WHERE cid=$cid";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_assoc($result);
        $count=$row['count'];
        $arr=["code"=>1,"count"=>$count];
        echo json_encode($arr);
    }
?>    