<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>女神翻翻看</title>
	<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimal-ui">
	<link rel="icon" type="image/gif" href="assets/img/logo.png">
	<link rel="stylesheet" href="assets/css/main.css">
	<script src="http://h5-share-test.dymfilm.com/assets/js/dcagent.min.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script src="http://h5-test.dymfilm.com/games/html5/php/jssdk.php?url=<?php echo urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);?>">
	</script>
	<script src="assets/js/libs.min.js"></script>
</head>
<body>
	<div class="hide">
	    <img src="assets/img/logo.png">
	</div>
	<div class="game">
		<div id="js-gameready" class="page page-gameready">
			<div class="hd">
				<div class="logo"></div>
			</div>
			<!-- <p id="testID"></p> -->
			<div class="kd">
			<h3>女神翻翻看游戏规则</h3>
			<p>
			关注订阅号@大银幕电影，点击【赢电影票】中的【女神翻翻看】进入游戏；
			每天参与次数不限，以当天最好成绩计入排名；
			排名名次为当天幸运数字的网友，每人获得2张电影票（中奖网友及其约影小伙伴各1张）；
			在每天推送的头条文章底部可以看到当天的3个幸运数字；
			回复“中奖名单”或在每天推送的头条文章最底部都可以看到中奖名单；
			得知中奖后，请及时与我们联系，以便及时兑奖；
			中奖资格自当期“中奖名单”公布起三天内有效，过期作废。
			</p>

			</div>
			<button id="js-btn-start" class="btn-start">开始</button>
		</div>
		<div id="js-gamein" class="page page-gamein">
			<div class="hd meta clearfix">
				<div class="item-score"> <i class="icon-score"></i>
					<span id="js-score" class="score">0</span>
				</div>
				<div class="item-time"> <i class="icon-time"></i>
					<span id="js-time" class="time">01:00</span>
				</div>
				<div id="js-grids" class="grids">
					<ul class="list">
						<li class="item-card" data-type="1">
							<div class="cardback"></div>
							<div class="cardfront"></div>
						</li>
						<li class="item-card" data-type="2">
							<div class="cardback"></div>
							<div class="cardfront"></div>
						</li>
						<li class="item-card" data-type="2">
							<div class="cardback"></div>
							<div class="cardfront"></div>
						</li>
						<li class="item-card" data-type="1">
							<div class="cardback"></div>
							<div class="cardfront"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="js-gameover" class="page page-gameover">
			<div class="inner">
				<p class="item-score">
					恭喜您获得
					<span id="js-gameover-score" class="score">60</span>
					分
					<!-- <br>
					获得<span id="js-gameover-level" class="level"></span>的称号 -->
					<br>
					击败了朋友圈
					<span class="percent"> <em id="js-gameover-percent" class="x-percent">96</em>
						%
					</span>
					的人

				</p>
				<button id="js-btn-again" class="btn btn-again">再玩一次</button>
				<a href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect" id="js-btn-more" class="btn btn-more" target="_blank">更多游戏</a>
			</div>
			<i class="share-tips"></i>
		</div>
		<div id="js-timeout" class="page page-timeout">
			<div class="text">时间到</div>
		</div>
		<div id="js-loading" class="page page-loading">
			<div class="loading-text">
				正在加载...（
				<span id="js-percent">1</span>
				%）
			</div>
		</div>
	</div>
	
	<script src="assets/js/main.js"></script>
    <script src="http://h5-share-test.dymfilm.com/assets/js/wxShare.js"></script>
	<script>
	// $("#testID").html(signPackage.unionID);
	var _timer = parseInt(Date.now() + 1e11 * Math.random());
	window.shareData = {
		imgUrl: location.origin+"/html5/mini/fanfan/assets/img/logo.png",
		timeLineLink: location.origin+"/html5/mini/fanfan/index.php?timer=" + _timer,
		tTitle: "女神翻翻看",
		tContent: "众里寻Ta千百度，蓦然回首那人却在..."
	};
	DCAgent.init({appId:"0EE1E23E2A96ED6A5C078DACCBED3C4F",virus:false});
	</script>
</body>
</html>