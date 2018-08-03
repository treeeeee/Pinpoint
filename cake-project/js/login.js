$(function(){
    $('#top').load('header.html');
    $('#footer').load('footer.html');
    $("#user_name").blur(unameCheck);
    $("#user_pwd").blur(upwdCheck);
    $("#login").click(function(e){
        e.preventDefault();
        if(unameCheck()&&upwdCheck()){//通过验证
            var uname=$.trim($('#user_name').val());
            var upwd=$.trim($('#user_pwd').val());
            console.log(uname);
            console.log(upwd);
            $.ajax({
                type:'POST',
                url:'data/login.php',
                data:{unameOrPhone:uname,upwd:upwd},
                success:function(data){
                    console.log(data);
                    if(data.code==-1){
                        $('#tips').show().text("用户名或密码不正确")
                    }else{
                        sessionStorage.uid=data.uid;
                        sessionStorage.uname=data.uname;
                        location.href='index.html';
                    }
                }
            })
        }
    })

//验证用户名
function unameCheck(){
    var uname=$.trim($("#user_name").val());
    if(!uname){//当用户名为空的时候
        $('#tips').show().text('用户名不能为空');
        return false;
    }else{
        $('#tips').show().text('');
        return true;
    }
}
//验证密码
function upwdCheck(){
    var upwd=$.trim($('#user_pwd').val());
    if(!upwd){
        $('#tips').show().text('密码不能为空');
        return false;
    }else{
        $("#tips").text('');
        return true;
    }
}
})















