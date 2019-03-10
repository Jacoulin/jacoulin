<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>setting</title>

    <link href="/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/dist/css/common.css" rel="stylesheet">
    <link href="/dist/css/setting.css" rel="stylesheet">
    <link href="/dist/css/component.css" rel="stylesheet" type="text/css" media="all"/>

    <script src="/dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/dist/js/iconfont.js"></script>

</head>
<body>
<input class="uid" type="hidden" value="${uid}" />
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
            <form action="/personal/setting/update" method="post">
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
                                        <input type="hidden" id="id" class="id" name="id">
                                        <input type="hidden" id="focus_num" class="focus_num" name="focusNum">
                                        <input type="hidden" id="fans_num" class="fans_num" name="fansNum">
                                        <input type="hidden" id="micro_blog_num" class="micro_blog_num" name="microBlogNum">
                                        <div class="input_line" >
                                            <input type="text" id="userId" class="userId" name="userId">
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
                                            <input type="radio" name="gender" value="男">男
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
                                                <input type="text" id="date" placeholder="2013-09-01">
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
                                        <form action="/personal/setting/skip" method="post">
                                            <input name="uid" class="uid" type="hidden" value="${uid}" />
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
                                    <img id="new_head" src="../dist/images/cat.jpg">
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



<script type="text/javascript" src="/dist/js/define.js"></script>
<script type="text/javascript" src="/dist/js/component.js"></script>
<script type="text/javascript" src="/dist/js/setting.js"></script>

</body>
</html>