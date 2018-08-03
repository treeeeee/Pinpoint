
$(function(){
    //功能1:为每个商品下面"添加都购物车"
//绑定监听--事件代理
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

                    //功能：添加商品后重新查询购物车表更新页面中显示的购物车数量
                    $.ajax({
                        url:'data/cart_count.php',
                        data:{uid:sessionStorage['uid']},
                        success:function(data){
                            $('a.go-to-cart').html(
                                `
                        <img src="img_menu/cico.gif" style="vertical-align: middle" alt="">
                        ${data.count}件
                        `
                            )
                        }
                    })

                }
            }

        })
    });//功能1--end()

  //功能2:点击立即购买跳转到购物车页面
    $('body').on('click','a.buyNow',function(e){
        e.preventDefault();
        var pid=$(this).attr('href');
        // console.log(pid);
        $.ajax({
            url:'data/shopping_nowbuy.php',
            data:{uid:sessionStorage['uid'],pid:pid},
            success:function(data){
                console.log(data);
                if(data.code<0){
                    if(confirm("购买失败,错误原因:"+data.msg+" 是否立即登录")){
                        location.href="login.html";
                    }
                }else{
                   location.href="myCart.html";
                }
            }
        })
    })
});
