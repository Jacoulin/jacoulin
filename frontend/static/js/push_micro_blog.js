/**
 * Created by Jacoulin on 2017/4/5.
 */

//查看结果

function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');

    /*str = str.replace(/^\[/g, "");
     str = str.replace(/\]$/g, "");

     str = Object.keys(alt).filter(function(x){return alt[x] == str});
     alert(str);
     str = "["+ str +"]";*/
    //str = str.replace(/\[([\u4e00-\u9fa5]*)\]/g, "[" + filterKey("$1") + "]");
    str = str.replace(/\[[\u4e00-\u9fa5]*\]/g, filterKey);
    return str;
}
function filterKey(ori_str) {
    var str = ori_str;
    str = str.replace(/^\[/g, "");
    str = str.replace(/\]$/g, "");
    var tar_str = Object.keys(alt).filter(function(x){return alt[x] == str});
    if(tar_str == ""){
        return ori_str;
    }
    tar_str = tar_str.toString().replace(/em_([0-9]*)/g,'<img src="/dist/images/arclist/$1.gif" border="0" />');
    return tar_str;
}

function genMicroBlog(hide_pre, top_pre, p_pre, pic_pre, video_pre, bottom_pre){
    var cur_uid = $("body > .uid").val();
    var uid = hide_pre["uid"];
    var hide =
        '<input class=uid" type="text" value="'+ hide_pre["uid"] +'"/>'+
        '<input class="bid" type="text" value="'+ hide_pre["bid"] +'"/>';
    var iconhead = top_pre["iconHead"];
    var nickname = top_pre["nickName"];
    var timepush = top_pre["timePush"];
    var focus_num = top_pre["focusNum"];
    var fans_num = top_pre["fansNum"];
    var micro_blog_num = top_pre["microBlogNum"];
    //alert(bottom_pre["forwardNum"]);
    var top =
        '<div class="panel_micro_blog_head">'+
        '<a href="/personal/'+ hide_pre["uid"] +'" class="icon_head pull-left" style="background-image: url('+ iconhead +')" title="关注:'+ focus_num+'--粉丝:'+fans_num+'--微博:'+micro_blog_num+'">'+
        '</a>'+
        '<div class="span_username pull-left">'+
        nickname+
        '</div>'+
        '<div class="span_date pull-left">'+
        timepush+
        '</div>'+
        '</div>';
    var body;

    p_pre = replace_em(p_pre);
    p_pre.replace("\"", "")
    var p = '<p>'+ p_pre +'</p>';
    var img;

    var img_arr = [];
    var img_src;
    var img_width;
    var img_height;

    var adaptive;

    var img_class;
    if(pic_pre != null){
        //单图微博
        if(pic_pre.length == 1){
            img_arr = pic_pre[0].split(",");
            img_src = img_arr[0];
            img_width = img_arr[1];
            img_height = img_arr[2];
            if(img_width > img_height){
                adaptive = "width";
                img_class = "width: 100%;vertical-align: middle;";
            } else {
                adaptive = "height"
                img_class = "height: 100%;vertical-align: initial;";
            }
            img =
                '<div class="image_view">'+
                '<div class="row">'+
                '<div class="col-xs-12 col-sm-12 col-md-12">'+
                '<a href="javascript:void(0);" onclick="addClickForImageView(this)" adaptive="'+ adaptive +'">' +
                '<img src="'+ img_src +'" style="'+ img_class +'"/>'+
                '</a>'+
                '</div>'+
                '</div>'+
                '</div>';
        } else {//多图微博
            var index = 0;
            var pic_rows = Math.floor(pic_pre.length/3) + 1;
            img = '<div class="image_view">';
            for(var i = 0; i < pic_rows - 1; i++){
                img += '<div class="row">';
                for(var j = 0; j < 3; j++) {
                    img_arr = pic_pre[index].split(",");
                    img_src = img_arr[0];
                    img_width = img_arr[1];
                    img_height = img_arr[2];
                    if(img_width > img_height){
                        adaptive = "width";
                        img_class = "width_than_height";
                    } else {
                        adaptive = "height"
                        img_class = "height_than_width";
                    }
                    img +=
                        '<div class="col-xs-4 col-sm-4 col-md-4">' +
                        '<a href="javascript:void(0);" onclick="addClickForImageView(this)" adaptive="'+ adaptive +'">' +
                        '<img src="'+ img_src +'" class="'+ img_class +'"/>'+
                        '</a>' +
                        '</div>';
                    index++;
                }
                img += '</div>';
            }
            if(pic_pre.length%3 != 0){
                img += '<div class="row">';
                for(var j = 0; j < pic_pre.length - (pic_rows - 1)*3; j++){
                    img_arr = pic_pre[index].split(",");
                    img_src = img_arr[0];
                    img_width = img_arr[1];
                    img_height = img_arr[2];
                    if(img_width > img_height){
                        adaptive = "width";
                        img_class = "width_than_height";
                    } else {
                        adaptive = "height"
                        img_class = "height_than_width";
                    }
                    img +=
                        '<div class="col-xs-4 col-sm-4 col-md-4">' +
                        '<a href="javascript:void(0);" onclick="addClickForImageView(this)" adaptive="'+ adaptive +'">' +
                        '<img src="'+ img_src +'" class="'+ img_class +'"/>'+
                        '</a>' +
                        '</div>';
                    index++;
                }
                img += '</div>';
            }
            img += '</div>';
        }
    }
    body =
        '<div class="panel_micro_blog_body clearfix">'+
        p+
        img+
        '</div>';
    var bottom =
        '<div class="panel_micro_blog_foot">'+
        '<div class="row">'+
        '<div class="col-xs-4 col-sm-4 col-md-4 align_center">'+
        '<a class="forward" href="javascript:void(0);" onclick="addClickForForward(this)" turn="off">'+
        '<i class="iconfont icon-zhuanfa2">'+ bottom_pre["forwardNum"] +'</i>'+
        '</a>'+
        '</div>'+
        '<div class="col-xs-4 col-sm-4 col-md-4 align_center border_lxr">'+
        '<a class="comment" href="javascript:void(0);" onclick="addClickForComment(this)" status="unload" turn="off">'+
        '<i class="iconfont icon-pinglun1">'+ bottom_pre["commentNum"] +'</i>'+
        '</a>'+
        '</div>'+
        '<div class="col-xs-4 col-sm-4 col-md-4 align_center">'+
        '<a class="like" href="javascript:void(0);" onclick="addClickForLike(this)" status="unlike">'+
        '<i class="iconfont icon-zan">'+ bottom_pre["likeNum"] +'</i>'+
        '</a>'+
        '</div>'+
        '</div>'+
        '</div>';
    var micro_blog =
        '<div class="container_micro_blog_item">'+
        '<div class="panel_micro_blog">'+
        hide + top + body + bottom+
        '</div>'+
        '</div>';
    $(".container_micro_blog_list").prepend(micro_blog);

    /*$("container_micro_blog_item input.uid").val(hide_pre["uid"]);
    $("container_micro_blog_item input.bid").val(hide_pre["bid"]);*/
    adjustPic();
}

var alt = {
    "em_1" : "微笑",
    "em_2" : "撇嘴",
    "em_3" : "色",
    "em_4" : "发呆",
    "em_5" : "流泪",
    "em_6" : "害羞",
    "em_7" : "闭嘴",
    "em_8" : "睡",
    "em_9" : "大哭",
    "em_10" : "尴尬",
    "em_11" : "发怒",
    "em_12" : "调皮",
    "em_13" : "呲牙",
    "em_14" : "惊讶",
    "em_15" : "难过",
    "em_16" : "冷汗",
    "em_17" : "抓狂",
    "em_18" : "吐",
    "em_19" : "偷笑",
    "em_20" : "可爱",
    "em_21" : "白眼",
    "em_22" : "傲慢",
    "em_23" : "饥饿",
    "em_24" : "困",
    "em_25" : "惊恐",
    "em_26" : "流汗",
    "em_27" : "憨笑",
    "em_28" : "大兵",
    "em_29" : "奋斗",
    "em_30" : "咒骂",
    "em_31" : "疑问",
    "em_32" : "嘘",
    "em_33" : "晕",
    "em_34" : "折磨",
    "em_35" : "衰",
    "em_36" : "敲打",
    "em_37" : "再见",
    "em_38" : "擦汗",
    "em_39" : "抠鼻",
    "em_40" : "糗大了",
    "em_41" : "坏笑",
    "em_42" : "左哼哼",
    "em_43" : "右哼哼",
    "em_44" : "打哈欠",
    "em_45" : "鄙视",
    "em_46" : "委屈",
    "em_47" : "快哭了",
    "em_48" : "阴险",
    "em_49" : "亲亲",
    "em_50" : "吓",
    "em_51" : "可怜",
    "em_52" : "抱抱",
    "em_53" : "月亮",
    "em_54" : "太阳",
    "em_55" : "炸弹",
    "em_56" : "骷髅头",
    "em_57" : "菜刀",
    "em_58" : "猪头",
    "em_59" : "西瓜",
    "em_60" : "咖啡",
    "em_61" : "米饭",
    "em_62" : "爱心",
    "em_63" : "赞一个",
    "em_64" : "踩一下",
    "em_65" : "握手",
    "em_66" : "耶",
    "em_67" : "抱拳",
    "em_68" : "勾引",
    "em_69" : "好的",
    "em_70" : "不行",
    "em_71" : "玫瑰",
    "em_72" : "凋谢",
    "em_73" : "红唇",
    "em_74" : "爱情",
    "em_75" : "飞吻",
}