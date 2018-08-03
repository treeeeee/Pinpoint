$(function() {
    $("#top").load('header.html');
    $("#footer").load('footer.html');
//文本框失去焦点
$('#user_phone').blur(phoneCheck);
$('#user_uname').blur(unameCheck);
$('#user_email').blur(emailCheck);
$('#user_pwd').blur(pwdCheck);
$('#user_pwd1').blur(pwdCheck1);
//点击用户注册协议复选框时，控制注册按钮是否可用
$('.td_checkbox>input').click(function(){
    $('.td_btn>input').prop("disabled",!$(this).prop("checked"))
    .toggleClass('disabled')
});
//提交注册
$("#btn-reg").click(function(){
    var rphone=phoneCheck();
    var runame=unameCheck(); 
    var remail=emailCheck();
    var rpwd=pwdCheck();
    var rpwd1=pwdCheck1();
    if(rphone&&runame&&rpwd&&remail){
        var json={};
        $("#user_phone,#user_name,#user_pwd,#user_email").each(function(){     
            json[$(this).attr("id")]=$(this).val();
        });
        console.log(json);
        $.ajax({
            type:'POST',
            url:'data/register.php',
            data:json, 
            success:function(result){
                console.log(result);
                if(result.code==1){
                    // sessionStorage.uid=result.uid;
                    // sessionStorage.uname=result.uname;
                    alert('恭喜您！注册成功即将跳转到登录页面');
                    location.href="login.html";
                }
            }
            
        })
    }
})
});
//验证邮箱
function emailCheck(){
    // console.log(1221);
    var uemail=$.trim($('#user_email').val());
    var regEmail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!uemail){
        $('#user_email').parent().next().text("*请输入您注册的邮箱");
        return false;
    }else if(!regEmail.test(uemail)){
        
        $('#user_email').parent().next().text("*请输入正确的邮箱格式");
        // console.log(454545);
            return false;
    }else if(emailExist(uemail)){
         $('#user_email').parent().next().text("*此邮箱已被其他用户占用");
         return false;
    }else{
        $("#user_email").parent().next().hide();
        return true;
    }
}
//验证邮箱是否被注册
function emailExist(uemail){
    var back=false;
    $.ajax({
        type:'post',
        url:'data/register_check_uemail.php',
        data:{email:uemail},
        async:false,
        success:function(d){
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}
//验证密码
function pwdCheck(){
var pwd=$("#user_pwd");
var pwdSize=$.trim(pwd.val()).length;
// console.log(pwd)
if(!pwdSize){//密码为空时
    pwd.parent().next().text('*请输入你的密码');
    return false;
}else if(pwdSize<6||pwdSize>12){
    pwd.parent().next().text('*密码长度应为6~12个字符之间');
    return false;
}else{
    pwd.parent().next().hide();
    return true;
}
}
//验证重复密码
function pwdCheck1(){
    var pwd=$.trim($('#user_pwd').val());
    var pwd1=$.trim($('#user_pwd1').val());
    if(pwdCheck()){
        if(pwd!=pwd1){
            $('#user_pwd1').parent().next().text('*两次输入密码不一致');
            return false;
        }else{
            $('#user_pwd1').parent().next().hide();
            return true;
        }
    }
}
//手机号码验证
function phoneCheck(){
    var phone=$.trim($('#user_phone').val());
    var regPhone=/^1[3587]\d{9}$/;
    if(!phone){
        $("#user_phone").parent().next().text("*请输入您的号码");
        return false;
    }else if(!regPhone.test(phone)){
        $('#user_phone').parent().next().text('*请输入正确的手机号码');
        return false;
    }else if(phoneExist(phone)){
        $('#user_phone').parent().next().text('*此手机号已被其他用户占用');
        return false;
    }else{
        $('#user_phone').parent().next().hide();
        return true;
    }
}
//验证手机号是否被绑定
function phoneExist(phone){
    var back=false;
    $.ajax({
        type:'post',
        url:'data/register_phone.php',
        data:{phone:phone},
        async:false,
        success:function(d){
            if(d.code==1){
                back=true;
            }else{
                back=false;
            }
        }
    })
    return back;
}
//会员名验证
function unameCheck(){
    var uname=$.trim($("#user_name").val());
    var reguname=/^[a-zA-z][a-zA-Z0-9_]{2,19}$/;
    if(!uname){
        $("#user_name").parent().next().text("*请输入会员名");
        return false;
    }else if(!reguname.test(uname)){
        $("#user_name").parent().next().text("*请输入正确的会员名");
        return false;
    }else{
        $("#user_name").parent().next().hide();
        return true;
    }
}







































