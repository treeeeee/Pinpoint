
$(function(){
//获取product页面图片的pid
    var pid= sessionStorage['pid'];
    $.ajax({
        type:"GET",
        url:'data/detail.php',
        data:{pid:pid},
        success:function(data){
            // console.log(data);
            var html='';
            html+=`
            <div id="detail-left">
                <img src="img_detail/${data.pic_lg}" id="mImg">
                <div id="mask"></div>
                <div id="superMask"></div>
                <div id="largeDiv"></div>
                <ul id="icon_list">
                    <li class="hover">
                        <img src="img_detail/${data.pic_lg}" alt="">
                    </li>
                    <li>
                        <img src="img_detail/${data.pic_sm}" alt="">
                    </li>
                </ul>
            </div>
            <div id="detail-right">
                <p>${data.pname}</p>
                <ul>
                    <li>
                        <span>价格:</span>
                        <b>￥${data.price}</b>
                        <img src="img_detail/wine.jpg" style="vertical-align:middle;padding-left:10px; " alt="">
                    </li>
                    <li class="focus_li">
                        <a href="" class="focus">
                            1.0磅 : 约13x13(cm)
                            <i></i>
                        </a>
                        <a href="">2.0磅 : 约17x17(cm)</a>
                    </li>
                    <li  class="focus_li">
                        <a href="">1.0磅 : 约13x13(cm)</a>
                        <a href="">2.0磅 : 约17x17(cm)</a>
                    </li>
                    <li>
                        <a href="">1.0磅 : 约13x13(cm)</a>
                    </li>
                    <li>
                        <span>数量:</span>
                        <button>-</button>
                        <input type="text" value="1" style="width:25px;text-align: center;">
                        <button>+</button>
                    </li>
                    <li>
                        <a href="${pid}" class="addTo">加入购物车</a>
                        <a href="${pid}"  class="buynow">立即购买</a>
                    </li>
                </ul>
                <div>
                    新西兰纯乳脂奶油中溶入独特玫瑰浆，诠释那甜蜜之爱
                    New Zealand butter cream melt with distinctive rose syrup, this is how love should be interpreted.
                    蛋糕内水果夹心受季节影响，种类有变化，但总克重不变。 当季为黄桃夹心。
                </div>
            </div>
            `;
            $("#dtl-top").html(html);

            //放大镜
            var mImg=$("#mImg")[0];
            var ulList=$('#icon_list')[0];
            //为ulList绑定鼠标进入事件
            ulList.addEventListener("mouseover",function(e){
                if(e.target.nodeName=='IMG'){
                    // console.log(e.target.src);
                    //获得当前img的src
                    var src=e.target.getAttribute("src"); 
                    // console.log(src);
                    // //查找src中最后一个.的位置
                    // var i=src.indexOf(".");
                    //设置mImg的src为
                    mImg.setAttribute("src",src);
                }
            });
            //保存superMask和mask的大小
            var SMSIZE=550,MSIZE=200,MAX=SMSIZE-MSIZE;//mask最大top和left
            //查找id为supermask的div
            var smask=$("#superMask")[0];
            var mask=$("#mask")[0];
            //查找largeDiv
            var largeDiv=$("#largeDiv")[0];
            // console.log(largeDiv);
            // 为smask绑定鼠标移入和鼠标移出
            smask.addEventListener("mouseover",function(){
                $(mask).css("display","block");
                //获得mImg的src
                var src=mImg.getAttribute("src");
                //查找最后一个.的位置
                // var i=src.lastIndexOf(".");
                // src=src.slice(0,i-1)+"l"+src.slice(i);
                largeDiv.style.cssText="display:block;"
                    +"background-image:url("+src+");background-size:1100px 1100px";
            });
            smask.addEventListener("mouseout",function(){
                $(mask).css("display","none");
                $(largeDiv).css("display","none");
            });
            //为smask添加鼠标移动事件
            smask.addEventListener("mousemove",function(e){
                //获得鼠标相对于当前元素的坐标
                var x=e.offsetX,y=e.offsetY;
                // 计算mask的top和left
                var l=x-MSIZE/2,t=y-MSIZE/2;
                if(l<0) l=0;
                else if(l>MAX) l=MAX;
                if(t<0) t=0;
                else if(t>MAX) t=MAX;
                //设置mask的top和left
                mask.style.cssText="display:block; top:"+t+"px;left:"+l+"px";
                //修改largeDiv的背景图片位置
                largeDiv.style.backgroundPosition=-2*l+"px "+(-2*t)+"px";
            });

        }  //ajax  --end
    });
    //点击尺寸显示效果
    var as=$(".focus>li>a");
    console.log(as);
   var $a=$(".focus_li>a.focus");
    for(var i=0;i<as.length;i++){
        $(as).on('click',function(e){
            e.preventDefault();
            $(this).removeClass("focus");
            $(this>i).remove();
            $(this).next().addClass("focus");
            $(this).next().append("i");
        })
    }
})  //$(function(){}) -- end