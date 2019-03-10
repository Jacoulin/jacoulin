/**
 * Created by Jacoulin on 2017/4/17.
 */
$(document).ready(function(){
    loadUser();
    loadPersonalList();

    adjustPic();
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
function loadPersonalList(){
    var vid = $("body>.vid").val();
    //alert($("body>.vid").val());
    $.ajax({
        url: "/personal/list",
        type: "POST",
        dataType:"json",
        data: {"vid":vid,"begin":"0","offset":"10","sort":"user_id"},
        success: function(res) {
            //$.each(res,genMicroBlog());
            //genMicroBlog(top_pre, p_pre, pic_pre, video_pre, bottom_pre)
            $.each($.parseJSON(res), function (i, item) {
                var hide_pre = {};
                hide_pre["uid"] = item["userId"];
                hide_pre["bid"] = item["microBlogId"];
                var top_pre = {};
                top_pre["nickName"] = item["nickName"];
                top_pre["iconHead"] = item["iconHead"];
                top_pre["timePush"] = convertTimestamp(item["timePush"]);
                top_pre["intro"] = item["intro"];
                top_pre["focusNum"] = item["focusNum"];
                top_pre["fansNum"] = item["fansNum"];
                top_pre["microBlogNum"] = item["microBlogNum"];
                top_pre["gender"] = item["gender"];
                top_pre["birthday"] = item["birthday"];
                top_pre["address"] = item["address"];
                var p_pre = item["content"];
                var pic_path = item["picPath"];
                var pic_pre = [];
                var index = 0;
                var video_pre = item["videoPath"];
                var bottom_pre = {};
                bottom_pre["forwardNum"] = item["numForward"];
                bottom_pre["commentNum"] = item["numComment"];
                bottom_pre["likeNum"] = item["numLike"];
                if (null != pic_path && pic_path.length != 0){
                    $.ajax({
                        url: "/getPicList",
                        type: "POST",
                        async:false,
                        dataType:"json",
                        data: {"pic_path":pic_path},
                        success: function(res) {
                            $.each($.parseJSON(res), function (i, item) {
                                pic_pre[index] = item;
                                index++;
                            })
                            genForwardInfo(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                        }
                    });
                }
            })
        }
    });
}
/*加载数据 end **********************************************************************************************************/





/*调整位置 start ********************************************************************************************************/
$(window).resize(function () {          //当浏览器大小变化时

    adjustPic();

    adjustModalContent();

});
function adjustPic() {
    var width = $(".image_view>.row>.col-md-4").width();
    var height = width;
    $(".image_view .col-md-4 a").width(width-10);
    $(".image_view .col-md-4 a").height(height-10);
    $(".image_view .col-md-4 a").css("line-height", height+'px');
}
/*调整位置 end **********************************************************************************************************/





/*添加转发点击事件 start *************************************************************************************************/
function addClickForForward(current){
    var turn;
    //var bid = $(current).parent().parent().parent().parent().find(".bid").val();
    if($(current).attr("turn") == "off"){
        genForwardReasonBar(current);
        turn = "on";
    }
    if($(current).attr("turn") == "on"){
        removeForwardReasonBar(current);
        turn = "off";
    }
    $(current).attr("turn", turn);
}
function addClickForPushForward(current){
    //current 为 btn_push_reply
    var uid = $("body > .uid").val();
    var bid = $(current).parent().find(".bid").val();
    var reason = $(current).parent().find(".text_push_reply").val();
    $.ajax({
        url: "/home/forward/blog",
        type: "POST",
        dataType:"json",
        data: {"bid":bid,"reason":reason,"uid":uid},
        success: function(res) {
            if(null != res){
                var microBlog = $.parseJSON(res);
                //传送图片，以数组的方式获取路径
                var hide_pre = {};
                hide_pre["uid"] = uid;
                hide_pre["bid"] = microBlog["id"];
                var top_pre = {};
                top_pre["nickName"] = user["nickName"];
                top_pre["iconHead"] = user["iconHead"];
                top_pre["timePush"] = "1秒前";
                top_pre["intro"] = user["intro"];
                top_pre["focusNum"] = user["focusNum"];
                top_pre["fansNum"] = user["fansNum"];
                top_pre["microBlogNum"] = user["microBlogNum"];
                top_pre["gender"] = user["gender"];
                top_pre["birthday"] = user["birthday"];
                top_pre["address"] = user["address"];
                var p_pre = microBlog["content"];
                var pic_pre = [];
                var video_pre = [];
                var bottom_pre = {};
                bottom_pre["forwardNum"] = 0;
                bottom_pre["commentNum"] = 0;
                bottom_pre["likeNum"] = 0;
                $(current).parent().remove();
                genForwardInfo(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                $(current).find("i").html(parseInt($(current).find("i").html())+1);
                $(current).addClass("forward_active");
            }
        }
    });
}
function genForwardInfo(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre){
    var tarBid = hide_pre["bid"];
    var has_forward = false;
    $.ajax({
        url:"/home/get/forward",
        type: "POST",
        async: false,
        dataType:"json",
        data: {"tarBid":tarBid},
        success: function(res) {
            //返回UserXMicroBlog
            if(null != res){

                var srcMicroBlog = $.parseJSON(res);
                var srcUserId = srcMicroBlog["userId"];
                var srcNickName = srcMicroBlog["nickName"];
                var srcContent = srcMicroBlog["content"];

                p_pre =
                    p_pre+
                    '//转发自'+
                    '<a href="/personal/'+ srcUserId + '">'+ srcNickName +'</a>：'+
                    srcContent;


                var pic_path = srcMicroBlog["picPath"];
                var index = 0;
                $.ajax({
                    url: "/getPicList",
                    type: "POST",
                    async: false,
                    dataType:"json",
                    data: {"pic_path":pic_path},
                    success: function(res) {
                        //返回图片列表，路径，宽，高
                        $.each($.parseJSON(res), function (i, item) {
                            pic_pre[index] = item;
                            index++;
                        })
                        genMicroBlog(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                        has_forward = true;
                    }
                });
            }
        },
        error:function (xhr,status,error) {
            genMicroBlog(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
        }
    })
}
function genForwardReasonBar(current){
    var bid = $(current).parent().parent().parent().parent().find(".bid").val();
    alert(bid);
    var forwardReasonBar =
        '<div class="bar_push_reply clearfix">'+
        '<input type="hiden" class="bid" value="'+ bid +'" />'+
        '<textarea class="text_push_reply" rows="1"></textarea>'+
        '<a class="btn_push_reply" onclick="addClickForPushForward(this)">'+
        '<i class="iconfont icon-xiangyou3"></i>'+
        '</a>'+
        '</div>';
    $(current).parent().parent().parent().append(forwardReasonBar);
}
function removeForwardReasonBar(current){
    $(current).parent().parent().next().remove();
}
/*添加转发点击事件 end ***************************************************************************************************/



/*添加评论点击事件 start ************************************************************************************************/
function addClickForComment(current){
    var turn;
    if($(current).attr("status") == "unload"){
        loadComment(current);
        showComment(current);
        $(current).attr("status", "loaded");
        turn = "on";
    }
    if($(current).attr("turn") == "off"){
        showComment(current);
        turn = "on";
    }
    if($(current).attr("turn") == "on"){
        hideComment(current);
        turn = "off";
    }
    $(current).attr("turn", turn);
}
function clickForPushComment(current){
    var content = $(current).parent().prev().find(".text_comment_blog").val();
    var uid = $("body > .uid").val();
    var bid = $(current).parent().parent().parent().parent().parent().parent().find(".bid").val();
    alert("uid:"+uid+"bid:"+bid)
    var comment = {};
    $.ajax({
        url: "/home/pc",
        type: "POST",
        dataType:"json",
        data: {"bid":bid, "uid":uid, "content":content},
        success: function(res) {
            if(null != res){
                comment = $.parseJSON(res);
                genComment(current, comment);
            }
        }
    });
}
function genComment(current, comment){

    //current为 发表  按钮

    var cid = comment["id"];
    var c_uid = comment["userId"];
    var nick_name = comment["nickName"];
    var icon_head = comment["iconHead"];
    var content = comment["content"];
    var comment_time = convertTimestamp(comment["commentTime"]);

    var comment_item =
        '<div class="comment_item clearfix">'+
        '<div class="head">'+
        '<a class="icon_head_sm" style="background-image: url('+ icon_head +')"></a>'+
        '</div>'+
        '<div class="content clearfix">'+
        '<div class="c_top">'+
        '<span class="nickname">'+ nick_name +'</span>'+
        '<span class="pushtime">'+ comment_time +'</span>'+
        '</div>'+
        '<div class="c_mid">'+
        '<p>'+ content +'</p>'+
        '</div>'+
        '<div class="c_bot clearfix">'+
        '<input type="hidden" class="cid" value="'+ cid +'" />'+
        '<input type="hiden" class="rid" value="" />'+
        '<a class="reply" onclick="addClickForReplyToComment(this)" turn="off">回复</a>'+
        '<a class="load" onclick="addClickForLoadReply(this)" status="unload" turn="off">查看</a>'+
        '</div>'+
        '</div>'+
        '</div>';

    $(current).parent().parent().parent().next().prepend(comment_item);
}
/*Y*/
function loadComment(current){
    var bid = $(current).parent().parent().parent().parent().find(".bid").val();

    var container_comment_blog =
        '<div class="container_comment_blog">'+
        '<div class="panel_comment_blog">'+
        '<div class="row">'+
        '<div class="col-xs-8 col-sm-8 col-md-8 no_padding_right">'+
        '<textarea class="text_comment_blog" rows="1"></textarea>'+
        '</div>'+
        '<div class="col-xs-4 col-sm-4 col-md-4 align_right">'+
        '<button type="button" class="btn btn-default align_vertical"  onclick="clickForPushComment(this)">发表</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="comment_list">'+
        '</div>'+
        '</div>';
    $(current).parent().parent().after(container_comment_blog);

    $.ajax({
        url: "/home/load/comment/list",
        type: "POST",
        dataType:"json",
        data: {"bid":bid},
        success: function(res) {
            if(null != res){
                current = $(current).parent().parent().parent().find("button");
                $.each($.parseJSON(res), function (i, item) {
                    genComment(current, item)
                })
            }
        }
    });
}
/*Y*/
function showComment(current) {
    $(current).parent().parent().next().show();
}
/*Y*/
function hideComment(current) {
    $(current).parent().parent().next().hide();
}
/*添加评论点击事件 end **************************************************************************************************/





/*添加回复点击事件 start ************************************************************************************************/
function addClickForLoadReply(current){
    var turn;
    if($(current).attr("status") == "unload"){
        loadReply(current);
        $(current).attr("status","loaded");
    }
    if($(current).attr("turn") == "off"){
        showReply(current);
        turn = "on";
    }
    if($(current).attr("turn") == "on"){
        hideReply(current);
        turn = "off";
    }
    $(current).attr("turn", turn);
}
function addClickForReplyToComment(current){
    var turn;
    if($(current).attr("turn") == "off"){
        genReplyBarForComment(current);
        turn = "on";
    }
    if($(current).attr("turn") == "on"){
        removeReplyBar(current);
        turn = "off";
    }
    $(current).attr("turn", turn);
}
function addClickForReplyToReply(current){
    var turn;
    if($(current).attr("turn") == "off"){
        genReplyBarForReply(current);
        turn = "on";
    }
    if($(current).attr("turn") == "on"){
        removeReplyBar(current);
        turn = "off";
    }
    $(current).attr("turn", turn)
}

function clickForPushReplyToComment(current){
    var content = $(current).parent().find(".text_push_reply").val();
    var uid = $("body > .uid").val();
    var cid = $(current).parent().find(".cid").val();
    var rid = $(current).parent().find(".rid").val();
    if($(current).parent().parent().next(".reply_list").length == 0){
        var reply_list =
            '<div class="reply_list">'+

            '</div>';
        $(current).parent().parent().parent().append(reply_list);
    }
    $.ajax({
        url: "/home/push/reply",
        type: "POST",
        dataType:"json",
        data: {"uid":uid,"cid":cid, "rid":rid, "content":content},
        success: function(res) {
            var reply = $.parseJSON(res)
            var bar_push_reply = $(current).parent();
            //current为reply_list
            current = $(current).parent().next();
            bar_push_reply.remove();
            genReply(current, reply);
            current.show();
        }
    });
}
function clickForPushReplyToReply(current){
    var content = $(current).parent().find(".text_push_reply").val();
    var cid = $(current).parent().find(".cid").val();
    var rid = $(current).parent().find(".rid").val();
    var uid = user["userId"];
    $.ajax({
        url: "/home/push/reply",
        type: "POST",
        dataType:"json",
        data: {"cid":cid, "rid":rid, "uid":uid,"content":content},
        success: function(res) {
            var reply = $.parseJSON(res)
            var bar_push_reply = $(current).parent();
            //current为reply_list
            current = $(current).parent().parent();
            bar_push_reply.remove();
            genReply(current,reply);
        }
    });

}


function genReplyBarForComment(current){
    //current 为 btn_push_reply
    var cid = $(current).parent().find(".cid").val();
    var rid = $(current).parent().find(".rid").val();
    var bar_push_reply =
        '<div class="bar_push_reply clearfix">'+
        '<input type="hidden" class="cid" value="'+ cid +'" />'+
        '<input type="hiden" class="rid" value="'+ rid +'" />'+
        '<textarea class="text_push_reply" rows="1"></textarea>'+
        '<a class="btn_push_reply" onclick="clickForPushReplyToComment(this)">'+
        '<i class="iconfont icon-xiangyou3"></i>'+
        '</a>'+
        '</div>';

    $(current).parent().parent().after(bar_push_reply);
}
function genReplyBarForReply(current){
    //current 为 btn_push_reply
    var cid = $(current).parent().find(".cid").val();
    var rid = $(current).parent().find(".rid").val();
    var bar_push_reply =
        '<div class="bar_push_reply clearfix">'+
        '<input type="hidden" class="cid" value="'+ cid +'" />'+
        '<input type="hiden" class="rid" value="'+ rid +'" />'+
        '<textarea class="text_push_reply" rows="1"></textarea>'+
        '<a class="btn_push_reply" onclick="clickForPushReplyToReply(this)">'+
        '<i class="iconfont icon-xiangyou3"></i>'+
        '</a>'+
        '</div>';

    $(current).parent().parent().after(bar_push_reply);
}


function removeReplyBar(current){
    $(current).parent().parent().next(".bar_push_reply").remove();
}
function genReply(current, reply){

    //current为reply_list

    var cur_rid = reply["id"];
    var cid = reply["commentId"];
    var rid = reply["replyId"];
    var uid = reply["userId"]; //不用到
    var nick_name = reply["nickName"];
    var content = reply["content"];
    var reply_time = convertTimestamp(reply["replyTime"]);

    var reply_item;
    if(null != rid && rid.length>30){
        $.ajax({
            url: "/home/get/reply",
            type: "POST",
            dataType:"json",
            data: {"rid":rid},
            success: function(res) {
                var reply2 = $.parseJSON(res);
                var uid2 = reply2["userId"];
                var nick_name2 = reply2["nickName"];
                reply_item =
                    '<div class="reply_item">'+
                    '<div class="r_top"><a href="/home/personal/'+ uid +'">'+ nick_name +'</a>回复<a href="/home/personal/'+ uid2 +'">'+ nick_name2 +'</a>:'+ content +'</div>'+
                    '<div class="r_bot clearfix">'+
                    '<input type="hidden" class="cid" value="'+ cid +'" />'+
                    '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
                    '<span class="pull-left">'+ reply_time +'</span>'+
                    '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
                    '</div>'+
                    '</div>';
                $(current).prepend(reply_item);
            }
        });
    } else {
        reply_item =
            '<div class="reply_item">'+
            '<div class="r_top"><a href="/home/personal/'+ uid +'">'+ nick_name +'</a>:'+ content +'</div>'+
            '<div class="r_bot clearfix">'+
            '<input type="hidden" class="cid" value="'+ cid +'" />'+
            '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
            '<span class="pull-left">'+ reply_time +'</span>'+
            '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
            '</div>'+
            '</div>';

        $(current).prepend(reply_item);
    }
}
function loadReply(current){
    //current为查看
    if($(current).parent().parent().next(".reply_list").length == 0){
        var reply_list =
            '<div class="reply_list">'+

            '</div>';
        $(current).parent().parent().parent().append(reply_list);
    }
    var cid = $(current).parent().find(".cid").val();
    $(current).parent().parent().parent().append(reply_list);
    $(current).html("收起");
    $.ajax({
        url: "/home/load/reply/list",
        type: "POST",
        dataType:"json",
        data: {"cid":cid},
        success: function(res) {
            if(null != res){
                current = $(current).parent().parent().next(".reply_list");
                $.each($.parseJSON(res), function (i, item) {
                    genReply(current, item)
                })
            }
        }
    });
}
function showReply(current) {
    $(current).parent().parent().next(".reply_list").show();
    $(current).html("收起");

}
function hideReply(current) {
    $(current).parent().parent().next(".reply_list").hide();
    $(current).html("查看");
}
/*添加回复点击事件 end **************************************************************************************************/





/*微博图片点击事件 start *************************************************************************************************/
function addClickForImageView(current){
    //current 为 imagevie>a
    genModal(current);
}
function genModal(cur){

    var img_class;
    if($(cur).attr("adaptive") == "width"){
        img_class = "100% auto";
    } else {
        img_class = "auto 100%";
    }
    alert(img_class);
    var modal =
        '<div id="pic_modal" class="modal_wrapper">'+
        '<a id="pic_close" class="modal_close" onclick="addClickForCloseModal(this)">×</a>'+
        '<div id="pic_content" class="modal_content">'+
        /*'<img id="pic_img" class="'+ img_class +'"/>'+*/
        '</div>'+
        '<div id="pic_desc" class="modal_desc"></div>'+
        '</div>';

    $("body").prepend(modal);
    var pic_modal = $("#pic_modal");
    var pic_close = $("#pic_close");
    var pic_content = $("#pic_content");
    var pic_img = $("#pic_img");
    var pic_desc = $("#pic_desc");

    adjustModalContent();

    pic_desc.html($(cur).find("img").attr("alt"));
    pic_content.css("background-image","url("+$(cur).find("img").attr("src")+")");
    pic_content.css("background-size",img_class);
    pic_img.attr("src", $(cur).find("img").attr("src"));
    pic_modal.show();
}
function addClickForCloseModal(current){
    $(current).parent().hide();
    $(current).parent().remove();
}
function adjustModalContent(){
    var pic_modal = $("#pic_modal");
    var pic_close = $("#pic_close");
    var pic_content = $("#pic_content");
    var pic_img = $("#pic_img");
    var pic_desc = $("#pic_desc");

    var width = pic_modal.width();
    var height = pic_modal.height();
    if(width > height){
        pic_modal.css("line-height", height+"px");
        pic_content.width(height);
        pic_content.height(height);
        pic_content.css("line-height", height+"px");
    } else{
        pic_modal.css("line-height", height+"px");
        pic_content.width(width);
        pic_content.height(width);
        pic_content.css("line-height", width+"px");
    }
}
/*微博图片点击事件 end ***************************************************************************************************/




/*转换日期 start ********************************************************************************************************/
function convertTimestamp(timestamp){
    var cur_date = new Date();
    var tar_date = new Date(timestamp);

    var year = tar_date.getFullYear();
    var month = tar_date.getMonth();
    var day = tar_date.getDay();
    var hour = tar_date.getHours();
    var minute = tar_date.getMinutes();
    var second = tar_date.getSeconds();

    var diff_milli = cur_date.getTime() - tar_date.getTime();
    var diff_seconds = Math.ceil(diff_milli/1000);
    var diff_minutes = Math.ceil(diff_milli/(60*1000));
    var diff_hours = Math.ceil(diff_milli/(60*60*1000));
    var diff_days = Math.ceil(diff_milli/(24*60*60*1000));

    var actual_date = year+month+day+hour+minute+second;
    if (diff_seconds < 60){
        return diff_seconds + "秒前";
    } else if (diff_minutes < 60){
        return diff_minutes + "分钟前";
    } else if (diff_hours < 24){
        return diff_hours + "小时前";
    } else if (diff_days < 4){
        return diff_days + "天前";
    } else {
        return actual_date;
    }

}
/*转换日期 end **********************************************************************************************************/





