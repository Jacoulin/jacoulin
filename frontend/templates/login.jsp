<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>login</title>
	<!-- Custom Theme files -->
	<link href="/dist/css/bootstrap.min.css" rel="stylesheet" />
	<link href="/dist/css/login.css" rel="stylesheet" type="text/css" media="all" />
	<script type="text/javascript" src="/dist/js/jquery-3.1.1.min.js"></script>
	<!-- Custom Theme files -->

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<meta name="keywords" content="Login form web template, Sign up Web Templates, Flat Web Templates, Login signup Responsive web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
</head>
<body>
	<div id="container_login_pos" class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">
				<div class="container_login">
					<div class="panel_login_head align_center">
						<div class="align_center">
			            	<div class="icon_head_big"></div>
			          	</div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-zhuanfa"></use>
						</svg>
					</div>
					<div class="panel_login_body">
						<div class="row">
							<div class="col-xs-8 col-sm-8 col-md-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2">
								<form action="/login" method="post" >
									<div class="form-group">
										<input type="text" class="form_def" id="username" name="username" placeholder="用户名">
									</div>
									<div class="form-group">
									<input type="password" class="form_def" id="password" name="password" placeholder="密码">
									</div>
									<button type="button" class="btn btn-success btn_login" onclick="submit()">登录</button>
			                      	<div class="text_register">
			                      		没有账号？立即<a href="/turnRegister">注册</a>
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
</body>
</html>