<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <link href="/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/dist/css/common.css" rel="stylesheet">
    <link href="/dist/css/personal.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/dist/css/iconfont.css">
    <script type="text/javascript" src="/dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="/dist/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="/dist/js/iconfont.js"></script>

</head>

<body>
<input class="uid" type="hidden" value="${uid}" />
<input class="vid" type="hidden" value="${vid}" />
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
            <div class="panel_personal">
                <div class="panel_personal_head">
                </div>
                <div class="panel_personal_body">

                    <!-- 基本信息 -->
                    <%--<div class="panel_personal_info">
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
                        &lt;%&ndash;<div class="panel_block">
                            <div class="row">
                                <div class="col-xs-8 col-sm-6 col-md-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-4">
                                    <div class="panel_row">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_key letter_space_2_0">昵称</div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_val">余一夏</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel_row">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_key letter_space_2_0">性别</div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_val">男</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel_row">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_key letter_space_2_0">地址</div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_val">广东</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel_row">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_key">注册时间</div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="info_val">2012-02-02</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>&ndash;%&gt;
                    </div>--%>

                </div>
            </div>
        </div>
    </div>

    <div class="row" style="margin-top:20px">
        <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
            <div id="num_bar">
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                    <a class="btn_flag" id="num_focus" href="/personal/${vid}/focus">
                        <span>0</span>
                        <span>关注</span>
                    </a>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                    <a class="btn_flag" id="num_fans" href="/personal/${vid}/fans">
                        <span>0</span>
                        <span>粉丝</span>
                    </a>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                    <a class="btn_flag active" id="num_blog" href="/personal/${vid}/blog">
                        <span>0</span>
                        <span>微博</span>
                    </a>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
            <div class="container_micro_blog_list">

            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/dist/js/personal.js"></script>
<script type="text/javascript" src="/dist/js/push_micro_blog.js"></script>
</body>
</html>
