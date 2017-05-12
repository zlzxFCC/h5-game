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
            "indexs":$(".index"),
            "btnGuess": $("#btnGuess"),
            "btnSubmit":$("#btnSubmit"),
            "btnModifty":$("#btnModifty"),
            "overlay":$(".overlay"),
            "scuess":$(".scuess"),
            "unfilled":$(".unfilled"),
            "filled":$(".filled"),
            "phoneHide":$(".phone,.phone-tips")
        },
        init: function() {
            this.$el.grid.show();
            this.initEvent();
        },
        initEvent: function() {
            var me=this;
            var tap = (!!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "click" : "click";
            me.$el.btnGuess.on(tap, function(e) {
               me.$el.overlay.show();

            });

             me.$el.btnSubmit.on(tap, function(e) {
               me.$el.overlay.hide();
               me.$el.indexs.hide();
               setTimeout(function(){
                    me.$el.scuess.hide();
                    me.$el.indexs.show();
                    me.$el.unfilled.hide();
                    me.$el.filled.show();
               },1000);
               me.$el.scuess.show();
            });

            me.$el.btnModifty.on(tap, function(e) {
                me.$el.overlay.show();
                me.$el.phoneHide.hide();
            });
             
            
        }
    }

    var imgList = ['assets/img/activity.png', 'assets/img/award.png', 'assets/img/guess.png', 'assets/img/iphone6.png', 'assets/img/line.png','assets/img/submit.png', 'assets/img/show.png', 'assets/img/ticket.png', 'assets/img/guess_top.png', 'assets/img/modifty.png', 'assets/img/lucky.png'];
    preloadimages(imgList, function() {
        $(".loading").hide();
        game.init();
    });

})(window);




