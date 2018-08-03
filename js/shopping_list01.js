$(function(){
    var uid=sessionStorage['uid'];

 // 功能1:显示购物车信息列表
    if(uid){
        $.ajax({
            data:{uid:uid},
            url:"data/shopping_list01.php",
            success:function(data){
                if(data[0]){
                    var html='';
                    $.each(data,function(i,obj){
                        html+=`
                            <tr>
                                <td class="invert-image">
                                    <a>
                                        <img src="img-products/${obj.pic_md}"/>
                                        <span> ${obj.pname}</span>
                                    </a>
            
                                </td>
            
                                <td>
                                    2.0磅/10份 标准餐具 <br>
                                    <span>标准餐具套装(免费)</span>
                                </td>
                                <td>
                                     ${obj.price}
                                </td>
                                <td>
                                    <button class="${obj.cid}">-</button><input type="text" value="${obj.count}"/><button class="${obj.cid}">+</button>
                                </td>
                                <td class="sub_total">
                                     ${(obj.price*obj.count).toFixed(2)}
                                </td>
                                <td>
                                    <div class="rem">
                                        <a class="close" href="${obj.cid}">删除</a>
                                    </div>
                                </td>
                            </tr>
                        `;
                    })
                    $(".timetable_sub tbody").html(html);
                    //计算总计价格
                    var total=0;
                    $(".sub_total").each(function(){
                        total+=parseFloat($(this).html());
                    });
                    $(".checkout-left .total").html(total.toFixed(2));
                }else{//如果当前用户还没有购物数据
                    $(".checkout-right").html("");
                    $(".checkout-left").html(
                        `<h4>您的购物车是空的,立即返回<a href="index.html">首页</a>去购物吧!</h4>`
                    )
                }
            }
        });
  //功能2:未删除绑定事件监听,实现删除购物选项功能
        $(".timetable_sub tbody").on("click","a.close",function(e){
            //1:阻止事件默认行为
            e.preventDefault();
            //2:获取当前购物项cid
            var cid=$(this).attr("href");
            //3:留存this<-->删除按钮
            var that=this;//that<--->删除按钮
            //4:发送ajax请求 shoppingcart_delete.php
            $.ajax({
                type:"POST",
                url:'data/shopping_delete.php',
                data:{cid:cid},
                success:function(data){
                    console.log(data);
                    if(data.code<0){
                        alert("删除失败:"+data.msg);//6:data.msg 错误信息
                    }else{
                        alert("删除成功");//7:data.code>0 删除当前元素a->div->td->tr
                        $(that).parent().parent().parent().remove();
                        //计算总计价格
                        var total=0;
                        $(".sub_total").each(function(){
                            total+=parseFloat($(this).html());
                        });
                        $(".checkout-left .total").html(total.toFixed((2)));
                    }
                },
                error:function(){
                    alert('删除失败,请检查网络');
                }
            })
        });
//功能3：为修改购物车中项目+查找购物车项目+ 绑定监听事件  按钮+号键增加商品数量
        $(".timetable_sub tbody").on('click','button:contains("+")',function(e){
            e.preventDefault();
             //2:获取当前购物项cid
            var cid=$(this).attr("class");
            var self=this;
            $.ajax({
                url:"data/shopping_addCart.php",
                data:{cid:cid},
                success:function(data){
                    // console.log(data);
                    if(data.code<0){
                        alert("增加失败");
                    }else{
                        //console.log(12);
                        $(self).prev().val(data.count);
                        var price=$(self).parent().prev().html();
                        $(self).parent().next().html((price*data.count).toFixed(2));
                        //计算总价格
                        var total=0;
                        $('.sub_total').each(function(){
                            total+=parseFloat($(this).html());
                        })
                         $(".checkout-left .total").html(total.toFixed(2));
                    }
                   
                },
                error:function(){
                    alert("添加失败，请检查网络");
                }
            })
        })//功能3结束

  //功能4 为修改购物车中项目- 查找购物车项目+ 绑定监听事件  按钮-号键减少商品数量
        $(".timetable_sub tbody").on('click','button:contains("-")',function(e){
            e.preventDefault();
            var cid=$(this).attr('class');
            var self=this;
            $.ajax({
                url:'data/shopping_reduceCart.php',
                data:{cid:cid},
                success:function(data){
                     //console.log(data);
                    if(data.code>0){
                        // console.log(123434);
                        $(self).next().val(data.count);
                        console.log();
                        var price=$(self).parent().prev().html();
                        $(self).parent().next().html((price*data.count).toFixed(2));
                        //计算总价格
                        var total=0;
                        $('.sub_total').each(function(){
                            total+=parseFloat($(this).html());
                        })
                         $(".checkout-left .total").html(total.toFixed(2));
                    }else{
                        alert("删减失败:"+data.msg)
                    }
                },
                error:function(){
                    alert('删减失败，请检查网络');
                }
            })
        });//功能4结束
    }//if判断
   //功能5：点击结算按钮跳转到确认订单
    $(".checkout-left").on("click",".btn2",function(e){
        e.preventDefault();
        $('.checkout-nav-grids li:nth-child(2)').addClass('active');
        $('.checkout').css('display','none');
        $('.confirm-order').css('display','block');
    });//功能5结束
//点击继续购物返回到产品页
    $("#continue_shopping").on("click",function(e){
        e.preventDefault();
        location.href="products.html";
    })//跳转到产品页面

//功能6:点击确认订单按钮跳转到成功提交订单,并将订单数据导入数据库，输出生成的订单号
    $(".confirm-order").on("click","#confirm-bt",function(e){
        e.preventDefault();
        var conName=$("#link-person").val();
        var phoneNum=$("#link-phoneNumber").val();
        var address=$("#shipping-address").val();
        var price=parseFloat($('.total').html()).toFixed(2);
        var payment=$('.confirm-order input:radio[name="pay-method"]:checked').val();
        if(conName&&phoneNum&&address){
            $.ajax({
                url:'data/shopping_order.php',
                data:{conName:conName,phoneNum:phoneNum,address:address,price:price,payment:payment,uid:uid},
                success:function(data){
                    if(data.code<0){
                        alert("失败");
                    }else{
                        $('.post-order h4 span').html(data);
                        $('.checkout-nav-grids li:last-child').addClass('active');
                        $('.confirm-order').css('display','none');
                        $('.post-order').css('display','block');
                    }
                }
            })
        }
    })
}) //function---end