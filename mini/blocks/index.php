<!DOCTYPE html>
<html>
<head>
	<title>咏春拳</title>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1,user-scalable=no,minimum-scale=1,maximum-scale=1,width=device-width">
	<link rel="icon" type="image/GIF" href="assets/images/ip0.png">
	<!-- build:css assets/css/main.min.css -->
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- endbuild -->
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script src="php/jssdk.php?url=<?php echo urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);?>">
	</script>
</head>
<body>
	<div id="spn"></div>
	<div class="page" id="loading">
		<p>loading...</p>
	</div>
	<!-- build:js assets/js/lib.js -->
    <script src="assets/js/libs.min.js"></script>
	<script src="assets/js/dcagent.min.js"></script>
	<!-- endbuild -->
	<!-- build:js assets/js/main.min.js -->
	<script src="assets/js/main.js"></script>
	<!-- endbuild -->
	<div id="GameScoreLayer" class="BBOX SHADE bgc1" style="display:none">
		<div style="padding:0 5%">
			<div id="GameScoreLayer-text" class="info"></div>
			<br>
			<br>
			<div id="GameScoreLayer-btn" class="">
				<div class="btn cl" onclick="replayBtn()">重来</div>
				<div class="btn" id="btn-share" onclick="share()">分享</div>
				<a onclick="moreBtn()" class="btn gd" id="btn-more">更多</a>
			</div>
		</div>
	</div>
	<div id="welcome" class="SHADE BOX-M" style="display: block;">
		<div class="FILL BOX-M" style="position:absolute;top:0;left:0;right:0;bottom:0;z-index:5">
			<div style="margin:0 8% 0 9%">
				<div style="font-size:2.6em; color:#88A337" class="logo">咏春拳</div>
				<br>
				<div class="info">
					<p>点呀点呀点~</p>
					<p><em>20</em>秒内点击下方开始学拳！</p>
				</div>
				<br>
				<br>
				<div id="ready-btn" class="btn">开始学拳</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">isDesktop&&document.write("</div>");</script>
	<div id="share-wx">
		<p style="text-align: right; padding-left: 10px">
			<img src="assets/images/share.png" id="share-wx-img" />
		</p>
	</div>
</body>
</html>
<script>
  DCAgent.init({appId:"1CB508DFC20C90124679EF39C7BAC6FE",virus:false});
</script>
<script src="assets/js/wxShare.js"></script>