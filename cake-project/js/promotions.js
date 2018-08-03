$(function(){
    $("#top").load("header.html",function(data) {
        $('#head_list>li a').removeClass("active");
        $('#a3').addClass("active");
    })
    $('#footer').load('footer.html')
})
