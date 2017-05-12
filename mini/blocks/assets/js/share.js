
 wx.config({
      debug: true,
      appId: signPackage.appId,
      timestamp: signPackage.timestamp,
      nonceStr: signPackage.nonceStr,
      signature: signPackage.signature,
      jsApiList: [　
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    });
  wx.ready(function() {
    var shareData = {
wx.ready(function () {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage',
        'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo',
		'onMenuShareQZone'
      ]
    });

  //分享给朋友接口
    wx.onMenuShareAppMessage({
     title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
       
      }
    });

  //“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
     title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
       
      }
    });
 

  //“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
     title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
       
      }
    });

    wx.onMenuShareQZone({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
       
      }
    });

  
  // “分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
     title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {

      }
    });
 

  var shareData = {
    title: '叶问',
    desc: '叶问',
    link: 'http://h5-share-test.dymfilm.com/index.php',
    imgUrl: 'http://h5-share-test.dymfilm.com/assets/images/logo.png'
  };
  // alert("imgUrl:"+shareData.imgUrl+"timeLineLink:"+shareData.link);
  // 2. 分享给朋友接口
  wx.onMenuShareAppMessage({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    trigger: function(res) {
      alert('用户点击发送给朋友');
    },
    success: function(res) {
      alert('已分享');
    },
    cancel: function(res) {
      alert('已取消');
    },
    fail: function(res) {

    }
  });

  //“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline({
    title: shareData.title,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    trigger: function(res) {
      alert('用户点击分享到朋友圈');
    },
    success: function(res) {
      alert('已分享');
    },
    cancel: function(res) {
      alert('已取消');
    },
    fail: function(res) {

    }
  });


  //“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareQQ({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    trigger: function(res) {
      //alert('用户点击分享到QQ');
    },
    complete: function(res) {

    },
    success: function(res) {
      //alert('已分享');
    },
    cancel: function(res) {
      //alert('已取消');
    },
    fail: function(res) {

    }
  });

  wx.onMenuShareQZone({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    trigger: function(res) {
      //alert('用户点击分享到QQ');
    },
    complete: function(res) {

    },
    success: function(res) {
      //alert('已分享');
    },
    cancel: function(res) {
      //alert('已取消');
    },
    fail: function(res) {

    }
  });


  // “分享到微博”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareWeibo({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl,
    trigger: function(res) {
      //alert('用户点击分享到微博');
    },
    complete: function(res) {

    },
    success: function(res) {
      //alert('已分享');
    },
    cancel: function(res) {
      //alert('已取消');
    },
    fail: function(res) {

    }
  });

  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareQQ(shareData);
  wx.onMenuShareWeibo(shareData);
  wx.onMenuShareQZone(shareData);
});

wx.error(function(res) {
  alert(res.errMsg);
});

//判断是否为微信环境
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
