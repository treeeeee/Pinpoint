$(function(){
$('#top').load('header.html',function(data){
            console.log(data);
            $('#head_list>li a').removeClass("active");
            $('#a4').addClass("active");
        });
$('#footer').load('footer.html');
$('#side').load('aside.html');
});