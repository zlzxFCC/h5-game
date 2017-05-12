$(function() {
	var maxWidth = 640,
		maxHeight = 960,
		count = 0,
		end = 0,
		len = $('#grid .page').length;

	touch.on('#grid', 'swipeup', function(e) {
		reload();
		DCAgent.onEvent("swipeup", 1, {userID:'null'});
		if (count < len - 1) {
			count++;
		}
		if (count == 1) {
			$('#index').hide();
			$('#game').show();
			$("body").removeClass("one").addClass("two");
			end = 0;
			game.gameAnimate();
		} else if (count == 2) {
			$('#game').hide();
			$('#gameOver').show();
			$("body").removeClass("two").addClass("three");
			game.gameOverAnimate();
		} else if (count == 3) {
			location.href = "http://mj28501.static.17c.cn/html5/h5mini/pinch_dumplings/";
		}

	});

	touch.on('#grid', 'swipedown', function(e) {
		DCAgent.onEvent("swipedown", 1, {userID:'null'});
		reload();
		if (count > 0) {
			count--;
		}
		if (count == 0) {
			$('#game').hide();
			$('#index').show();
			$("body").removeClass("two").addClass("one");
			game.indexAnimate();
		} else if (count == 1) {
			$('#gameOver').hide();
			$('#game').show();
			$("body").removeClass("three").addClass("two");
			game.gameAnimate();
		}
	});

	$(document.body).on('mousedown touchstart touchmove', function(e) {
		e.preventDefault();
	});
	var tap = (!!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "touchstart" : "mousedown";
	$("#audio_btn").on(tap, function(e) {
		DCAgent.onEvent("audioBtn", 1, {userID:'null'});
		var off = $("#audio_btn").hasClass("off");
		if (off) {
			$("#audio_btn").removeClass("off").addClass("play_music");
			$("#music").addClass("rotate");
			$("#media")[0].play();
		} else {
			$("#audio_btn").removeClass("play_music").addClass("off");
			$("#music").removeClass("rotate");
			$("#media")[0].pause();
		}
	});
});