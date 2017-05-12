(function(win) {
	//确认签名已拿到
	if (typeof signPackage != "undefined") {
		wx.config({
			debug: false,
			appId: signPackage.appId,
			timestamp: signPackage.timestamp,
			nonceStr: signPackage.nonceStr,
			signature: signPackage.signature,
			jsApiList: [　'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone'
			],
			success: function(res) {
				alert(JSON.stringify(res));
			},
			fail: function(res) {
				alert(JSON.stringify(res));
			}
		});
		wxShare();
	}
})(window);

/*
 * 微信JS-SDK 分享类接口
 * @gameOver
 * @param {String} title    分享标题
 * @param {String} desc     分享描述
 * @param {String} link     分享链接
 * @param {String} imgUrl   分享图标
 * @allparam
 */
function wxShare() {
	wx.ready(function() {
		//分享给朋友
		wx.onMenuShareAppMessage({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function(res) {
				statistics("onShareFriends");
				// alert(JSON.stringify(res));
			},
			fail: function(res) {
				// alert(JSON.stringify(res));
			}
		});
		//分享到朋友圈
		wx.onMenuShareTimeline({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function(res) {
				statistics("onShareCircle");
				// alert(JSON.stringify(res));
			},
			fail: function(res) {
				// alert(JSON.stringify(res));
			}
		});
		//分享到QQ
		wx.onMenuShareQQ({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				statistics("onMenuShareQQ");
			}
		});
		//分享到QQ空间
		wx.onMenuShareQZone({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				statistics("onMenuShareQZone");
			}
		});
		//分享到腾讯微博
		wx.onMenuShareWeibo({
			trigger: function(res) {
				this.title = window.shareData.tTitle;
				this.desc = window.shareData.tContent;
				this.link = window.shareData.timeLineLink;
				this.imgUrl = window.shareData.imgUrl;
			},
			success: function() {
				statistics("onMenuShareWeibo");
			}
		});
	});
}

// 判断哪种统计 cnzz , DCAgent 
function statistics(shareName) {
	if (typeof _cnz != "undefined") {

		//cnzz
		// if (shareName == "onShareCircle") {
		// 	_czc.push(['_trackEvent', '分享朋友圈']);
		// } else {
		// 	_czc.push(['_trackEvent', '分享好友']);
		// }

	} else if (typeof DCAgent != "undefined") {

		//dataeye
		if (shareName == "onShareCircle") {
			DCAgent.onEvent("share_timeline", 1, {
				userID: 'null'
			});
		} else if (shareName == "onShareFriends") {
			DCAgent.onEvent("share_friends", 1, {
				userID: 'null'
			});
		} else if (shareName == "onMenuShareQQ") {
			DCAgent.onEvent("share_timeline", 1, {
				userID: 'null'
			});
		} else if (shareName == "onMenuShareQZone") {
			DCAgent.onEvent("share_QZone", 1, {
				userID: 'null'
			});
		} else {
			DCAgent.onEvent("share_weibo", 1, {
				userID: 'null'
			});
		}

	}
}
//判断是否为微信环境
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}