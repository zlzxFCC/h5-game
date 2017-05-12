<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <link rel="icon" type="image/gif" href="assets/img/kiss_share.png">
    <meta http-equiv="expires" content="-1">
    <link rel="stylesheet" type="text/css" href="assets/css/m.min.css?v=201504301920">
    <title>美女么么哒</title>
    <script src="http://h5-share-test.dymfilm.com/assets/js/dcagent.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>
<body>
    <div class="hide">
        <img src="assets/img/kiss_share.png"></div>
    <div id="layout">
        <div id="loading" class="page show">loading</div>
        <div id="index" class="page hide">
            <div class="app_name">美女么么哒</div>
            <div class="app_desc">爱我你就亲亲我</div>
            <div class="p_btns">
                <span class="btn_start_game js_start_game">开始游戏</span>
            </div>
        </div>
        <div id="game" class="page hide">
            <div id="game_header">
                <span class="score">
                    得分：
                    <span>0</span>
                </span>
                <span class="count_down"></span>
                <span class="btn_pause js_pause_game">暂停</span>
            </div>
            <div id="box">
                <div class="inner">
                    <div class="hole" id="hole1">
                        <div class="meizi" data-id="0"></div>
                    </div>
                    <div class="hole" id="hole2">
                        <div class="meizi" data-id="1"></div>
                    </div>
                    <div class="hole" id="hole3">
                        <div class="meizi" data-id="2"></div>
                    </div>
                    <div class="hole" id="hole4">
                        <div class="meizi" data-id="3"></div>
                    </div>
                    <div class="hole" id="hole5">
                        <div class="meizi" data-id="4"></div>
                    </div>
                    <div class="hole" id="hole6">
                        <div class="meizi" data-id="5"></div>
                    </div>
                    <div class="hole" id="hole7">
                        <div class="meizi" data-id="6"></div>
                    </div>
                    <div class="hole" id="hole8">
                        <div class="meizi" data-id="7"></div>
                    </div>
                    <div class="hole" id="hole9">
                        <div class="meizi" data-id="8"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="gameover" class="page hide"></div>
        <div id="game_pause" class="page hide">
            <div class="pause_txt">游戏暂停</div>
            <div class="p_btns">
                <span class="btn_continue js_game_continue">继续</span>
            </div>
            <div class="p_btns">
                <a href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect" target="_blank" class="btn_download_game js_download_game">更多游戏</a>
            </div>
        </div>
    </div>
    <script type="text/html" id="tpl_gameover">
        <div class="score">
            <p class="result">亲到 <%= score %> 个美女~ 击败了 <%= percent %>%的玩家。堪称：</p>
            <p class="name"><%= name %></p>
            <p class="congratulation"><%= congratulation %></p>
        </div>

        <div class="pic"><img src="<%= img %>" alt=""></div>
        <div class="msg"><%= desc %></div>

        <div class="do_more"><%= doMore %></div>

        <div class="p_btns">
            <span class="btn_play_again js_game_again">再来一次</span>
        </div>
         <div class="p_btns">
            <span class="btn_play_share js_game_share">分享</span>
        </div>
        <div class="p_btns">
            <a href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect" target="_blank" class="btn_download_game js_download_game">更多游戏</a>
        </div>
    </script>
    <div id="share" ontouchend="document.getElementById('share').style.display='none';">
        <img src="assets/img/share.png" alt=""></div>
    <script src="assets/js/libs.min.js"></script>
    <script src="assets/js/main.min.js"></script>
    <script src="http://h5-share-test.dymfilm.com/assets/js/wxShare.js"></script>
    <script>
    var _timer = parseInt(Date.now() + 1e11 * Math.random());
    window.shareData = {
        imgUrl: "http://h5-share-test.dymfilm.com/html5/mini/kiss/assets/img/kiss_share.png",
        timeLineLink: "http://h5-share-test.dymfilm.com/html5/mini/kiss/index.php?timer=" + _timer,
        tTitle: "美女么么哒",
        tContent: "爱我你就亲亲我"
    };
    DCAgent.init({appId:"7710E8A8FCF93BF3BCA806ABB387A736",virus:false});
    </script>
</body>
</html>