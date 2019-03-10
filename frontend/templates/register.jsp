<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>register</title>
    <!-- Custom Theme files -->
    <link href="/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/dist/css/login.css" rel="stylesheet" type="text/css" media="all" />
    <link href="/dist/css/component.css" rel="stylesheet" type="text/css" media="all"/>
    <script type="text/javascript" src="/dist/js/jquery-3.1.1.min.js"></script>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <script type="text/javascript" src="/dist/js/iconfont.js"></script>
</head>
<body>
<div id="container_login_pos" class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">
            <div class="top_tips top_tips_success">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tishifill"></use>
                    </svg>
                    <div class="content">
                    </div>
                </div>
            </div>
            <div class="container_login">
                <div class="panel_login_head align_center">
                    <div class="align_center">
                        <div class="icon_head_big"></div>
                    </div>
                </div>
                <div class="panel_login_body">
                    <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2">
                            <form action="/register" method="post" >
                                <div class="form-group">
                                    <input type="text" class="form_def" id="username" name="username" placeholder="用户名" onblur="checkUserName()">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form_def" id="password" name="password" placeholder="密码" onblur="checkPassWord()">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form_def" id="confirm" name="confirm" placeholder="请确认密码" onblur="checkConfirm()">
                                </div>
                                <button id="register" type="button" class="btn btn-success btn_login" onclick="submit()">注册</button>
                                <div class="text_register">
                                    已有账号？立即<a href="/turnLogin">登录</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">

                    </div>
                </div>
                <div class="panel_login_boot"></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/dist/js/define.js"></script>
<script type="text/javascript" src="../dist/js/component.js"></script>
<script type="text/javascript" src="/dist/js/register.js"></script>
</body>
</html>