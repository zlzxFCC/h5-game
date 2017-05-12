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

     var dataJson = {
        "result": [{
            "name": "叶问3电影票1张",
            "date": "",
            "rule": ""
        }, {
            "name": "春秋航空30元优惠券",
            "date": "有效期：领取之日起3个月内有效。",
            "rule": "增值服务优惠券仅限手机注册用户领取使用；仅限APP预订机票时使用，每个订单只能使用一张优惠券。优惠券仅限购买托运行李、餐食、选座等；使用优惠券后发生退票时，不退不补，优惠券作废。"
        }, {
            "name": "神州专车25元代金券",
            "date": "有效期：领用之日起7日内有效。",
            "rule": "用户输入手机号后可领取，每个手机号码限领1次；限制单笔消费满70元可用。"
        },{
            "name": "天涯明月刀叶问专属礼包",
            "date": "有效期：有效期至2016/4/30。",
            "rule": "单个QQ账号只可兑换获得1份礼包；进入天涯明月刀礼包兑换中心进行兑换：http://wuxia.qq.com/exchange.shtml；活动礼包兑换后将于24小时内到账游戏内角色邮箱，提取附件后即可在角色背包内使用。"
        }, {
            "name": "面包新语50元电子券",
            "date": "有效期：即日起至2016年4月30日。",
            "rule": "该优惠券在仅限icingroom.com品牌使用，任意消费满188立减50元；每个订单只能使用一次且不能与其他优惠券同时使用；配送仅限上海地区。"
        }, {
            "name": "超级数码暴龙新年礼包",
            "date": "",
            "rule": "礼包包含 ：中免疫力药水*2、恭喜发财宝箱*1、装备强化卷轴*8；每个角色只能使用1个 不限渠道；兑换方式：进入游戏后使用礼包-输入兑换码。"
        }, {
            "name": "武器大师独家大礼包",
            "date": "有效期：1月27日-3月27日",
            "rule": "礼包包含 ：金币88888、钻石188、玉璧*1、原火*5、随从经验书*10；     有效期限：1月27日-3月27日；注意：每个角色只能使用1个 不限渠道；兑换方式：游戏主界面点击右上方设置-兑换码-输入兑换。"
        }, {
            "name": "本来生活网红枣优惠券",
            "date": "有效期：2016-2-17 至31日",
            "rule": "本活动仅限网站可配送到达地区用户参与；每个本网账户仅限使用一次，每笔订单仅限使用一张优惠券；如发生退款，退款按照实际支付金额退换，优惠券金额不退还到账户；生鲜商品属于季节性产品，兑换商品如因天气等不可抗力因素缺货，将在有效期内提供等值商品予以兑换。"
        }]
    };

    window.game = {
         $el: {
            "grid": $(".grid"),
            "indexs":$(".index"),
            "btnBuy": $(".btn-buy"),
            "overlay":$(".overlay"),
            "myOrder":$(".myorder"),
            "btnPay":$(".btn-pay"),
            "order":$(".order"),
            "back":$(".back"),
            "close":$(".close"),
            "btnExchange":$(".btn-exchange"),
            "boxTitle":$(".box-title"),
            "boxDate": $(".box-date"),
            "boxText":$(".box-text"),
            "couponRule":$(".coupon-buy-list")
        },
        init: function() {
            this.$el.grid.show();
            this.initEvent();
        },
        initEvent: function() {
            var me=this;
            var tap = (!!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "click" : "click";
            me.$el.btnBuy.on(tap, function(e) {
               me.$el.overlay.show();
               // .box-title,.box-date,.box-text
              

            });

            me.$el.couponRule.on(tap, function(e) {
                var index=parseInt($(e.target).data("index"));
                me.$el.boxTitle.html(dataJson.result[index].name);
                me.$el.boxDate.html(dataJson.result[index].date);
                me.$el.couponRule.html(dataJson.result[index].rule);
            });

            me.$el.btnPay.on(tap, function(e) {
               console.log("调支付接口");
            });

            me.$el.close.on(tap, function(e) {
                me.$el.overlay.hide();
            });

            me.$el.back.on(tap, function(e) {
                me.$el.myOrder.hide();
                me.$el.indexs.show();
            });

            me.$el.order.on(tap, function(e) {
                me.$el.overlay.hide();
                me.$el.indexs.hide();
                me.$el.myOrder.show();
            });

            me.$el.btnExchange.on(tap, function(e) {
                me.$el.overlay.hide();
                me.$el.indexs.hide();
                me.$el.myOrder.show();
            });
             
            
        }
    }

    var imagesList = ['assets/images/back.png', 'assets/images/buy.png', 'assets/images/card01.png', 'assets/images/card02.png', 'assets/images/card03.png','assets/images/card04.png', 'assets/images/card05.png', 'assets/images/card06.png', 'assets/images/card07.png', 'assets/images/card08.png',, 'assets/images/card1.png', 'assets/images/card2.png', 'assets/images/card3.png','assets/images/card4.png', 'assets/images/card5.png', 'assets/images/card6.png', 'assets/images/card7.png', 'assets/images/card8.png', 'assets/images/close.png', 'assets/images/main.png', 'assets/images/myorder.png'];
    preloadimages(imagesList, function() {
        $(".loading").hide();
        game.init();
    });

})(window);




