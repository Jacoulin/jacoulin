<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<title>init</title>
	<!-- Custom Theme files -->
    <link href="/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/dist/css/common.css" rel="stylesheet">
	<link href="/dist/css/init.css" rel="stylesheet">
	<link href="/dist/css/component.css" rel="stylesheet" type="text/css" media="all"/>

    <script src="/dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/dist/js/iconfont.js"></script>
	<!-- Custom Theme files -->
    <%--<script>
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

		});
		/*日期选择器*/
        function showYear(){
            var date = new Date();
			alert("stete");
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
        function uploadHead(){
			$("#uploadHead").click();
		}
		function uploadFile() {
            var fd = new FormData();
            fd.append("upload", 1);
            fd.append("inputImage", $("#inputImage").get(0).files[0]);
            $.ajax({
                url: "/uploadHead",
                type: "POST",
                processData: false,
                contentType: false,
                data: fd,
                success: function(d) {
                    d = d.replace(/^\"|\"$/g, "");
                    $("#new_head").attr("src", d);
                    $(".icon_lg").css("background-image","url("+ d +")");
                    $(".icon_md").css("background-image","url("+ d +")");
                    $(".icon_sm").css("background-image","url("+ d +")");
                }
            });
        }
        /**/
    </script>--%>
</head>
<body>
<!-- start log_nav -->
<div class="log_nav">
    <div class="container">
        <div class="icon_logo">
            <a href="/frontend/home.jsp">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhiwenline_"></use>
                </svg>
                <span>指间</span>
            </a>
        </div>
        <ul class="nav_right pull-right">
            <li>
                <a href="">首页</a>
            </li>
            <li>
                <a class="icon_head_sm" href="/personal/${uid}">
                </a>
                <%--<ul class="user_status">
                    <li>
                        <a href="">登录</a>
                    </li>
                    <li>
                        <a href="">注册</a>
                    </li>
                </ul>--%>
            </li>
            <li class="hidden-sm hidden-xs">
                <span></span>
            </li>
            <li class="hidden-sm hidden-xs choice_skin">
                <a id="beige">
                    <div style=" background-color: beige;"></div>
                </a>
                <a id="grey">
                    <div style=" background-color: grey;"></div>
                </a>
                <a id="brown">
                    <div style=" background-color:brown;"></div>
                </a>
            </li>
        </ul>
    </div>
</div>
<!-- end log_nav -->
	<div class="container margin_top">
        <div id="row_personal" class="row">
            <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
                <form action="/init" method="post">
					<div class="panel_personal">
						<div class="panel_personal_head">
							<div class="panel_head">
                                <a class="icon_head_lg_mask" data-toggle="modal" data-target="#myModal">

                                </a>
							</div>
						</div>
						<div class="panel_personal_body">
							<div class="panel_personal_info">
								<div class="panel_row">
									<div class="row">
										<div class="col-xs-3 col-sm-4 col-md-4">
											<div class="span_line"></div>
										</div>
										<div class="col-xs-6 col-sm-4 col-md-4">
											<div class="span_desc">基本信息</div>
										</div>
										<div class="col-xs-3 col-sm-4 col-md-4">
											<div class="span_line"></div>
										</div>
									</div>
								</div>
								<div class="panel_block padding_10_0">
									<div class="row">
										<div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">
                                            <div class="input_line" >
                                                <input type="text" id="userId" class="userId" name="userId" placeholder="用户ID" value="${uid }">
                                            </div>
                                            <div class="input_line" >
                                                <input type="text" id="iconHead" class="iconHead" name="iconHead">
                                            </div>
											<div class="input_line" >
												<input type="text" id="nickname" name="nickName" placeholder="昵      称">
											</div>
											<div class="input_line">
												<input type="text" id="intro" name="intro" placeholder="个人简介">
											</div>
                                            <div class="gender">
                                                <input type="radio" name="gender" value="男" checked="checked">男
                                                <input type="radio" name="gender" value="女">女
                                            </div>
											<div class="input_line">
												<input type="text" id="birthday" name="birthday0" placeholder="出生日期" onfocus="showDateSelection()">
											</div>
											<div class="date_selection">
												<div class="left_back" onclick="backPre();">
													<svg class="icon">
														<use xlink:href="#icon-fanhui5"></use>
													</svg>
												</div>
												<div class="date_input">
													<input type="text" id="date" placeholder="0000-00-00">
												</div>
												<div class="right_back" onclick="turnNext();">
													<svg class="icon">
														<use xlink:href="#icon-fanhui6"></use>
													</svg>
												</div>
												<div class="date_list">
													<ul id="ul_year">
													</ul>
													<ul id="ul_month">
													</ul>
													<ul id="ul_date">
													</ul>
												</div>
												<div class="date_save">
													<button type="button" onclick="saveDate()">保存</button>
												</div>
											</div>
											<div class="input_line">
												<input type="text" id="address" name="address" placeholder="联系地址">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <div class="panel_personal_foot">
                            <div class="row">
                                <div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">
                                    <div class="panel_row">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <button type="button" class="btn btn-success btn_save" onclick="submit()">保存</button>
                                            </div>
                                            <form action="/init/skip" method="post">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <button type="button" class="btn btn-default btn_skip" onclick="submit()">跳过</button>
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
				</form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <form enctype=”multipart/form-data” method="post">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择头像</h4>
                    </div>
                    <div class="modal-body">
                        <input type="file" name="inputImage" id="inputImage" onchange="uploadFile()" style="display: none;visibility: hidden;" />
                        <div class="row">
                            <div class="col-xs-12 col-sm-8 col-md-8 left_box">
                                <div href="#" class="thumbnail">
                                    <div class="btn_choice_head">
                                        <a class="choice_head" onclick="choiceHead()">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-xiangji1"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="image_view">
                                        <img id="new_head" src="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4 right_box">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <div class="icon_lg">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <div class="icon_md">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <div class="icon_sm">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn_save" data-dismiss="modal" aria-label="Close" onclick="saveHead();">保存</button>
                    </div>
                </div>
            </form>
        </div>
    </div>



    <script type="text/javascript" src="../dist/js/define.js"></script>
    <script type="text/javascript" src="../dist/js/component.js"></script>
    <script type="text/javascript" src="../dist/js/init.js"></script>

</body>
</html>