/**
 * Created by Jacoulin on 2017/3/27.
 */
$(document).ready(function(){
    showYear();
    showMonth();
    $("#ul_year li").click(function () {
        if($("#ul_month li.visited").length != 0){
            $("#date").val($(this).html() + "-" + $("#ul_month li.visited").html());
        } else {
            $("#date").val($(this).html());
        }
        $("#ul_year li.visited").removeClass("visited");
        $(this).addClass("visited");
        $(".date_list").css("left", "-206px");
    });
    $("#ul_month li").click(function () {
        $("#date").val($("#ul_year li.visited").html() + "-" + $(this).html());
        $("#ul_month li.visited").removeClass("visited");
        $(this).addClass("visited");
        showDate();
        $("#ul_date li").click(function () {
            $("#date").val($("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html() + "-" + $(this).html());
            $("#ul_date li.visited").removeClass("visited");
            $(this).addClass("visited");
        });
        $(".date_list").css("left", "-410px");
    });


    loadUser();

});





/*加载数据 start ********************************************************************************************************/
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
            genPersonal(user);
            $("#new_head").attr("src", getBackgrounImageToSrc($(".icon_head_lg_mask").css("background-image")));
            $(".icon_lg").css("background-image", $(".icon_head_lg_mask").css("background-image"));
            $(".icon_md").css("background-image", $(".icon_head_lg_mask").css("background-image"));
            $(".icon_sm").css("background-image", $(".icon_head_lg_mask").css("background-image"));
        }
    });
}
/*Y*/
function genPersonal(user){
    var uid =$("body>.uid").val();
    var id = user["id"];
    var nickName = user["nickName"];
    var iconHead = user["iconHead"];
    var intro = user["intro"];
    var focusNum = user["focusNum"];
    var fansNum = user["fansNum"];
    var microBlogNum = user["microBlogNum"];
    var gender = user["gender"];
    var born_date = new Date(user["birthday"]);
    var born_year = born_date.getFullYear();
    var born_month = born_date.getMonth();
    if(born_month < 9){
        born_month += 1;
        born_month = "0"+born_month;
    } else {
        born_month += 1;
    }
    $(".icon_head_sm").css("background-image","url("+ iconHead +")");
    var born_day = born_date.getDate();
    var birthday = born_year+"-"+born_month+"-"+born_day;
    var cur_date = new Date();
    var born_date = new Date(birthday);
    var age = cur_date.getFullYear() - born_date.getFullYear();
    var address = user["address"];

    $(".icon_head_sm").attr("style", "background-image:url("+ iconHead +")");

    $(".icon_head_lg_mask").attr("style", "background-image:url("+ iconHead +")");

    $("#id").val(id);
    $("#userId").val(uid);
    $("#iconHead").val(iconHead);
    $("#nickname").val(nickName);
    $("#intro").val(intro);
    if(gender == "男"){
        $("input[name='gender']:first").attr("checked","true");
    } else {
        $("input[name='gender']:last").attr("checked","true");
    }
    $("#birthday").val(birthday);
    $("#address").val(address);
}


/*日期选择器 start *******************************************************************************************************/
function showYear(){
    var date = new Date();
    var curYear = date.getFullYear();
    var yearList = "";
    for(var i = 1990; i <= curYear; i++){
        yearList = yearList + "<li>" + i + "</li>";
    }
    $("#ul_year").html(yearList);
}
function showMonth(){
    var monthList = "";
    for(var i = 1; i <= 12; i++){
        var month = i.toString();
        if(month.length < 2) {
            month = "0" + month;
        }
        monthList = monthList + "<li>" + month + "</li>";
    }
    $("#ul_month").html(monthList);
}
function showDate() {
    var date_val = $("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html();
    var reg = /^\d{4}-\d{2}$/;
    if (reg.test(date_val)){
        var year = date_val.split("-")[0];
        var month = date_val.split("-")[1];
        var dateList = "";
        var date_curMonth;
        var date_nextMonth;
        var dayNum;
        if (month != 12) {
            date_nextMonth = new Date(year, month, "01");
            date_curMonth = new Date(year, date_nextMonth.getMonth() - 1, "01");
            dayNum = (date_nextMonth - date_curMonth) / (24*60*60*1000);
        } else {
            dayNum = 31;
        }
        for(var i = 1; i <= dayNum; i++){
            var date = i.toString();
            if(date.length < 2) {
                date = "0" + date;
            }
            dateList = dateList + "<li>" + date + "</li>";
        }
        $("#ul_date").html(dateList);
    }
}
function backPre(){
    var date_list_left = $(".date_list").css("left");
    if (date_list_left == "-410px"){
        $("#date").val($("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html());
        $(".date_list").css("left", "-206px");
    }
    if (date_list_left == "-206px") {
        $("#date").val($("#ul_year li.visited").html());
        $(".date_list").css("left", "0px");
    }
}
function turnNext(){
    var date_list_left = $(".date_list").css("left");
    if (date_list_left == "0px"){
        if($("#ul_year li.visited").length!=0){
            if($("#ul_month li.visited").length!=0){
                $("#date").val($("#ul_year li.visited").html()+ "-" + $("#ul_month li.visited").html());
            } else{
                $("#date").val($("#ul_year li.visited").html());
            }
            $(".date_list").css("left", "-206px");
        }
    }
    if (date_list_left == "-206px") {
        if($("#ul_month li.visited").length!=0){
            if($("#ul_date li.visited").length!=0){
                $("#date").val($("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html() + "-" + $("#ul_date li.visited").html());
            } else {
                $("#date").val($("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html());
            }
            $(".date_list").css("left", "-410px");
        }
    }
}
function saveDate(){
    var date_val = $("#ul_year li.visited").html() + "-" + $("#ul_month li.visited").html() + "-" + $("#ul_date li.visited").html();
    var reg = /^\d{4}-\d{2}-\d{2}$/;
    if(reg.test(date_val)) {
        hideDateSelection();
        $("#birthday").val(date_val);
    } else {
        alert(date_val);
    }
}
/*日期选择器 end *********************************************************************************************************/




/*头像上传 start ********************************************************************************************************/
function choiceHead(){
    $("#inputImage").click();
}
function uploadFile() {
    var fd = new FormData();
    var realWidth;
    var realHeight;
    fd.append("upload", 1);
    fd.append("head", $("#inputImage").get(0).files[0]);
    alert($("#inputImage").get(0).files[0]);
    //alert($("#inputImage").get(0).files[0]+"   "+$("#inputImage").get(0).files[1]);
    $.ajax({
        url: "/uploadToTempHead",
        type: "POST",
        processData: false,
        contentType: false,
        dataType:"json",
        data: fd,
        success: function(res) {
            var img = res["img"].replace(/^\"|\"$/g, "");
            realWidth = res["width"];
            realHeight = res["height"];
            if(realWidth > realHeight){
                $("#new_head").css("max-width", "100%");
                $("#new_head").css("display", "inline-block");
                $("#new_head").css("position", "relative");
                $("#new_head").css("top", "-1px");
            } else {
                $("#new_head").css("max-height", "100%");
                $("#new_head").css("display", "block");
                $("#new_head").css("position", "static");
                $("#new_head").css("top", "0");
            }
            alert(realWidth+" "+realHeight);
            $("#new_head").attr("src", img);
            $(".icon_lg").css("background-image","url("+ img +")");
            $(".icon_md").css("background-image","url("+ img +")");
            $(".icon_sm").css("background-image","url("+ img +")");
        }
    });
}
function saveHead() {
    var src = $("#new_head").attr("src");
    $("#iconHead").val(src);
    $(".icon_head_lg_mask").css("background-image", "url("+ src +")");
    $(".icon_head_lg_mask").css("background-size", "auto 100%");
}
/*头像上传 end **********************************************************************************************************/

function initSkip(){
    var uid = $("#userId").val();
    $.ajax({
        url: "/init/skip",
        dataType: "json",
        data: {"uid": uid},
        success: function(res) {
            window.location.href='/frontend/home.jsp';
        }
    });
}

function getBackgrounImageToSrc(url){
    url = url.replace(/\(/, "");
    url = url.replace(/\)/, "");
    url = url.replace(/\"/g, "");
    var start = 'urlhttp://localhost:8080'.length;
    var end = url.length+1;
    return url.substr(start, end);
}