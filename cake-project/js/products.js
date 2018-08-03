$(function(){
    $("#top").load("header.html",function(data){
        // console.log(data);
        $('#head_list>li a').removeClass("active");
        $('#a2').addClass("active");
    });
    $("#footer").load("footer.html");

    // ajax异步请求php
    $.ajax({
        Type:'GET',
        url:'data/product.php',
        success:function(data){
            // console.log(data);
            var html='';
            for(var i=0;i<data.length;i++){
                html+=`
                    <li class="animation">
                <div>
                    <div class="animation">
                        <a class="goToDetail" href="${data[i].pid}">
                            <img src="img-products/${data[i].pic_md}" alt="">
                        </a>
                    </div>
                    <div class="pro">
                        <p><a  class="goToDetail" href="${data[i].pid}">${data[i].pname}</a></p>
                        <p><span>${data[i].price}元/1.0磅</span>${data[i].evalStar}</p>
                        <p>${data[i].category} </p>
                        <p>${data[i].retain}</p>
                    </div>
                    <div class="introl">
                        <p>${data[i].discribe}</p>
                    </div>
                </div>
                <div class="cakecart">
                    <div class="platform">
                        <a href="#">1.0磅</a>
                        <a href="#">2.0磅</a>
                        <a href="#" class="biankuang">3.0磅</a>
                        <a href="#">5.0磅</a>
                    </div>
                    <div class="add_shoppingcart">
                        <a href="${data[i].pid}" class="addTo">加入购物车</a>
                        <a href="${data[i].pid}" class="buynow">立即购买</a>
                    </div>
                </div>
            </li>
                `;
            }
            $(".introduce_box").html(html);
            $(".goToDetail").on("click",function(e){
            e.preventDefault();
            sessionStorage['pid'] =$(this).attr('href');
            // console.log(sessionStorage['pid']);
            open("detail.html","_blank");	
        })
        }
    }) 
});
































