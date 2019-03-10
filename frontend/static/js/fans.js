/**
 * Created by Jacoulin on 2017/4/24.
 */

var user={};
$(document).ready(function(){
    loadUser();
    loadFans();
});

/*加载数据 start ********************************************************************************************************/
function loadUser(){
    var vid = $("body>.vid").val();

    $.ajax({
        type : "post",
        url : "/personal/load/user",
        data:{"vid":vid},	//数据
        dataType:"json",
        success:function(res) {    //发送请求成功
            user = $.parseJSON(res);
            genPersonal(user);
        }
    });
}
function genPersonal(user){
    var uid =$("body>.uid").val();
    var vid = user["userId"];
    var nickName = user["nickName"];
    var iconHead = user["iconHead"];
    var intro = user["intro"];
    var focusNum = user["focusNum"];
    var fansNum = user["fansNum"];
    var microBlogNum = user["microBlogNum"];
    var gender = user["gender"];
    var birthday = user["birthday"];
    var cur_date = new Date();
    var born_date = new Date(birthday);
    var age = cur_date.getFullYear() - born_date.getFullYear();
    var address = user["address"];
    var panel_head;
    $(".icon_head_sm").css("background-image","url("+ iconHead +")");
    if(uid == vid){
        panel_head =
            '<div class="panel_head">'+
            '<a class="icon_head_big" href="/personal/'+ vid +'" style="background-image: url('+ iconHead +')">'+
            '</a>'+
            '<a class="setting" href="/personal/setting/'+ vid +'">'+
            '<i class="iconfont icon-31shezhi"></i>'+
            '</a>'+
            '</div>';
    } else {
        panel_head =
            '<div class="panel_head">'+
            '<a class="icon_head_big" href="/personal/'+ vid +'" style="background-image: url('+ iconHead +')">'+
            '</a>'+
            '</div>';
    }
    $(".panel_personal_head").prepend(panel_head);
    var personal_info =
        '<div class="panel_row">'+
        '<div class="span_username">'+
        nickName+
        '</div>'+
        '</div>'+
        '<div class="panel_row">'+
        '<div class="row">'+
        '<div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">'+
        '<div class="row">'+
        '<div class="col-xs-4 col-sm-4 col-md-4">'+
        gender+
        '</div>'+
        '<div class="col-xs-4 col-sm-4 col-md-4">'+
        age+
        '</div>'+
        '<div class="col-xs-4 col-sm-4 col-md-4">'+
        address+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="panel_row">'+
        '<div class="span_introduction">'+
        '<p>'+ intro +'</p>'+
        '</div>'+
        '</div>';
    $(".panel_personal_body").append(personal_info);
    var focusXchat;
    if(uid != vid){
        focusXchat =
            '<div class="panel_row margin_top">'+
            '<div class="row">'+
            '<div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">'+
            '<div class="row">'+
            '<div class="col-xs-6 col-sm-6 col-md-6">'+
            '<input class="vid" type="hidden" value="'+ vid +'" />'+
            '<button type="button" class="btn btn-default btn_focus" onclick="addClickForFocus(this)">关注</button>'+
            '</div>'+
            '<div class="col-xs-6 col-sm-6 col-md-6">'+
            '<input class="vid" type="hidden" value="'+ vid +'" />'+
            '<button type="button" class="btn btn-default btn_chat" onclick="addClickForChat(this)">聊天</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        $(".panel_personal_body").append(focusXchat);
    }
    var choice_bar;
    if(vid == uid){
        choice_bar =
            '<div class="panel_row margin_top">'+
            '<div id="choice_bar" class="row">'+
            '<div class="col-xs-4 col-sm-4 col-md-4">'+
            '<a class="active">我的主页</a>'+
            '</div>'+
            '<div class="col-xs-4 col-sm-4 col-md-4">'+
            '<a>个人相册</a>'+
            '</div>'+
            '<div class="col-xs-4 col-sm-4 col-md-4">'+
            '<a>管理中心</a>'+
            '</div>'+
            '</div>'+
            '</div>';
    } else {
        choice_bar =
            '<div class="panel_row margin_top">'+
            '<div id="choice_bar" class="row">'+
            '<div class="col-xs-6 col-sm-6 col-md-6">'+
            '<a class="active">ta的主页</a>'+
            '</div>'+
            '<div class="col-xs-6 col-sm-6 col-md-6">'+
            '<a>个人相册</a>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
    $(".panel_personal_body").append(choice_bar);

    $("#num_focus > span:first").html(focusNum);
    $("#num_fans > span:first").html(fansNum);
    $("#num_blog > span:first").html(microBlogNum);
}
function loadFans(){
    var uid = $("body>.uid").val();
    var vid = $("body>.vid").val();
    $.ajax({
        url:"/personal/load/fans",
        type:"post",
        dataType:"json",
        data:{"vid":vid},
        success:function(res){
            $.each($.parseJSON(res), function (i, item){
                genFans(item);
            })
        }
    })
}
function genFans(item){
    var uid = $("body>.uid").val();
    var c_vid = $("body>.vid").val();
    //这里的vid不等同于jsp中的vid,用于
    var vid = item["userId"];
    var nickName = item["nickName"];
    var iconHead = item["iconHead"];
    var intro = item["intro"];
    var focusNum = item["focusNum"];
    var fansNum = item["fansNum"];
    var microBlogNum = item["microBlogNum"];
    var gender = item["gender"];
    var birthday = item["birthday"];
    var cur_date = new Date();
    var born_date = new Date(birthday);
    var age = cur_date.getFullYear() - born_date.getFullYear();
    var address = item["address"];

    var focus_user_item =
        '<div class="fans_user_item">'+
        '<div class="fans_item clearfix">'+
        '<input type="hidden" class="vid" value="'+ vid +'"/>'+
        '<div class="head">'+
        '<a class="icon_head_sm" title="关注:'+ focusNum +'--粉丝:'+ fansNum +'--微博:'+ microBlogNum +'" href="/personal/'+ vid +'" style="background-image: url('+ iconHead +')"></a>'+
        '</div>'+
        '<div class="content clearfix">'+
        '<div class="f_top">'+
        '<a class="nickname" href="/personal/'+ vid +'">'+ nickName +'</a>'+
        '<span class="gender">'+ gender +'</span>'+
        '<span class="age">'+ age +'</span>'+
        '<span class="address">'+ address +'</span>';

    var cancelXmove;
    if(uid == c_vid){
        cancelXmove =
            '<a class="move_group" onclick="addClickForRemoveFans(this)">移除粉丝</a>';
    } else {
        $.ajax({
            url:"/personal/is/focus",
            async:false,
            type:"post",
            dataType:"json",
            data:{"uid":vid, "fid":uid},
            success:function (res) {
                if(res == "Y"){
                    cancelXmove =
                        '<a class="cancel_focus" onclick="addClickForCancelFocus(this)">取消关注</a>';
                } else {
                    cancelXmove =
                        '<a class="cancel_focus" onclick="addClickForAddFocus(this)">添加关注</a>';
                }
            }
        })

    }
    var introduction =
        '</div>'+
        '<div class="f_mid">'+
        '<p>'+ intro +'</p>'+
        '</div>'+
        '</div>'+
        '</div>';

    focus_user_item = focus_user_item + cancelXmove +introduction;

    $("#focus_user_list").prepend(focus_user_item);
}
function addClickForCancelFocus(current){
    var uid = $(current).parent().parent().parent().find(".vid").val();
    var fid = $("body>.uid").val();
    alert(uid);
    $.ajax({
        url:"/personal/remove/focus",
        async:false,
        type:"post",
        dataType:"json",
        data:{"uid":uid, "fid":fid},
        success:function (res) {
            if(res == "succeed") {
                var cancelXmove =
                    '<a class="cancel_focus" onclick="addClickForAddFocus(this)">重新关注</a>';
                $(current).parent().prepend(cancelXmove);
                $(current).remove();
            } else {
                alert("取消关注出现异常");
            }
        }
    })
}
function addClickForAddFocus(current){
    var uid = $(current).parent().parent().parent().find(".vid").val();
    var fid = $("body>.uid").val();
    $.ajax({
        url:"/personal/remove/focus",
        async:false,
        type:"post",
        dataType:"json",
        data:{"uid":uid, "fid":fid},
        success:function (res) {
            if(res == "succeed") {
                var cancelXmove =
                    '<a class="cancel_focus" onclick="addClickForCancelFocus(this)">取消关注</a>';
                $(current).parent().prepend(cancelXmove);
                $(current).remove();
            } else {
                alert("添加关注出现异常");
            }
        }
    })
}
function addClickForRemoveFans(current){
    var fid = $(current).parent().parent().parent().find(".vid").val();
    var uid = $("body>.uid").val();
    alert(uid);
    $.ajax({
        url:"/personal/remove/fans",
        async:false,
        type:"post",
        dataType:"json",
        data:{"uid":uid, "fid":fid},
        success:function (res) {
            if(res == "succeed") {
                alert("移除成功");
                $(current).parent().prepend(cancelXmove);
                $(current).remove();
            } else {
                alert("取消关注出现异常");
            }
        }
    })
}












