/**
 * Created by Jacoulin on 2017/4/4.
 */
var user = {};
$(document).ready(function(){
    loadUser();
    loadMicroBlogList();

    adjustContainerPos();
    adjustContainerRightPos();

    addClickForChoiceSkin();
    addClickForAddPicBefore();
    actionForAddPicBefore();
    adjustPic();
    //changeUserRecommend();
});


/*加载 start ************************************************************************************************************/
function loadUser(){
    var uid = $("body>.uid").val();
    $.ajax({
        type : "post",
        url : "/home/load/user",
        data:{"uid":uid},	//数据
        dataType:"json",
        success:function(res) {    //发送请求成功
            //alert(res);
            user = $.parseJSON(res);
            var uid = user["userId"];
            var iconHead = user["iconHead"];
            var nickName = user["nickName"];
            var focusNum = user["focusNum"];
            var fansNum = user["fansNum"];
            var microBlogNum = user["microBlogNum"];
            $(".icon_head_sm").css("background-image","url("+ iconHead +")");
            $("#head").css("background-image","url("+ iconHead +")");
            $("#head").attr("href","/personal/"+uid);
            $("#nickName").html(nickName);
            $("#num_focus > span:first").html(focusNum);
            $("#num_fans > span:first").html(fansNum);
            $("#num_blog > span:first").html(microBlogNum);
        }
    });
}
function loadMicroBlogList(){
    var uid = $("#userInfo").html();
    $.ajax({
        url: "/home/list",
        type: "POST",
        dataType:"json",
        data: {"uid":uid, "begin":"0", "offset":"10", "sort":"time_push"},
        success: function(list) {
            //$.each(res,genMicroBlog());
            //genMicroBlog(top_pre, p_pre, pic_pre, video_pre, bottom_pre)
            for(var i= 0; i < list.length; i++){
                var hide_pre = {};
                hide_pre["uid"] = list[i].userId;
                hide_pre["bid"] = list[i].microBlogId;
                var top_pre = {};
                top_pre["nickName"] = list[i].nickName;
                top_pre["iconHead"] = list[i].iconHead;
                top_pre["timePush"] = convertTimestamp(list[i].timePush);
                top_pre["intro"] = list[i].intro;
                top_pre["focusNum"] = list[i].focusNum;
                top_pre["fansNum"] = list[i].fansNum;
                top_pre["microBlogNum"] = list[i].microBlogNum;
                top_pre["gender"] = list[i].gender;
                top_pre["birthday"] = list[i].birthday;
                top_pre["address"] = list[i].address;
                var p_pre = list[i].content;
                //能取到picPath
                var pic_path = list[i].picPath;

                var pic_pre = [];
                var index = 0;
                var video_pre = list[i].videoPath;
                var bottom_pre = {};
                bottom_pre["forwardNum"] = list[i].numForward;
                bottom_pre["commentNum"] = list[i].numComment;
                bottom_pre["likeNum"] = list[i].numLike;
                if (null != pic_path && pic_path.length != 0) {
                    $.ajax({
                        url: "/getPicList",
                        type: "POST",
                        async: false,
                        dataType: "json",
                        data: {"pic_path": pic_path},
                        success: function (res) {
                            $.each($.parseJSON(res), function (i, item) {
                                pic_pre[index] = item;
                                index++;
                            })
                            //genForwardInfo(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                        }
                    });

                }
                genForwardInfo(hide_pre, top_pre, p_pre, pic_pre, video_pre, bottom_pre);
            }
            /*$.each(res, function (i, item) {
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
                //能取到picPath
                var pic_path = item["picPath"];

                var pic_pre = [];
                var index = 0;
                if (null != pic_path && pic_path.length != 0){
                    $.ajax({
                        url: "/getPicList",
                        type: "POST",
                        dataType:"json",
                        data: {"pic_path":pic_path},
                        success: function(res) {
                            $.each(res, function (i, item) {
                                pic_pre[index] = item;
                                index++;
                            })
                            var video_pre = item["videoPath"];
                            var bottom_pre = {};
                            bottom_pre["forwardNum"] = item["forwardNum"];
                            bottom_pre["commentNum"] = item["commentNum"];
                            bottom_pre["likeNum"] = item["likeNum"];
                            genMicroBlog(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                            //genForwardInfo(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                        }
                    });
                }
            })*/
        }
    });

}
/*加载 end **************************************************************************************************************/





/*调整位置 start ********************************************************************************************************/
$(window).resize(function () {          //当浏览器大小变化时
    adjustContainerPos();
    adjustContainerRightPos();
    adjustPic();
    adjustAddPic();
    adjustModalContent();
    /*alert($(document).height());        //浏览器时下窗口文档的高度
     alert($(document.body).height());   //浏览器时下窗口文档body的高度
     alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin*/
});

function adjustPic() {
    var width = $(".image_view>.row>.col-md-4").width();
    var height = width;
    $(".image_view .col-md-4 a").width(width-10);
    $(".image_view .col-md-4 a").height(height-10);
    $(".image_view .col-md-4 a").css("line-height", height+'px');

    var single_pic_width = $(".image_view>.row>.col-md-12").width();
    var single_pic_height = single_pic_width;
    $(".image_view .col-md-12 a").width(single_pic_width-10);
    $(".image_view .col-md-12 a").height(single_pic_height-10);
    $(".image_view .col-md-12 a").css("line-height", single_pic_height+'px');

}
function adjustAddPic() {
    var width = $("#choice_pic>.row>div").width();
    var height = width;
    $("#choice_pic a").width(width-10);
    $("#choice_pic a").height(height-10);
    $("#choice_pic a>input").width(width-10);
    $("#choice_pic a>input").height(height-10);
    $("#choice_pic a").css("line-height", height+'px');
}
function adjustContainerPos(){
    var window_width = $(window).width();
    var window_height = $(window).height();          //浏览器时下窗口可视区域高度

    var container_width = $("#container_login_pos").width();
    var container_height = $("#container_login_pos").height();

    if(container_height < window_height){
        var margin_top = (window_height - container_height) / 2;
        $(".container").css("margin-top", margin_top);
    }
}
function adjustContainerRightPos(){
    var window_width = $(window).width();
    var window_height = $(window).height();
    var row_micro_blog_width = $("#row_micro_blog").width();
    var fixed_right_width = row_micro_blog_width*25/100;
    var fixed_left_width = row_micro_blog_width*16.66666667/100;
    if(window_width < 992){
        fixed_left_width = row_micro_blog_width*25/100;
    }
    $("#fixed_right").width($("#fixed_right").parent().width());
    $("#fixed_right").height(window_height - 56);
    $("#fixed_right .panel_personal_head").width($("#fixed_right").parent().width());
    $("#fixed_right .panel_personal_head").height($("#fixed_right").parent().width());
    $("#fixed_left").css("width", fixed_left_width);
}
/*调整位置 end **********************************************************************************************************/





/*换肤 start ************************************************************************************************************/
function addClickForChoiceSkin(){
    var nochose = "3px solid transparent"
    var chosed = "3px solid #d2c17f";
    $("#beige").click(function(){
        $("#container_push_blog").css("background-color","beige");
        $("#beige div").css("border", chosed);
        $("#grey div").css("border", nochose);
        $("#brown div").css("border", nochose);
    });
    $("#grey").click(function(){
        $("#container_push_blog").css("background-color","grey");
        $("#beige div").css("border", nochose);
        $("#grey div").css("border", chosed);
        $("#brown div").css("border", nochose);
    });
    $("#brown").click(function(){
        $("#container_push_blog").css("background-color","brown");
        $("#beige div").css("border", nochose);
        $("#grey div").css("border", nochose);
        $("#brown div").css("border", chosed);
    });
}
/*换肤 end **************************************************************************************************************/





/*添加发表微博的点击事件 start *******************************************************************************************/
function addClickForPushMicroBlog(current){
    var content = $("#text_push_blog").val();
    var pic = [];
    var pic_str = "";
    var pic_w;
    var pic_h;
    var i = 0;
    $("#choice_pic img").each(function () {
        if($(this).parent().attr("status") == "added"){
            pic[i] = $(this).attr("src");
            pic_w = $(this).attr("w");
            pic_h = $(this).attr("h");
            pic_str += $(this).attr("src")+",";
            pic[i] += ","+pic_w+","+pic_h;
            i++;
        }
    });
    $.ajax({
        type : "post",
        url : "/home/pmb",
        data:{"content":content},	//数据
        dataType:"json",
        success:function(bid) {    //发送请求成功
            var uid = $("body>.uid").val();
            if (null != bid ) {
                $.ajax({
                    url: "/uploadToMicroBlogPic",
                    type: "POST",
                    data: {"uid":uid,"bid":bid,"pic": pic_str},
                    dataType: "json",
                    success: function (res) {
                        var code = res.code;
                        if (code == "succeed") {
                            //传送图片，以数组的方式获取路径
                            var hide_pre = {};
                            hide_pre["uid"] = uid;
                            hide_pre["bid"] = bid;
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
                            var p_pre = content;
                            var pic_pre = pic;
                            var index = 0;
                            var video_pre = "";
                            var bottom_pre = {};
                            bottom_pre["forwardNum"] = 0;
                            bottom_pre["commentNum"] = 0;
                            bottom_pre["likeNum"] = 0;
                            alert(pic_pre.length);
                            genMicroBlog(hide_pre,top_pre, p_pre, pic_pre, video_pre, bottom_pre);
                            $("#num_blog > span:first").html(parseInt($("#num_blog > span:first").html())+1);
                        }
                    }
                });

                /*$("#show").html(replace_em(content));
                 genMicroBlog(replace_em(content), pic);*/
            }/*else if(code == "000"){
                window.location.replace("/frontend/login.jsp");
            }else if(code == "001"){
                alert("发表内容不能为空");
            } else if(code == "002"){
                alert("发表内容太长");
            } else if(code == "003"){
                alert("未捕获异常");
            } else {
                alert("什么鬼");
            }*/
        }
    });
    //$("#show").html(replace_em(content));
}
/*添加发表微博的点击事件 end *********************************************************************************************/





/*发表微博时添加图片点击事件 start ***************************************************************************************/
function showChoicePic(){
    $(".btn_insert_pic").addClass("btn_insert_pic_active");

    $("#choice_pic").show();
    adjustAddPic();
}
function hideChoicePic(){
    $(".btn_insert_pic").removeClass("btn_insert_pic_active");
    $("#choice_pic").hide();
}
function addClickForAddPicBefore() {
    var count = 1;
    $(".btn_insert_pic").click(function () {
        if(count%2){
            showChoicePic();
            count += 1;
        } else {
            hideChoicePic();
            count -= 1;
        }
    });
}
function actionForAddPicBefore(){
    $("#choice_pic a").mouseenter(function () {
        if($(this).attr("status") == "before"){
            $(this).attr("status","after");
            $(this).find("img").attr("src", "/dist/images/add_pic_after.png");
        }
    });

    $("#choice_pic a").mouseleave(function(){
        if($(this).attr("status") == "after"){
            $(this).attr("status","before");
            $(this).find("img").attr("src", "/dist/images/add_pic_before.png");
        }
    });
}
function addPicToMicroBlog(current) {

    var add_pic =
        '<div class="col-sm-4 col-md-4 col-xs-4">'+
        '<a status="before">'+
        '<img src="/dist/images/add_pic_before.png" alt="添加图片" title="点击上传图片" />'+
        '<input type="file" onchange="addPicToMicroBlog(this)"/>'+
        '</a>'+
        '</div>';

    var fd = new FormData();
    var realWidth;
    var realHeight;
    fd.append("pic", $(current).get(0).files[0]);
    var current_a;
    var current_a_img;
    //alert($("#inputImage").get(0).files[0]+"   "+$("#inputImage").get(0).files[1]);
    $.ajax({
        url: "/uploadToTempPic",
        type: "POST",
        processData: false,
        contentType: false,
        dataType:"json",
        data: fd,
        success: function(res) {
            var img = res["img"].replace(/^\"|\"$/g, "");
            realWidth = res["width"];
            realHeight = res["height"];
            current_a = $(current).parent();
            if(current_a.attr("status") != "added"){
                current_a.parent().parent().append(add_pic);
                actionForAddPicBefore();
                adjustAddPic();
            }
            current_a_img = current_a.find("img");
            if(realWidth > realHeight){
                current_a_img.removeClass("height_than_width");
                current_a_img.addClass("width_than_height");
            } else {
                current_a_img.removeClass("width_than_height");
                current_a_img.addClass("height_than_width");
            }
            current_a_img.attr("src", img);
            current_a.attr("status", "added");
        }
    });
}
/*发表微博时添加图片点击事件 end *****************************************************************************************/





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
                        $(current).find("i").html(parseInt($(current).find("i").html())+1);
                        $(current).addClass("forward_active");
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
                var comment_num = $(current).parent().parent().parent().parent().parent().parent().find(".icon-pinglun1").html();
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
        '<a href="/personal/'+ c_uid +'" class="icon_head_sm" style="background-image: url('+ icon_head +')"></a>'+
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
        async:false,
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




/*添加喜欢点击事件 start ************************************************************************************************/
function addClickForLike(current){
    var status;
    if($(current).attr("status") == "unlike"){
        addLike(current);
        status = "liked";
    }
    if($(current).attr("status") == "liked"){
        removeLike(current);
        status = "unlike";
    }
    $(current).attr("status", status);
}
function addLike(current){
    var uid = $("body > .uid").val();
    var bid = $(current).parent().parent().parent().parent().parent().find(".bid").val();
    alert("test");
    $.ajax({
        url:"/home/like/blog",
        type:"post",
        async:false,
        dataType:"json",
        data:{"bid":bid,"uid":uid},
        success:function (res) {
            if(res == "Y"){
                $(current).find("i").html(parseInt($(current).find("i").html())+1);
                $(current).addClass("like_active");
            }
        }
    })
}
function removeLike(current){
    var uid = $("body > .uid").val();
    var bid = $(current).parent().parent().parent().parent().parent().find(".bid").val();
    $.ajax({
        url:"/home/unlike/blog",
        type:"post",
        async:false,
        dataType:"json",
        data:{"bid":bid,"uid":uid},
        success:function (res) {
            if(res == "Y"){
                $(current).find("i").html(parseInt($(current).find("i").html())-1);
                $(current).removeClass("like_active");
            }
        }
    })
}
/*Y*/

/*添加喜欢点击事件 end **************************************************************************************************/




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
function addClickForRemoveReply(current){
    var rid = $(current).parent().parent().find(".rid").val();
    $.ajax({
        url:"/home/remove/reply",
        type:"post",
        dataType:"json",
        data:{"rid":rid},
        success:function (res) {
            if(res == "succeed"){
                $(current).parent().parent().remove();
            } else {
                alert("删除评论出错了");
            }
        }
    })
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

    var cur_uid = $("body > .uid").val();
    var cur_rid = reply["id"];
    var cid = reply["commentId"];
    var rid = reply["replyId"];
    var uid = reply["userId"];
    var nick_name = reply["nickName"];
    var content = reply["content"];
    var reply_time = convertTimestamp(reply["replyTime"]);

    var reply_item;
    if(null != rid && rid.length>30){
        $.ajax({
            url: "/home/get/reply",
            async:false,
            type: "POST",
            dataType:"json",
            data: {"rid":rid},
            success: function(res) {
                var reply2 = $.parseJSON(res);
                var uid2 = reply2["userId"];
                var nick_name2 = reply2["nickName"];
                if(cur_uid == uid){
                    reply_item =
                        '<div class="reply_item">'+
                        '<div class="r_top"><a href="/personal/'+ uid +'">'+ nick_name +'</a>回复<a href="/personal/'+ uid2 +'">'+ nick_name2 +'</a>:'+ content +'</div>'+
                        '<div class="r_bot clearfix">'+
                        '<input type="hidden" class="cid" value="'+ cid +'" />'+
                        '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
                        '<span class="pull-left">'+ reply_time +'</span>'+
                        '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
                        '<a class="delete" onclick="addClickForRemoveReply(this)" style="margin-right:10px">删除</a>'+
                        '</div>'+
                        '</div>';
                } else {
                    reply_item =
                        '<div class="reply_item">'+
                        '<div class="r_top"><a href="/personal/'+ uid +'">'+ nick_name +'</a>回复<a href="/personal/'+ uid2 +'">'+ nick_name2 +'</a>:'+ content +'</div>'+
                        '<div class="r_bot clearfix">'+
                        '<input type="hidden" class="cid" value="'+ cid +'" />'+
                        '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
                        '<span class="pull-left">'+ reply_time +'</span>'+
                        '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
                        '</div>'+
                        '</div>';
                }

                $(current).prepend(reply_item);
            }
        });
    } else {
        if(cur_uid == uid){
            reply_item =
                '<div class="reply_item">'+
                '<div class="r_top"><a href="/personal/'+ uid +'">'+ nick_name +'</a>:'+ content +'</div>'+
                '<div class="r_bot clearfix">'+
                '<input type="hidden" class="cid" value="'+ cid +'" />'+
                '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
                '<span class="pull-left">'+ reply_time +'</span>'+
                '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
                '<a class="delete" onclick="addClickForRemoveReply(this)" style="margin-right:10px">删除</a>'+
                '</div>'+
                '</div>';
        } else {
            reply_item =
                '<div class="reply_item">'+
                '<div class="r_top"><a href="/personal/'+ uid +'">'+ nick_name +'</a>:'+ content +'</div>'+
                '<div class="r_bot clearfix">'+
                '<input type="hidden" class="cid" value="'+ cid +'" />'+
                '<input type="hiden" class="rid" value="'+ cur_rid +'" />'+
                '<span class="pull-left">'+ reply_time +'</span>'+
                '<a class="reply" onclick="addClickForReplyToReply(this)" turn="off">回复</a>'+
                '</div>'+
                '</div>';
        }

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
        async:false,
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





/*添加跳转到personal.jsp的点击事件 start *********************************************************************************/
function addClickForPersonal(){
    $(".panel_personal .panel_personal_head a").click(function () {
        turnToPersonal();
    });
    $(".panel_personal .panel_personal_body .span_username").click(function () {
        turnToPersonal();
    });
    $("#num_blog").click(function () {
        turnToPersonal();
    });

    $("#num_focus").click(function () {
        turnToFocus();
    });

    $("#num_fans").click(function () {
        turnToFans();
    });
}
function turnToPersonal(){

}
function turnToFocus(){

}
function turnToFans(){

}
/*添加跳转到personal.jsp的点击事件 end ***********************************************************************************/





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


/*用户推荐轮播************************************************************************************************************/
function changeUserRecommend(){
    var scrollTimer = setInterval(function() {
        if($("#user_recommend>div").css("margin-top") == "0px"){
            $("#user_recommend>div").animate({"margin-top":"-55px"});
        }else if($("#user_recommend>div").css("margin-top") == "-55px"){
            $("#user_recommend>div").animate({"margin-top":"-110px"});
        }else if($("#user_recommend>div").css("margin-top") == "-110px"){
            $("#user_recommend>div").animate({"margin-top":"0px"});
        }
    }, 3000);
}