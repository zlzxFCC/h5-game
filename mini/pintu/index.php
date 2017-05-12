<?php
  if(empty($_COOKIE["unionID"])&&empty($_COOKIE["gameID"])){
  	header("Location: http://h5.dymfilm.com/gm/1/page");
  }

  function listDir($dir)
  {
		$dirs = array();
		if(!$dir)
	   	{
	   		return $dirs;
	   	}
	   	if (!($dh = opendir($dir)))
		{
	    	return $dirs;
	 	}
	    while (($file = readdir($dh)) !== false)
		{
			if((is_dir($dir."/".$file)) && $file!="." && $file!="..")
			{
				array_push($dirs, $file);
			}
		}
		closedir($dh);
		return $dirs;
	}

	$files=listDir("./assets/img/game/");
	$count=count($files);
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="yes" name="apple-mobile-web-app-capable"/>
	<meta content="yes" name="apple-touch-fullscreen"/>
	<meta content="telephone=no" name="format-detection"/>
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
	<link rel="icon" type="image/GIF" href="assets/img/icon.png">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no height=device-height" />
	<title>拼图</title>
	<link rel="stylesheet" href="assets/css/index.css">
	<link rel="stylesheet" href="assets/css/over.css">
	<script src="assets/js/dcagent.min.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script src="http://h5.dymfilm.com/games/html5/php/jssdk.php?url=<?php echo urlencode('http://h5.dymfilm.com'.$_SERVER['REQUEST_URI']);?>"></script>
</head>
<body>
	<div class="hide" style="display: none;">
		<img src="assets/img/icon.png"></div>
	<div id="loading" class="col-md-6 text-center">
		<div class="loader1">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>

	<div id="index">
		<div class="logo1"></div>
		<div id="startBtn" class="btn-start"></div>
		<div class="rule-title"></div>
		<div class="rules">
			<p><a href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect">关注@大银幕电影</a>，点菜单【免费电影票】中的【拼图】进入游戏；</p>
			<p>每天参与次数不限，以当天最好成绩（最短通关时间）计入排名；</p>
			<p>排名名次为当天幸运数字的网友，每人获得<span>2张电影票</span>（中奖网友及其约影小伙伴各1张）；</p>
			<p>在“中奖名单”中可以看到当天的<span>3个幸运数字</span>；</p>
			<p>回复“中奖名单”或在菜单【免费电影票】的【中奖名单】中可以查看每天的<span>中奖名单</span>；</p>
			<p>得知中奖后，请及时与我们联系（回复“领奖”），以便及时兑奖；</p>
			<p>领奖资格自当期“中奖名单”公布起三天内有效，过期作废。</p>
		</div>
		<div class="qr"><img src="assets/img/start/qr.png"></div>
		<div class="qr-text">长按关注大银幕<br>还有更多有奖游戏</div>
	</div>

	<div id="pageWrapper">
		<div id="pages">
			<div id="page_default" class="pagemodel">
				<div class="initloading" >
					<span class="normal-loading"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="mask"></div>
	<div  id="gameresult">
		<div class="resultcontainer">
			<div class="resultinfo"></div>
			<div class="btngroup">
				<!-- <a class="btn1 hide" id="seeRank">排行榜</a> -->
				<a class="btn1 hide" id="againgame">再玩一次</a>
				<a class="btn1 hide" id="restartgame">再来一次</a>
				<a class="btn1 " id="continuegame">挑战下一关</a>
				<a class="btn1" id="sharegame" onclick="dp_share();">炫耀一下</a>
			</div>
			<div class="btngroup">
				<a class="btn1"  id="moregame" onclick="clickMore();">更多游戏</a>
			</div>
		</div>

	</div>
	<div id="grid">
		<div class="logo">
			<img id="care" src="assets/img/over/success@2x.png"></div>
		<div id="rank">
			暂列全国第 <strong id="rankCountry" class="rank_color"></strong>
			名，打败了 <strong id="defeated"></strong>
			%的人。
		</div>
		<div class="btn_o">
			<button id="pintuAgain" class="btn again">再闯一次</button>
			<button id="dp_share" class="btn nxt">分享给小伙伴</button>
		</div>
		<div class="rank">
			<div id="lucy-rank">
				<div class="dashed">幸运名次</div>

				<ul id="luckys" class="lucy-rank"></ul>
			</div>

			<div id="ten-rank">
				<div class="dashed">排行榜</div>
				<ul id="ranking" class="ten-rank"></ul>
			</div>
			<div id="mine-rank">
				<div class="dashed">本次排名</div>
				<ul id="my-rank" class="ten-rank"></ul>
			</div>
		</div>
	</div>
	<script type="text/html" id="tpl_lucy">
 <%
 _.each(luckys, function(lucky) {
 %>
<li>
<p class="lucky-name"><%=lucky.name%></p>
  <p>
	<img class="lucky-avatar" src=<%=lucky.avatar%>></p>
   <p class="lucky-text">第<%=lucky.rank%>名</p>
</li>
<%});%></script>
	<script type="text/html" id="tpl_ranking">
 <%
 _.each(ranks, function(rank,i) {
 %>
<li>
	<span class="award">
	<%if(i<=2){%>
		<img src=assets/img/over/<%=i+1%>.png>
	<%}else{%>
		<%=i+1%>
	<%}%></span>
	<span class="avatar">
		<img src=<%=rank.avatar%>></span>
	<span class="name"><%=rank.name%></span>
	<span class="time">花<%=rank.elapsed%>秒</span>
	<span class="score">过<%=rank.score%>关</span>
</li>
<%});%></script>

	<script type="text/html" id="tpl_myrank">
<li>
	<span class="award">
		<%if(myrank.rank<=3){%>
		<img src=assets/img/over/<%=myrank.rank%>.png>
	<%}else{%>
		<%=myrank.rank%>
	<%}%></span>
	<span class="avatar">
		<img src=<%=myrank.avatar%>></span>
	<span class="name"><%=myrank.name%></span>
	<span class="time">花<%=window.costScuessTime%>秒</span>
	<span class="score">过<%=score%>关</span>
</li>
</script>

	<script type="text/template" style="display:none;" id="pageTemplate">
	<div id="<%= id%>" class="pagemodel">
		<div class="initloading" >
			<span class="normal-loading"></span>
		</div>
	</div>
</script>
	<script type="text/template" style="display:none;" id="indexTemplate">
	<h1 class="toptitle">拼图世界</h1>
	<div class="game-desc">
		<img src="./images/u193_normal.jpg">
		<div><span>欢迎来到拼图世界，勇士村。想要进村，先让我看看你有多大本事吧。</span></div>
	</div>
	<div class="categorys">
		<p class="cate-name">解救乱八七糟的水果们</p>
		<div>
			<img src="./images/u54_normal.png"></div>
		<div class="btn-con"><a href="javascript:;" showPage="category" class="btn">开始</a></div>
	</div>
</script>
	<script type="text/template" style="display:none;" id="saraTemplate">
	<div class="drag-content">
		<div class="play-container">
			<div class="drag-box"></div>
			<div class="masker">
				<div class="load">
					<div class="first-layer"></div>
					<div class="second-layer"></div>
					<div class="third-layer"></div>
					<div class="count-down" >
						<div class="play-button play-button-ready playbtn" ></div>
						<ul>
							<li>3</li>
							<li>2</li>
							<li>1</li>
						</ul>
					</div>
				</div>
			</div>
			<span class="done">done</span>
		</div>
		<div class="timer">
			<div class="timer-con">
				<span class="timer-icon"></span>
				<span class="t counter">00.000''</span>
			</div>
			<div class="kapics">1/1</div>
		</div>
		<div class="playinfo">
			<div class="first-guide">
				<div></div>
			</div>
			<div class="playing-state" style="display:none;">
				<span>暂停</span>
			</div>
			<div class="playing-over"  style="display:none;">
				<span class="restart" style="display:none;" onclick="window.reload();">重新开始</span>
				<span class="nextpic">下一关</span>
				<span class="continuepic">继续挑战</span>
				<span class="oldshare">分享</span>
				<span class="moregame">更多游戏</span>
			</div>
		</div>
	</div>
</script>

	<script type="text/template" style="display:none;" id="saraLayoutTemplate">
<% for(var i = 0 ; i < list.length;i++){%>
	<div class="item" sort="<%=list[i].sort%>" dragitem='1' style="width:<%=list[i].w%>px;height:<%=list[i].h%>px;background:url(<%=img%>) no-repeat;background-position:<%=list[i].x%>px <%=list[i].y%>px;background-size:<%=width%>px <%=height%>px;"></div>
<%}%></script>
	<script type="text/template" style="display:none;" id="showNextKaTemplate">
<div class="shownextka">
	<div class="lastpic">
		<img src="<%=pic%>"></div>
	<div class="msg">
		<p><%=first%></p>
		<p><%=second%></p>
		<p>耗时<%=time%></p>
	</div>
	<div class="opera">
		<span class="red next">第<%=next%>关&gt;</span>
		<span class="playagain">再玩一遍</span>
		<span class="share">分享</span>
	</div>
</div>
</script>
	<div id="share" ontouchstart="document.getElementById('share').style.display='none';" onclick="document.getElementById('share').style.display='none';">
		<img src="assets/img/share.png" alt=""></div>
	<script type="text/javascript" src="assets/js/common.js"></script>
	<script type="text/javascript">
var tap = ( !! ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "click" : "click";

$(document).ready(function(){
	if(isWeiXin()){
        $("#moregame").show();
        $("#sharegame").show();
    }else{
		$("#moregame").hide();
        $("#sharegame").hide();
    }
	$.getScript("assets/js/index.js",function(){
	})
});

var _timer = parseInt(Date.now() + 1e11 * Math.random());
window.isDo=true;
window.shareData = {
	imgUrl: "http://h5.dymfilm.com/games/html5/mini/pintu/assets/img/icon.png",
	timeLineLink: "http://h5.dymfilm.com/gm/1/page",
	tTitle: "拼图",
	tContent: "寻找一双犀利的眼睛。"
};
function clickMore(){
	  DCAgent.onEvent("更多游戏", 1, {userID: "null"});
     window.location = "http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect";
}
function dp_share(){
	 DCAgent.onEvent("分享按钮", 1, {userID: "null"});
	document.getElementById("share").style.display = "block";
}

function showAd(){
}
function hideAd(){
}

function getResult(score,time) {
	if(window.isOver&&window.isDo){
	    window.isOver=false;
	    window.isDo=false;
		var url = "http://h5.dymfilm.com";
		var jsonData={
			 "gameID":parseInt(signPackage.gameID),
			 "score":score,
			 "elapsed":time
		}
		$.ajax({
			type: "POST",
			contentType:"application/json",
	        data:JSON.stringify(jsonData),
			url: url + "/gm/result?unionID="+signPackage.unionID,
			success: function(data) {
	            renderOver(data.result,score);
			},
			error: function(data) {

			}
		});
	}
}

function renderOver(data,score){
	$("#pageWrapper,.mask,#gameresult,.item").hide();

	window.luckys=data.lucky;
	if(luckys.length==0){
		$("#lucy-rank").hide();
	}else{
		var tpl_lucy = $("#tpl_lucy").html();
		var lucyHtml = _.template(tpl_lucy, luckys);
		$("#luckys").html(lucyHtml);
	}

	window.ranks=data.ranks;
	var tpl_ranks = $("#tpl_ranking").html();
	var ranksHtml = _.template(tpl_ranks, ranks);
	$("#ranking").html(ranksHtml);

	window.myrank=data.me;
	window.score=score;
	var tpl_myranks = $("#tpl_myrank").html();
	var myrankHtml = _.template(tpl_myranks, myrank);
	$("#my-rank").html(myrankHtml);

	$("#rankCountry").html(myrank.rank);
    $("#defeated").html(myrank.defeated);
    document.title ="我在拼图中闯过了"+score+"关，在全国犀利眼中排名第"+myrank.rank+"！";
	window.shareData.tTitle = document.title;
    $("#grid").show();
}

$("body").on("click","#care", function(e) {
	DCAgent.onEvent("点我关注", 1, {userID: "null"});
   location.href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect";
});
var me=this;
$("body").on("click","#startBtn", function(e) {
	DCAgent.onEvent("开始游戏", 1, {userID: "null"});
	$("#index").hide();
    $("#pageWrapper").show();
});


function rank(){
	   if(window.isOver){
	   	window.costScuessTime;
	   	if(window.costScuessTime==undefined||window.costScuessTime==null){
	   		window.costScuessTime=10.00;
	   	}

	   	if(window.score==undefined||window.score==null){
	   		window.score=0;
	   	}
	   	getResult(window.score,window.costScuessTime);

	   }
  }

$("body").on(tap,"#pintuAgain",function(e) {
  console.log("pintuAgain");
  pintuAgain();
});

$("body").on(tap,"#dp_share",function(e) {
	console.log("dp_share");
   dp_share();
});


function pintuAgain(){
	DCAgent.onEvent("再来一次", 1, {userID: "null"});
	$("#loading").show();
	window.location.href=window.location.href;
	$("#gameresult").hide();
	$("#pageWrapper,.mask,.masker").show();
	// localStorage.setItem("isIndexShow",0);
}

var myData = { };
function dp_submitScore(score,specific){
	// $(".drag-float").remove();
	myData.level =parseInt(score);
	myData.scoreName = "闯了"+score+"关";
	document.title ="我在拼图中闯过了"+score+"关，这游戏不是一般人能玩的，你们也来试试吧！";
	window.shareData.tTitle = document.title;
	window._score=score;
}
DCAgent.init({appId:"C90EE22C4FDEF1B9D8C55D715CBEBE4A",virus:false});

window._count=<?php echo $count?>;
</script>
	<script src="assets/js/libs.min.js"></script>
	<script src="assets/js/wxShare.js"></script>
</body>
</html>