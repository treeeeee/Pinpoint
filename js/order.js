//功能1：订单页面
$(function(){
    var uid=sessionStorage['uid'];
    $.ajax({
        url:'data/shopping_order_list.php',
        data:{uid:uid},
        success:function(data){
            var html="";
            for(let i=0;i<data.length;i++){
                var order=data[i];//订单信息
                html+=`
                    <tr class="my-order-list-number">
                        <td colspan="7">订单编号:${order.oid}</td>
                    </tr>
                    <tr>
                        <td class="products-images">
                    `;
                    for(let j=0;j<order.productList.length;j++){
                        var p=order.productList[j];
                            html+=`
                            <a href="${p.pid}" class="goto_single" title="${p.pname}">
                                <img src="img-products/${p.pic_md}"/>
                            </a>
                            `;
                    }
                            html+=`
                        </td>
                        <td>
                            ${order.conName}
                        </td>
                        <td>${order.phoneNum}</td>
                        <td>${order.orderTime}</td>
                        <td>${order.price}</td>
                        <td>${(parseInt(order.payment)===1)?'货到付款':(parseInt(order.payment)===2)?'微信支付':(parseInt(order.payment)===3)?'支付宝支付':'网银支付'}</td>
                        <td>
                            <div class="operation">
                                <a href="${order.oid}" class="close">删除</a>
                            </div>
                        </td>
                    </tr>
                `;
            }
            $(".my-order-list tbody").html(html);
        }
    })//功能1结束
 //功能2：删除订单详情页的东西
    $(".my-order-list tbody").on('click','a.close',function(e){
        e.preventDefault();
        var oid=$(this).attr('href');
        var self=this;
        $.ajax({
            url:"data/order_delete.php",
            data:{oid:oid},
            success:function(data){
                if(data.code<0){
                    alert("删除失败:"+data.msg);
                }else{
                    alert('删除成功');
                    $(self).parent().parent().parent().prev().remove();
                    $(self).parent().parent().parent().remove()
                }
            }
        })
    })//删除订单结束
})