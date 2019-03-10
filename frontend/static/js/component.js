function showDateSelection(){
	$(".date_selection").css("display","block");
}
function hideDateSelection(){
	$(".date_selection").css("display","none");
}
function adaptiveWidthAsParent(){
	var width = $(".top_tips").parent().width();
	$(".top_tips").css("width", width);
}

function adaptivePositionReferWindow(){
	var window_width = $(window).width();
	var window_height = $(window).height();
	$(".date_selection").css("left", (window_width - $(".date_selection").width()) / 2);
	$(".date_selection").css("top", (window_height - $(".date_selection").height()) / 2);
}

$(window).resize(function () {          //当浏览器大小变化时
	adaptiveWidthAsParent();
	adaptivePositionReferWindow();
});

$(document).ready(function(){
	adaptiveWidthAsParent();
	adaptivePositionReferWindow();
});