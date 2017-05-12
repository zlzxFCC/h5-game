$(function() {
	var maxWidth = 640,
		maxHeight = 960,
		count = 0,
		end = 0,
		len = $('#grid .page').length;

	
	window.tap = (!!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "touchstart" : "click";
	$("#finger_div1").on(tap, function() {
		DCAgent.onEvent("指纹", 1, {userID: "null"});
		$("#finger_line1").css("display", "inline-block");
		$(".finger_tips").show();
		$("#finger_line1").animate({
			"top": "50%",
			"margin-top": "-88px"
		}, function() {
			$(".finger_tips").html("扫描成功");
			$(".u-arrow-bottom").show();
			$("#media").attr("src","assets/yq0KZVbCeQ-ATSJ8AAbwkVcwfNg670.mp3");
			setTimeout(function() {
				$(".z-current").removeClass("z-current");
				$(".cc-page").eq(0).addClass("z-current");
				$(".u-arrow-bottom").show();
				$(".finger_tips").hide();
				$("#audio_btn").show();
				$(".off").addClass("video_exist rotate");
				progress(1);
			}, 500);

		});
	});

	function progress(page){
		$(".progress").show().css("z-index","100");
		$(".progress span").css("width",7.69*page+"%");
		$(".progress em").html(page+"/13");
	}


    $("#audio_btn").on(tap,function(){
    	DCAgent.onEvent("音乐按钮", 1, {userID: "null"});
    	if($(".off").hasClass("rotate")){
    		$(".off").removeClass("rotate");
    		$("#media")[0].pause();
    	}else{
    		$(".off").addClass("rotate");
    		$("#media")[0].play();
    	}
    	
    });

	touch.on('#grid', 'swipeup', function(e) {
		DCAgent.onEvent("上滑翻页", 1, {userID: "null"});
		console.log("swipeup");
		var page = $(".z-current").data("page") + 1;
		if (page == 13) {
			page = 0
		}
		console.log("当前页：" + page);
		$(".z-current").removeClass("z-current");
		$(".cc-page").eq(page).addClass("z-current");
		$(".u-arrow-bottom").show();
		progress(page+1);
	});

	touch.on('#grid', 'swipedown', function(e) {
		DCAgent.onEvent("下滑翻页", 1, {userID: "null"});
		console.log("swipedown");
		var page = $(".z-current").data("page") - 1;
		console.log("当前页：" + page);
		$(".z-current").removeClass("z-current");
		$(".cc-page").eq(page).addClass("z-current");
		$(".u-arrow-bottom").show();
		progress(page+1);
	});

	$(document.body).on('mousedown touchstart touchmove', function(e) {
		e.preventDefault();
	});


	window.onload = function() {
		var ua = window.navigator.userAgent;
		var isMobile = /mobile/i.test(ua);
		if (isMobile) {
			$(".scene_title_baner,.u-arrow-bottom,.ctrl_panel").hide();
		}
	}
});