//滑动栏滑到指定位置+100px时执行动画效果
function scrollAnimate($div,cssName){
    $div.css("visibility","hidden");
    $(document).ready(function() {
        $(window).scroll(function(){
            //匿名函数自调
            (function(){
                var a,b,d;
                a=$div.offset().top;//元素相对于窗口的距离
                b=$(window).scrollTop(); //监控窗口已滚动的距离;
                //c=$(document).height();//整个文档的高度
                d=$(window).height();//浏览器窗口的高度
                if(d+b>a+100){
                    $div.addClass(cssName);
                    $div.css("visibility","visible");
                }
            })();
        });
    });
}
//滑动栏滑到底部时执行动画效果
//function scrollBottom($div,cssName){
//    $div.css("visibility","hidden");
//    $(document).ready(function() {
//        $(window).scroll(function(){
//            //匿名函数自调
//            (function(){
//                var viewH = $(window).height();//可见高度(浏览器窗口的高度)
//                var contentH = $(document).height();//整个文档的高度
//                var scrollH = $(window).scrollTop();//滚动高度(监控窗口已滚动的距离)
//                if (scrollH>=contentH-viewH){
//                    $div.addClass(cssName);
//                    $div.css("visibility","visible");
//                }
//            })();
//        });
//    });
//}