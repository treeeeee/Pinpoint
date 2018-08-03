// $(function(){
//     //头部弹出框
//     var lis=$("#head_list>li>a");
// //console.log(lis);
//     for(var i=0;i<lis.length;i++){
//         lis[i].onmouseover=function(){
//             //console.log(this.children);
//             this.className="active";
//         };
//         lis[i].onmouseout=function(){
//             this.className=" ";
//         }
//     }
//     var stroy=$(".stroy,.home_page");
//     for(var i=0;i<stroy.length;i++){
//         stroy[i].onmouseover=function(){
//             this.lastElementChild.style.display="block";
//             this.lastElementChild.style.transition="all 1s linear";
//             //this.children[1].className="active";
//         };
//         stroy[i].onmouseout=function(){
//             this.lastElementChild.style.display="none";
//             //this.children[1].className=" ";
//         }
//     }
// });
//$(function(){
//$("#a1").click(function(){
//    console.log($(this));
//    changeFontColor($(this));
//});
//$("#a2").click(function(){
//    changeFontColor($(this));
//});
//})
//function changeFontColor(obj){
//    console.log(obj);
//    obj.each(function(){
//        $("#head_list>li>a").removeClass('active');
//    });
//    obj.addClass("active");
//}