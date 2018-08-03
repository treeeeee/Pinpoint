//  "use strict";
 $(function(){
     $("#top").load("header.html",function(data){

         $('#head_list>li a').removeClass("active");
         $('#a1').addClass("active");
     });
     $("#footer").load("footer.html");
     $('#side').load('aside.html');
     
// 大图轮播
function fun(){
    var img=document.querySelector("#slider>a.active");
    var li=document.querySelector("#slider>ul>li.active");
    img.className="";
    li.className="";
    if(img.nextElementSibling!=null
        &&img.nextElementSibling.nodeName=="A"){
        img.nextElementSibling.className="active";
        li.nextElementSibling.className="active";
    }else{
        img.parentNode.firstElementChild.className="active";
        li.parentNode.firstElementChild.className="active";
    }
}
var li=document.querySelectorAll("#slider>ul>li");
var img=document.querySelectorAll("#slider>a");
for(var i=0;i<li.length;i++){
    li[i].index=i;
}
for(var i=0;i<li.length;i++){
    li[i].onclick=function(e){
        for(var i=0;i<li.length;i++){
            li[i].className="";
            img[i].className="";
        }
        e.target.className="active";
        img[e.target.index].className="active";
    };
}
var timer1=setInterval(fun,2000);
var div=document.getElementById("slider");
div.addEventListener('mouseover',function(){
    clearInterval(timer1);
    timer1=null;
});
div.onmouseout=function(){
    timer1=setInterval(fun,2000);
};
//企业采购轮播
function intal(){
    var $as=$("#small_slider>a.active");
    var $li=$("#small_slider>ul>li.active");
    $as.removeClass();
    $li.removeClass();
    if($as.next()[0].nodeName==="A"){
        $as.next().addClass("active");
        $li.next().addClass("active");
    }else{
        $("#small_slider>a:first").addClass("active");
        $("#small_slider>ul>li:first").addClass("active");
    }
}
var  timer=setInterval(intal,2000);
var $lis=$("#small_slider");
$lis.mouseenter(function(){
    clearInterval(timer);
    timer=null;
});
$lis.mouseleave(function(){
    timer=setInterval(intal,2000)
});
// 大众点评轮播
$(function(){
 var   m=0;
 var s=setTimeout(lun,100);
   function lun(){

     $("#silde_info_ul").css("top",-m+"px");
       if(m==0||m==80||m==160||m==240){
           setTimeout(lun,2000);
       }else if(m>=310){
           m=-10;
           s=setTimeout(lun,1000)
       }else{
           s=setTimeout(lun,100)
       }
       m+=10
   }
});
//蛋糕列表轮播
 var $lins=$("#content>li");
 $lins.each(function (index,element) {
    $(element).css('left',275*index+'px');
 });

//蛋糕列表轮播
function linLun(){
    $lins.each(function (index,element) {
        var leftNum=parseInt($(element).css('left'));
        var firstLeft=parseInt($($lins[0]).css('left'));
        if(firstLeft>=-1100){
            $(element).css('left',(leftNum-275)+'px');
        }else{
            $(element).css('left',(leftNum+275)+'px');
        }
    });
}
    var c=setInterval(linLun,2000);
    //  var $lins=$("#content");
    $lins.mouseenter(function(){
        clearInterval(c);
        c=null;
    });
    $lins.mouseleave(function(){
        c=setInterval(linLun,2000)
    });
    //动态加载蛋糕列表
     var pid=sessionStorage['pid'];
     $.ajax({
         type:"GET",
         url:"data/index.php",
         data:{pid:pid},
         success:function(data){
            //  console.log(data);
            $(".goToDetail").click(function(e){
                e.preventDefault();
                sessionStorage['pid']=$(this).attr('href');
                open('detail.html','_blank');
            })

         }
     })

 })





















