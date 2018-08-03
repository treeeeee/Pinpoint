//功能:为每个商品下面"添加都购物车"
//绑定监听--事件代理
$(function(){
    $('body').on('click','a.addTo',function(e){
        e.preventDefault();
        var pid=$(this).attr('href');
        //3:把当前登录用户编号
        //  +商品编号提交服务器，
        //  执行购物车自动添加
        $.ajax({
            url:"data/cart-detail.php",
            data:{uid:sessionStorage['uid'],pid:pid},
            success:function(data){
                console.log(data);
                if(data.code<0){
                    if(confirm("添加失败,错误原因:"+data.msg+" 是否立即登录")){
                        location.href="login.html";
                    }
                }else{
                    alert("添加成功,该商品购买数量"+data.count);
                }
            }

        })
    })
});
