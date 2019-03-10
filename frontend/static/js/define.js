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
	var row_micro_blog_width = $("#row_micro_blog").width();
	var fixed_right_width = row_micro_blog_width*25/100;
	var fixed_left_width = row_micro_blog_width*16.66666667/100;
	if(window_width < 992){
		fixed_left_width = row_micro_blog_width*25/100;
	}
	$("#fixed_right").css("width", fixed_right_width);
	$("#fixed_left").css("width", fixed_left_width);
}

$(window).resize(function () {          //当浏览器大小变化时
    adjustContainerPos();
	adjustContainerRightPos();

    /*alert($(document).height());        //浏览器时下窗口文档的高度
    alert($(document.body).height());   //浏览器时下窗口文档body的高度
    alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin*/
});

$(document).ready(function(){
	adjustContainerPos();
	adjustContainerRightPos();
});


