(function() {
    function preloadimages(obj, cb) {
        var loaded = 0;
        var toload = 0;
        var images = obj instanceof Array ? [] : {};

        for (var i in obj) {
            toload++;
            images[i] = new Image();
            images[i].onload = load;
            images[i].onerror = load;
            images[i].onabort = load;
            images[i].src = obj[i];
        }

        function load() {
            if (++loaded >= toload) cb(images);
        }
    }

    window.game = {
        $el: {
            "grid": $(".grid"),
            "start": $("#btn-start"),
            "over": $("#over"),
            "scuess": $(".scuess"),
            "fail": $(".fail"),
            "error": $(".error"),
            "result": $(".scuess,.fail,.error")
        },
        init: function() {
            this.$el.grid.show();
        },
        initEvent: function(unionID, pkgID) {
            var me = this;
            var tap = (!!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "click" : "click";
            me.$el.start.on(tap, function(e) {
                // $(".loading").show();
                me.$el.over.show();
                me.$el.result.hide();
                me.getRed(unionID, pkgID);
                // me.wxpay();
            });

            $("#over").on('click', function(e) {
                var show = $(this).css("display") == "block";
                if (show) $(this).hide();
            });
            $("#btn-ticket").on('click', function(e) {

            });

        },
        getRed: function() {
            var me = this;
            // $(".loading").show();
            me.$el.over.show();
            me.$el.result.hide();
            var getData = Math.floor(Math.random() * (2 - 0) + 0);
            if (getData) {
                me.$el.scuess.show();
            } else {
                me.$el.fail.show();
            }
            // $(".loading").hide();
            // setTimeout(function(){$(".loading").hide();}, 3000);
        },
        wxpay: function() {
            $.ajax({
                type: "GET",
                url: "",
                success: function(data) {
                    // prepay_id
                },
                error: function(data) {}
            });

            function onBridgeReady() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId"：
                        signPackage.appId, //公众号名称，由商户传入     
                            "timeStamp"：
                        signPackage.timestamp, //时间戳，自1970年以来的秒数     
                            "nonceStr"：
                        signPackage.nonceStr, //随机串     
                            "package"：
                        "prepay_id=u802345jgfjsdfgsdg888",
                        "signType"：
                        "MD5", //微信签名方式：     
                        "paySign"：
                        signPackage.signature //微信签名 
                    },
                    function(res) {
                        if (res.err_msg == "get_brand_wcpay_request：ok") {
                            alert("支付成功");
                        } else if (res.err_msg == "get_brand_wcpay_request：cancel") {
                            // 支付过程中用户取消
                        } else if (res.err_msg == "get_brand_wcpay_request：fail") {
                            // 支付失败
                        }
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。 
                    }
                );
            }
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
            // return;
            // wx.chooseWXPay({
            //     "appId": signPackage.appId,
            //     "timestamp": signPackage.timestamp,
            //     "nonceStr": signPackage.nonceStr,
            //     "package": 'prepay_id=sara',
            //     "signType": 'MD5',
            //     "paySign": signPackage.signature,
            //     success: function(res) {
            //         var res = {
            //             "errcode": 0,
            //             "errmsg": "ok",
            //             "ticket": "bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
            //             "expires_in": 7200
            //         };
            //         if (res.errmsg == "get_brand_wcpay_request：ok") {
            //             // 支付成功
            //         } else if (res.errmsg == "get_brand_wcpay_request：cancel") {
            //             // 支付过程中用户取消
            //         } else if (res.errmsg == "get_brand_wcpay_request：fail") {
            //             // 支付失败
            //         }
            //     }
            // });
        }
    }

    var imgList = ['assets/img/bg.png', 'assets/img/mailer.png', 'assets/img/share.png', 'assets/img/startBtn.png', 'assets/img/ticketBtn.png'];
    preloadimages(imgList, function() {
        $(".loading").hide();
        game.init();
    });

})(window);