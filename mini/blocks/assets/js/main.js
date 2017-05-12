/** 
 * -------------------------------------------------------------
 * Copyright (c) 2015 scero All rights reserved. 
 * ------------------------------------------------------------- 
 */

function preloadimages(a, b) {
	function c() {
		++d >= e && b(f)
	}
	var d, e = 0,
		f = a instanceof Array ? [] : {};
	for (var g in a) e++, f[g] = new Image, f[g].onload = c, f[g].onerror = c, f[g].onabort = c, f[g].src = a[g]
}

function $id(a) {
	return document.getElementById(a)
}

function init(a) {
	document.body.addEventListener("touchmove", function(a) {
		return a.preventDefault(), !1
	}, !1), body = $id("gameBody") || document.body, body.style.height = window.innerHeight + "px", transform = "undefined" != typeof body.style.webkitTransform ? "webkitTransform" : "undefined" != typeof body.style.msTransform ? "msTransform" : "transform", transitionDuration = transform.replace(/ransform/g, "ransitionDuration"), GameTimeLayer = $id("GameTimeLayer"), GameLayer.push($id("GameLayer1")), GameLayer[0].children = GameLayer[0].querySelectorAll("div"), GameLayer.push($id("GameLayer2")), GameLayer[1].children = GameLayer[1].querySelectorAll("div"), GameLayerBG = $id("GameLayerBG"), null === GameLayerBG.ontouchstart ? GameLayerBG.ontouchstart = gameTapEvent : GameLayerBG.addEventListener(tap, gameTapEvent, !1), gameInit(), window.addEventListener("resize", refreshSize, !1), setTimeout(function() {
		$id("loading").style.display = "none", showWelcomeLayer(), $id("ready-btn").addEventListener(tap, closeWelcomeLayer, !1)
	}, 500)
}

function refreshSize() {
	clearTimeout(refreshSizeTime), refreshSizeTime = setTimeout(_refreshSize, 200)
}

function _refreshSize() {
	countBlockSize();
	for (var a = 0; a < GameLayer.length; a++)
		for (var b = GameLayer[a], c = 0; c < b.children.length; c++) {
			var d = b.children[c],
				e = d.style;
			e.left = c % 4 * blockSize + "px", e.bottom = Math.floor(c / 4) * blockSize + "px", e.width = blockSize + "px", e.height = blockSize + "px"
		}
	var f, g;
	GameLayer[0].y > GameLayer[1].y ? (f = GameLayer[0], g = GameLayer[1]) : (f = GameLayer[1], g = GameLayer[0]);
	var h = _gameBBListIndex % 10 * blockSize;
	f.y = h, f.style[transform] = "translate3D(0," + f.y + "px,0)", g.y = -blockSize * Math.floor(f.children.length / 4) + h, g.style[transform] = "translate3D(0," + g.y + "px,0)"
}

function countBlockSize() {
	blockSize = body.offsetWidth / 4, body.style.height = window.innerHeight + "px", GameLayerBG.style.height = window.innerHeight + "px", touchArea[0] = window.innerHeight - 0 * blockSize, touchArea[1] = window.innerHeight - 3 * blockSize
}

function gameInit() {
	createjs.Sound.registerSound({
		src: "assets/audio/err.mp3",
		id: "err"
	}), createjs.Sound.registerSound({
		src: "assets/audio/end.mp3",
		id: "end"
	}), createjs.Sound.registerSound({
		src: "assets/audio/tap.mp3",
		id: "tap"
	}), gameRestart()
}

function gameRestart() {
	$id("spn").style.display = "none", _gameBBList = [], _gameBBListIndex = 0, _gameScore = 0, _gameOver = !1, _gameStart = !1, _gameTimeNum = 2e3, GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum), countBlockSize(), refreshGameLayer(GameLayer[0]), refreshGameLayer(GameLayer[1], 1)
}

function gameStart() {
	DCAgent.onEvent("start_btn", 1, {userID: "null"});
	_gameStart = !0, _gameTime = setInterval(gameTime, 10)
}

function gameOver() {
	_gameOver = !0, clearInterval(_gameTime), setTimeout(function() {
		GameLayerBG.className = "", showGameScoreLayer()
	}, 1500), $id("spn").style.display = "block", isWeiXin() ? (document.getElementById("btn-share").style.display = "inline-block", document.getElementById("btn-more").style.display = "inline-block") : document.getElementById("btn-share").style.display = "none"
}

function gameTime() {
	_gameTimeNum--,
    0 >= _gameTimeNum ? (GameTimeLayer.innerHTML = "时间到！",
    gameOver(),
    GameLayerBG.className += " flash",
    createjs.Sound.play("end")) : GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum)
}

function creatTimeText(a) {
	var b = (1e5 + a + "").substr(-4, 4);
	return b.substr(0, 2) + "'" + b.substr(2) + "''"
}

function refreshGameLayer(a, b, c) {
	for (var d = fst ? 5 : Math.floor(1e3 * Math.random()) % 4 + (b ? 0 : 4), e = 0; e < a.children.length; e++) {
		var f = a.children[e],
			g = f.style;
		g.left = e % 4 * blockSize + "px", g.bottom = Math.floor(e / 4) * blockSize + "px", g.width = blockSize + "px", g.height = blockSize + "px", f.className = f.className.replace(_clearttClsReg, ""), d == e ? (_gameBBList.push({
			cell: d % 4,
			id: f.id
		}), fst && (f.innerHTML = "<em></em>", fst = !1), f.className += " t" + randomIn(2), f.notEmpty = !0, d = 4 * (Math.floor(e / 4) + 1) + Math.floor(1e3 * Math.random()) % 4) : f.notEmpty = !1
	}
	b ? (a.style.webkitTransitionDuration = "0ms", a.style.display = "none", a.y = -blockSize * (Math.floor(a.children.length / 4) + (c || 0)) * b, setTimeout(function() {
		a.style[transform] = "translate3D(0," + a.y + "px,0)", setTimeout(function() {
			a.style.display = "block"
		}, 100)
	}, 200)) : (a.y = 0, a.style[transform] = "translate3D(0," + a.y + "px,0)"), a.style[transitionDuration] = "150ms"
}

function gameLayerMoveNextRow() {
	for (var a = 0; a < GameLayer.length; a++) {
		var b = GameLayer[a];
		b.y += blockSize, b.y > blockSize * Math.floor(b.children.length / 4) ? refreshGameLayer(b, 1, -1) : b.style[transform] = "translate3D(0," + b.y + "px,0)"
	}
}

function gameTapEvent(a) {
	if (hasTips && ($id("GameLayer1-5").innerHTML = "", hasTips = !1), _gameOver) return !1;
	var b = a.target,
		c = a.clientY || a.targetTouches[0].clientY,
		d = (a.clientX || a.targetTouches[0].clientX) - body.offsetLeft,
		e = _gameBBList[_gameBBListIndex];
	return c > touchArea[0] || c < touchArea[1] ? !1 : (e.id == b.id && b.notEmpty || 0 == e.cell && blockSize > d || 1 == e.cell && d > blockSize && 2 * blockSize > d || 2 == e.cell && d > 2 * blockSize && 3 * blockSize > d || 3 == e.cell && d > 3 * blockSize ? (_gameStart || gameStart(), createjs.Sound.play("tap"), b = $id(e.id), b.className = b.className.replace(_ttreg, " tt1"), _gameBBListIndex++, _gameScore++, gameLayerMoveNextRow()) : _gameStart && !b.notEmpty && (createjs.Sound.play("err"), gameOver(), b.className += " bad"), !1)
}

function randomIn(a) {
	return Math.min(Math.floor(Math.random() * a), a)
}

function createGameLayer() {
	for (var a = '<div id="GameLayerBG">', b = 1; 2 >= b; b++) {
		var c = "GameLayer" + b;
		a += '<div id="' + c + '" class="GameLayer">';
		for (var d = 0; 10 > d; d++)
			for (var e = 0; 4 > e; e++) a += '<div id="' + c + "-" + (e + 4 * d) + '" num="' + (e + 4 * d) + '" class="block' + (e ? " bl" : "") + '"></div>';
		a += "</div>"
	}
	return a += "</div>", a += '<div id="GameTimeLayer"></div>'
}

function closeWelcomeLayer() {
	DCAgent.onEvent("startBtn", 1, {
		userID: "null"
	}), $id("welcome").style.display = "none", $id("spn").style.display = "none";
}

function showWelcomeLayer() {
	var a = $id("welcome");
	a.style.display = "block"
}

function showGameScoreLayer() {
	var a = $id("GameScoreLayer"),
		b = $id(_gameBBList[_gameBBListIndex - 1].id).className.match(_ttreg)[1];
	a.className = a.className.replace(/bgc\d/, "bgc" + b), $id("GameScoreLayer-text").innerHTML = "我向叶问学到了<em>" + _gameScore + "</em>招咏春拳<br/>分享到朋友圈，看谁才是真正的大师兄？", a.style.display = "block", window.shareData.tTitle = "我学到了" + _gameScore + "招咏春拳，妈妈再也不用担心啦！";
}

function hideGameScoreLayer() {
	$id("GameScoreLayer").style.display = "none"
}

function replayBtn() {
	DCAgent.onEvent("replayBtn", 1, {
		userID: "null"
	}), gameRestart(), hideGameScoreLayer()
}

function moreBtn() {
	DCAgent.onEvent("moreBtn", 1, {
		userID: "null"
	});
	// isWeiXin() ? 
	var a = "http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect";
	window.location = a
}

function backBtn() {
	DCAgent.onEvent("backBtn", 1, {
		userID: "null"
	}), gameRestart(), hideGameScoreLayer(), showWelcomeLayer()
}

function toStr(a) {
	return "object" == typeof a ? JSON.stringify(a) : a
}

function share() {
	DCAgent.onEvent("shareBtn", 1, {
		userID: "null"
	}), $id("share-wx").style.display = "block", $id("share-wx").onclick = function() {
		this.style.display = "none"
	}
}
var i = (new Date).getTime() % 5,
	hasTips = !0,
	isDesktop = navigator.userAgent.match(/(ipad|iphone|ipod|android|windows phone)/i) ? !1 : !0,
	_timer = parseInt(Date.now() + 1e11 * Math.random());

window.shareData = {
	imgUrl: "http://h5-share-test.dymfilm.com/assets/images/logo.png",
	timeLineLink: "http://h5-share-test.dymfilm.com/index.php?timer=" + _timer,
	tTitle: "叶问",
	tContent: "叶问"
}, isDesktop && document.write('<div id="gameBody">');
var body, blockSize, GameLayer = [],
	GameLayerBG, touchArea = [],
	GameTimeLayer, transform, transitionDuration, tap = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? "touchstart" : "mousedown",
	refreshSizeTime, _gameBBList = [],
	_gameBBListIndex = 0,
	_gameOver = !1,
	_gameStart = !1,
	_gameTime, _gameTimeNum, _gameScore, _ttreg = / t{1,2}(\d+)/,
	_clearttClsReg = / t{1,2}\d+| bad/,
	fst = !0;
document.write(createGameLayer());
var imgList = [""];
preloadimages(imgList, init());

// alert("imgUrl:"+window.shareData.imgUrl+"timeLineLink:"+window.shareData.timeLineLink);
