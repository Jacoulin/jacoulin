<%--
  Created by IntelliJ IDEA.
  User: Jacoulin
  Date: 2017/3/15
  Time: 23:40
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

    <link href="/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/dist/css/common.css" rel="stylesheet">
    <link href="/dist/css/home.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/dist/css/iconfont.css">


    <script type="text/javascript" src="/dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="/dist/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="/dist/js/iconfont.js"></script>

</head>

<!---class="background"-->
<body>
<input class="uid" type="hidden" value="${uid }" />
<input class="bid" type="hidden" value="" />
<!-- <div class="container">
  <div id='content'>
    <div class='panel panel-success'>
      <div class='panel-heading'>
        <div class="row clearfix">
          <div   class="col-sm-2 col-md-2 align_left">
            <div class='btn-group'>
              <div class='badge'>
                广东省
              </div>
            </div>
            <div class='btn-group hidden-block'>
            </div>
          </div>
          <div  class="col-sm-10 col-md-10 align_right">
            <div class='pull-right'>
              <div class='form_container'>
                <div class='btn-group'>
                  <input class="input_search" id="search" type="text"  placeholder="该输入关键字">
                </div>
                <div class='btn-group btn_container btn_container_search'>
                  <svg class="icon btn_search" aria-hidden="true">
                    <use xlink:href="#icon-sousuo1"></use>
                  </svg>
                </div>
              </div>
              <div class='btn-group btn_container btn_container_left'>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-crm40"></use>
                </svg>
              </div>
              <div class='btn-group btn_container btn_container_left'>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-quanping"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='panel-body'>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">

          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->

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


<!-- start micro_body -->
<div class="container margin_top half_transparent">
    <div id="row_micro_blog" class="row">

        <!-- start micro_blog_center -->
        <div class="col-xs-12 col-sm-10 col-md-7 col-sm-offset-1 col-md-offset-1">
            <div id="container_push_blog">
                <div id="panel_push_blog">
                    <textarea id="text_push_blog" name="text_push_blog" rows="5"></textarea>
                </div>
                <div id="bar_push_blog">
                    <div class="btn_expression pull-left">
                        <span class="icon_expression align_vertical">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-biaoqing"></use>
                          </svg>
                        </span>
                        <span class="inherit_height align_vertical font_expression">表情</span>
                    </div>
                    <div class="btn_insert_pic pull-left">
                        <span class="icon_insert_pic align_vertical">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-picture"></use>
                          </svg>
                        </span>
                        <span class="inherit_height align_vertical font_insert_pic">图片</span>
                    </div>
                    <%--<div class="btn_insert_video pull-left">
                        <span class="icon_insert_video align_vertical">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-video"></use>
                          </svg>
                        </span>
                        <span class="inherit_height align_vertical font_insert_video">视频</span>
                    </div>--%>
                    <%--<div class="btn_insert_topic pull-left">
                        <span class="inherit_height align_vertical font_insert_topic">#话题#</span>
                    </div>--%>
                    <div class="btn_push pull-right">
                        <button type="button" class="btn btn-default" onclick="addClickForPushMicroBlog(this)">发表</button>
                    </div>
                </div>
                <div id="choice_pic">
                    <div class="row">
                        <div class="col-sm-4 col-md-4 col-xs-4">
                            <a href="#" status="before">
                                <img src="/dist/images/add_pic_before.png" alt="添加图片"/>
                                <input type="file" onchange="addPicToMicroBlog(this)"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <ul class="nav nav-tabs">
                <li class="active"><a href="#">全部</a></li>
                <li><a href="#">好友</a></li>
            </ul>

            <div id="user_recommend">
                <div style="margin-top: -55px;">
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
                    </div>
                    <div class="focus_item clearfix">
                        <input type="hidden" class="vid" />
                        <div class="head">
                            <a class="icon_head_sm" title="关注:0--粉丝:0--微博:0" href="/personal/${vid}"></a>
                        </div>
                        <div class="content clearfix">
                            <div class="f_top">
                                <a class="nickname" href="/personal/${vid}">王二狗</a>
                                <span class="gender">男</span>
                                <span class="age">20</span>
                                <span class="address">广东</span>
                                <a class="cancel_focus" onclick="addClickForAddFocus(this)">添加关注</a>
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
                                <a class="nickname" href="/personal/${vid}">王二狗</a>
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
                </div>
            </div>

            <div class="container_micro_blog_list">
                <%--<div class='container_micro_blog_item'>
                    <input id="uid" type="text"/>
                    <input id="bid" type="text"/>
                    <div class='panel_micro_blog'>
                        <div class="panel_micro_blog_head">
                            <a class="icon_head pull-left">
                            </a>
                            <div class="span_username pull-left">
                                余一夏
                            </div>
                            <div class="span_date pull-left">
                                2017-03-01
                            </div>
                            <a class="span_icon">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-delete"></use>
                                </svg>
                            </a>
                        </div>
                        <div class="panel_micro_blog_body clearfix">
                            <p contenteditable="true">But //<a href="/personal/'+ srcUid + '">my:</a> dream is not a lawyer, not a doctor,
                                not actors, not even an industry. Perhaps my dream big peoplewill find it ridiculous,
                                but this has been my pursuit! My dream is to want to have a folk life! I want it to
                                become a beautiful painting, it is not only sharp colors, but also the colors are bleak,
                                I do not rule out the painting is part of the black, but I will treasure these bleak
                                colors! Not yet, how about, a colorful painting, if not bleak, add color, how can it
                                more prominent American? Life is like painting, painting the bright red color represents
                                life beautiful happy moments. Painting a bleak color represents life difficult,
                                unpleasant time. You may find a flat with a beautiful road is not very good yet, but I
                                do not think it will. If a person lives flat then what is the point? Life is only a
                                short few decades, I want it to go Finally, Each memory is a solid.</p>
                            <div class="image_view">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <a href="#">
                                            <img src="../dist/images/cat.jpg" />
                                        </a>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4 col-md-4 hidden-xs">
                                        <a>
                                            <img src="../dist/images/cat.jpg" class="width_than_height" />
                                        </a>
                                    </div>
                                    <div class="col-sm-4 col-md-4 hidden-xs">
                                        <a>
                                            <img src="/dist/images/4.jpg" class="height_than_width" id="myImg"/>
                                        </a>
                                    </div>
                                    <div class="col-sm-4 col-md-4 hidden-xs">
                                        <a>
                                            <img src="../dist/images/cat.jpg" class="width_than_height"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="load_more">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <button type="button" class="btn btn-default inherit_width">加载全文</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel_micro_blog_foot">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                                    <a class="forward" onclick="addClickForForward(this)">
                                        <i class="iconfont icon-zhuanfa2"></i>
                                    </a>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                                    <a class="comment" onclick="addClickForComment(this)">
                                        <i class="iconfont icon-pinglun1"></i>
                                    </a>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 align_center">
                                    <a class="like" onclick="addClickForLike(this)">
                                        <i class="iconfont icon-zan"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="container_comment_blog">
                            <div class="panel_comment_blog">
                                <div class="row">
                                    <div class="col-xs-8 col-sm-8 col-md-8 no_padding_right">
                                        <textarea class="text_comment_blog" rows="1"></textarea>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 align_right">
                                        <button type="button" class="btn btn-default align_vertical" onclick="clickForPushComment(this)">发表</button>
                                    </div>
                                </div>
                            </div>
                            <div class="comment_list">
                                <div class="comment_item clearfix">
                                    <div class="head">
                                        <a class="icon_head_sm"></a>
                                    </div>
                                    <div class="content clearfix">
                                        <div class="c_top">
                                            <span class="nickname">余一夏</span>
                                            <span class="pushtime">2012</span>
                                        </div>
                                        <div class="c_mid">
                                            <p>真好看</p>
                                        </div>
                                        <div class="c_bot">
                                            <input type="hidden" class="cid" value="" />
                                            <input type="hiden" class="rid" value="" />
                                            <a class="reply">回复</a>
                                            <a class="load">查看</a>
                                        </div>
                                    </div>
                                    <div class="bar_push_reply clearfix">
                                        <textarea class="text_push_reply" rows="1"></textarea>
                                        <a class="btn_push_reply">
                                            <i class="iconfont icon-xiangyou3"></i>
                                        </a>
                                    </div>
                                    <div class="reply_list">
                                        <div class="reply_item">
                                            <div class="r_top"><a>用户1</a>回复<a>用户2</a>:你也很好看</div>
                                            <div class="r_bot clearfix">
                                                <span class="reply_time">2012</span>
                                                <a class="reply">回复</a>
                                            </div>
                                        </div>
                                        <div class="reply_item">
                                            <div class="r_top"><a>用户1</a>回复<a>用户2</a>:你也很好看</div>
                                            <div class="r_bot clearfix">
                                                <span class="pull-left">2012</span>
                                                <a class="reply">回复</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--%>
            </div>
        </div>
        <!-- end micro_blog_center -->

        <!-- start micro_blog_right -->
        <div class="col-md-3 hidden-sm hidden-xs no_padding_left">
            <div id='fixed_right'>
                <div class="panel_personal">
                    <div class="panel_personal_head">
                        <a id="head">
                        </a>
                    </div>
                    <div class="panel_personal_body">
                        <div class="align_center">
                            <a id="nickName" class="span_username">余一夏</a>
                        </div>
                        <div class="panel_personal_foot">
                            <div class="row">
                                <div class="col-md-4 align_center">
                                    <a class="btn_flag" id="num_focus" href="/personal/${uid}/focus">
                                        <span>25</span>
                                        <span>关注</span>
                                    </a>
                                </div>
                                <div class="col-md-4 align_center">
                                    <a class="btn_flag" id="num_fans" href="/personal/${uid}/fans">
                                        <span>25</span>
                                        <span>粉丝</span>
                                    </a>
                                </div>
                                <div class="col-md-4 align_center" href="/personal/${uid}">
                                    <a class="btn_flag" id="num_blog">
                                        <span>25</span>
                                        <span>微博</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="split_line"></div>

                        <div class="panel_recommend">
                            <div class="title">
                                <span class="pull-left">参与话题</span>
                                <span class="pull-right">
                                    <a>
                                        <img src="/dist/images/refresh.png" />
                                        换一换
                                    </a>
                                </span>
                            </div>
                            <div class="content">
                                <ul>
                                    <li class="clearfix">
                                        <a class="pull-left">#话题1#</a>
                                        <span class="pull-right"><img src="/dist/images/hot.png" />65亿</span>
                                    </li>
                                    <li><a href="/frontend/topic.jsp?k=">#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                    <li><a>#话题1</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end micro_blog_right -->

    </div>
</div>
<!-- end micro_body -->
<script type="text/javascript" src="/dist/js/expression.js"></script>
<script type="text/javascript" src="/dist/js/home.js"></script>
<script type="text/javascript" src="/dist/js/push_micro_blog.js"></script>
</body>
</html>

