<%--
  Created by IntelliJ IDEA.
  User: Jacoulin
  Date: 2017/4/24
  Time: 18:47
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <link href="/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/dist/css/common.css" rel="stylesheet">
    <link href="/dist/css/focus.css" rel="stylesheet">
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



                </div>
            </div>
        </div>
    </div>

    <div class="row" style="margin-top:20px">
        <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
            <div id="num_bar">
                <div class="row">
                    <div class="col-md-4 align_center">
                        <a class="btn_flag active" id="num_focus" href="/personal/${vid}/focus">
                            <span>0</span>
                            <span>关注</span>
                        </a>
                    </div>
                    <div class="col-md-4 align_center">
                        <a class="btn_flag" id="num_fans" href="/personal/${vid}/fans">
                            <span>0</span>
                            <span>粉丝</span>
                        </a>
                    </div>
                    <div class="col-md-4 align_center">
                        <a class="btn_flag" id="num_blog" href="/personal/${vid}">
                            <span>0</span>
                            <span>微博</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" style="margin-top:20px">
        <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
            <%--<div id="multiple_handle">
                <a class="cancel_focus" onclick="addClickForCancelFocus(this)">取消关注</a>
                <a class="move_group" onclick="addClickForMoveGroup(this)">移动分组</a>
                <span>批量操作</span>
            </div>--%>
            <div id="focus_user_list">
                <div class="focus_user_item">
                    <%--<div class="focus_item clearfix">
                        <input type="hidden" class="vid" />
                        <div class="head">
                            <a class="icon_head_sm" title="关注:0--粉丝:0--微博:0" href="/personal/${vid}"></a>
                        </div>
                        <div class="content clearfix">
                            <div class="f_top">
                                <a class="nickname" href="/personal/${vid}">余一夏</a>
                                <span class="gender">男</span>
                                <span class="age">20</span>
                                <span class="address">广东</span>
                                <a class="cancel_focus" onclick="addClickForCancelFocus(this)">取消关注</a>
                                <a class="move_group" onclick="addClickForMoveGroup(this)">移动分组</a>
                            </div>
                            <div class="f_mid">
                                <p>相濡以沫，不如相忘于江湖</p>
                            </div>
                        </div>
                    </div>
                    <div class="focus_item clearfix">
                        <input type="hidden" class="vid" />
                        <div class="head">
                            <a class="icon_head_sm" title="关注:0--粉丝:0--微博:0" href="/personal/${vid}"></a>
                        </div>
                        <div class="content clearfix">
                            <div class="f_top">
                                <a class="nickname" href="/personal/${vid}">余一夏</a>
                                <span class="gender">男</span>
                                <span class="age">20</span>
                                <span class="address">广东</span>
                                <a class="cancel_focus" onclick="addClickForCancelFocus(this)">取消关注</a>
                                <a class="move_group" onclick="addClickForMoveGroup(this)">移动分组</a>
                            </div>
                            <div class="f_mid">
                                <p>相濡以沫，不如相忘于江湖</p>
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="/dist/js/focus.js"></script>
</body>
</html>

