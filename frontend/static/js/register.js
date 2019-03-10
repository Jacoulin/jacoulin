/**
 * Created by Jacoulin on 2017/4/3.
 */
var isHide = true;
var isShow = false;
var userNameStatus = false;
var passWordStatus = false;
var confirmStatus = false;
function checkUserName(){
    var username = $("#username").val();
    $.ajax({
        type : "post",
        url : "/register/cun",
        data:{"username":username},	//数据
        dataType:"json",
        success:function(res) {    //发送请求成功
            $(".top_tips").animate({ top: '-55px' }, "3000", function () {
                if (res.return_info == "username_disallowed_is_existed") {
                    $(".top_tips > div > div.content").html("该用户名已被注册");
                    $(".top_tips").removeClass("top_tips_success").addClass("top_tips_failure");
                    userNameStatus = false;
                    $("#username").focus();
                } else if (res.return_info == "username_disallowed"){
                    $(".top_tips > div > div.content").html("请输入6-20位包含字母和数字的用户名！");
                    $(".top_tips").removeClass("top_tips_success").addClass("top_tips_failure");
                    userNameStatus = false;
                    $("#username").focus();
                } else {
                    $(".top_tips > div > div.content").html("该用户名可以被使用！");
                    $(".top_tips").removeClass("top_tips_failure").addClass("top_tips_success");
                    userNameStatus = true;
                }
                showTopTips();
            });
        }
    });
}
function checkPassWord(){
    var password = $("#password").val();
    $.ajax({
        type : "post",
        url : "/register/cpw",
        data:{"password":password},	//数据
        dataType:"json",
        success:function(res) {    //发送请求成功
            var usernameIsFocus=$("#username").is(":focus");
            if(!usernameIsFocus){
                if (userNameStatus){
                    $(".top_tips").animate({ top: '-55px' }, "3000", function () {
                        if (res.return_info == "password_disallowed") {
                            $(".top_tips > div > div.content").html("请输入6-20位包含字母和数字的密码！");
                            $(".top_tips").removeClass("top_tips_success").addClass("top_tips_failure");
                            passWordStatus = false;
                            $("#password").focus();
                        } else {
                            $(".top_tips > div > div.content").html("该密码可以被使用！");
                            $(".top_tips").removeClass("top_tips_failure").addClass("top_tips_success");
                            passWordStatus = true;
                        }
                        showTopTips();
                    });
                } else {
                    $("#username").focus();
                }
            }
        }
    });
}

function checkConfirm(){
    var passWord = $("#password").val();
    var confirm = $("#confirm").val();
    $.ajax({
        type : "post",
        url : "/register/cc",
        data:{"password":passWord,"confirm":confirm},	//数据
        dataType:"json",
        success:function(res) {    //发送请求成功
            var passwordIsFocus=$("#password").is(":focus");
            if(!passwordIsFocus) {
                if (passWordStatus) {
                    $(".top_tips").animate({ top: '-55px' }, "3000", function () {
                        if (res.return_info == "confirm_disallowed") {
                            $(".top_tips > div > div.content").html("两次输入密码不一致，请重新输入！");
                            $(".top_tips").removeClass("top_tips_success").addClass("top_tips_failure");
                            confirmStatus = false;
                            $("#confirm").focus();
                        } else {
                            $(".top_tips > div > div.content").html("两次输入密码相同！");
                            $(".top_tips").removeClass("top_tips_failure").addClass("top_tips_success");
                            confirmStatus = true;
                        }
                        showTopTips();
                    });
                } else {
                    $("#password").focus();
                }
            }
        }
    });
}

function checkRegister(){
    if(userNameStatus && passWordStatus && confirmStatus){
        var userName = $("#username").val();
        var passWord = $("#password").val();
        var confirm = $("#confirm").val();
        alert(passWord+confirm);
        $.ajax({
            type : "post",
            url : "/register/cr",
            data:{"userName":userName, "passWord":passWord, "confirm":confirm},	//数据
            dataType:"json",
            success:function(res) {    //发送请求成功

            }
        });
        showTopTips();
    }
}

function showTopTips(){
    $(".top_tips").animate({ top: '+0px' }, "3000");
    isShow = true;
    isHide = false;
}
function hideTopTips(){
    $(".top_tips").animate({ top: '-55px' }, "3000");
    isHide = true;
    isShow = false;
}
