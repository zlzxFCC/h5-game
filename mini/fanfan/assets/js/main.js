! function(a) {
	{
		var b = "ontouchend" in a ? "touchend" : "mousedown";
		a.FanFan = {
			init: function() {
				var a = this,
					b = $("#js-loading");
				b.removeClass("fadeIn fadeOut").addClass("fadeIn").show();
				var c = this.Resource;
				this.Preload.loadImg(c, function() {
					b.hide(), a.render(), a.gameInit();
				});
			},
			gameInit: function() {
				createjs.Sound.registerSound({
					src: "assets/img/success.mp3",
					id: "success"
				}), createjs.Sound.registerSound({
					src: "assets/img/end.mp3",
					id: "end"
				}), createjs.Sound.registerSound({
					src: "assets/img/err.mp3",
					id: "err"
				});
			},
			render: function() {
				this.gameReady(), this.bindEvent()
			},
			resizeGrids: function() {
				var b = $("#js-grids"),
					c = $(a).width();
				c = c > 640 ? 640 : c, b.css({
					width: c + "px",
					height: c + "px"
				})
			},
			bindEvent: function() {
				{
					var a = this,
						c = $("#js-btn-start"),
						d = $("#js-btn-again");
					$("#js-btn-more")
				}
				c.off(b), c.on(b, function() {
					DCAgent.onEvent("开始按钮", 1, {
						userID: "null"
					});
					a.gameIn()
				}), d.off(b), d.on(b, function() {
					DCAgent.onEvent("再来一次", 1, {
						userID: "null"
					});
					a.gameIn()
				})
			},
			gameReady: function() {
				var a = $("#js-gameready");
				a.removeClass("fadeIn fadeOut").addClass("fadeIn").show()
			},
			gameIn: function() {
				var a = $("#js-time"),
					b = $("#js-score"),
					c = ($("#js-gameready"), $("#js-gamein")),
					d = $(".page");
				b.html(0), a.html("01:00"), this.resizeGrids(), d.hide(), c.removeClass("fadeIn fadeOut").addClass("fadeIn").show(), this.gameLevel = 0, this.createLevel(this.gameLevel), this.countdown(), this.score = 0
			},
			createLevel: function(a) {
				var b = $("#js-grids"),
					c = "",
					d = this.Map,
					e = d.level;
				a > e.length - 1 && (a = e.length - 1);
				var f = e[a],
					g = f.mode,
					h = f.pattern,
					i = h.length;
				this.countLen = g * g / 2;
				for (var j = g * g / i, k = 0; len = j, k < len; k++) {
					h.sort(this.randomSort);
					for (var m = 0; l = i, m < l; m++) c += '<li class="item-card" data-type="' + h[m] + '"><div class="cardback"></div><div class="cardfront fanfan-' + h[m] + '"></div></li>'
				}
				b.removeClass("lv-2 lv-4 lv-6 lv-8").addClass("lv-" + g).find("ul").html(c), this.gameLogic()
			},
			countdown: function() {
				var a = this,
					b = $("#js-time");
				this.levelTime = this.Map.time, this.timer && clearInterval(this.timer), this.timer = setInterval(function() {
					if (a.levelTime--, a.levelTime < 0) return void a.gameTimeOut();
					var c = a.timeFormat(a.levelTime);
					b.html(c)
				}, 1e3)
			},
			gameLogic: function() {
				var a = this,
					c = null,
					d = 0,
					e = $("#js-grids");
				e.off(b, ".item-card"), e.on(b, ".item-card", function() {
					DCAgent.onEvent("翻牌", 1, {
						userID: "null"
					});
					var b = $(this);
					b.removeClass("item-card").addClass("current"), null == c ? c = b : c.data("type") === b.data("type") ? (c.removeClass("item-card").addClass("current"), b.removeClass("item-card").addClass("current"), c = null, b = null, d++, a.calcScore()) : setTimeout(function() {
						createjs.Sound.play("err"), c && c.removeClass("current").addClass("item-card"), b.removeClass("current").addClass("item-card"), c = null, b = null
					}, 300), d === a.countLen && (setTimeout(function() {
						a.nextLevel()
					}, 300), d = 0)
				})
			},
			nextLevel: function() {
				costScuessTime= (this.Map.time-this.levelTime);
				console.log("花掉的时间:"+costScuessTime);
				this.gameLevel = this.gameLevel + 1, this.createLevel(this.gameLevel);
				// console.log('第' + this.gameLevel + '关');
			},
			gameOver: function() {
				var a = $("#js-gameover"),
					b = $("#js-gameover-percent"),
					c = $("#js-gameover-score");
					// e = $("#js-gameover-level"); e.html(levelName), 
				clearInterval(this.timer), this.timer = null, this.levelTime = 0;
				var d = this.calcPercent(this.score);
				var levelName;
				this.gameLevel==0?levelName = window.levelName[0]:levelName = window.levelName[this.gameLevel - 1];
				b.html(d), c.html(this.score), a.removeClass("fadeIn fadeOut").addClass("fadeIn").show();
				window.shareData.tTitle = '吓死宝宝了！恭喜你获得"' + levelName + '"的称号，击败了朋友圈' + d + '%的人。';
				document.title = window.shareData.tTitle;
			},
			gameTimeOut: function() {
				var a = this,
					b = $("#js-timeout");
				createjs.Sound.play("end");
				b.addClass("pop").show(), setTimeout(function() {
					b.removeClass("pop").hide(), a.gameOver()
				}, 800)
			},
			calcScore: function() {
				var a = $("#js-score");
				createjs.Sound.play("success");
				this.score = this.score + 2, a.text(this.score).addClass("pop"), setTimeout(function() {
					a.removeClass("pop")
				}, 100)
			},
			calcPercent: function(a) {
				var b = 0,
					c = parseInt(10 * Math.random());
				return b = 30 >= a ? .02 * a * 100 : a > 30 && 40 > a ? .02 * a * 100 + 10 : a >= 40 && 50 >= a ? Math.round(10 * (a / 10 / 2 - 2)) + 90 : a > 50 && 70 >= a ? Math.round(10 * (a / 10 / 2 - 2)) / 2 + 92.5 : 100, b = b.toFixed(1), 100 > b && (b += c), b
			},
			randomSort: function() {
				return Math.random() - Math.random()
			},
			timeFormat: function(a) {
				var b = "",
					c = "",
					d = "",
					e = Math.floor(a / 60),
					f = a % 60;
				c = 10 > e ? "0" + e : e, d = 10 > f ? "0" + f : f;
				var b = c + ":" + d;
				return b
			}
		}
	}
}(window), $(function() {
		FanFan.init()
	}),
	function(a) {
		a.Resource = ["./assets/img/logo.png", "./assets/img/btn-start.png", "./assets/img/icon-score.png", "./assets/img/icon-time.png", "./assets/img/cardback-bg.png", "./assets/img/share-tips.png", "./assets/img/fanfan-01.png", "./assets/img/fanfan-02.png", "./assets/img/fanfan-03.png", "./assets/img/fanfan-04.png", "./assets/img/fanfan-05.png", "./assets/img/fanfan-06.png", "./assets/img/fanfan-07.png", "./assets/img/fanfan-08.png", "./assets/img/fanfan-09.png", "./assets/img/fanfan-10.png", "./assets/img/fanfan-11.png", "./assets/img/fanfan-12.png", "./assets/img/fanfan-13.png", "./assets/img/fanfan-14.png", "./assets/img/fanfan-15.png", "./assets/img/fanfan-16.png", "./assets/img/fanfan-17.png", "./assets/img/fanfan-18.png", "./assets/img/fanfan-19.png", "./assets/img/fanfan-20.png", "./assets/img/fanfan-21.png", "./assets/img/fanfan-22.png", "./assets/img/fanfan-23.png", "./assets/img/fanfan-24.png"];
	}(window.FanFan),
	function(a) {
		a.Preload = {
			loadImg: function(a, b) {
				function c() {
					d++;
					var a = $("#js-percent"),
						c = Math.floor(d / e * 100);
					a.html(c), d >= e && setTimeout(function() {
						b(f)
					}, 100)
				}
				var d = 0,
					e = 0,
					f = a instanceof Array ? [] : {};
				for (var g in a) e++, f[g] = new Image, f[g].onload = c, f[g].onerror = c, f[g].onabort = c, f[g].src = a[g]
			}
		}
	}(window.FanFan),
	function(a) {
		var _timer = parseInt(Date.now() + 1e11 * Math.random());
		window.shareData = {
			imgUrl: "http://h5-share-test.dymfilm.com/html5/mini/fanfan/assets/img/logo.png",
			timeLineLink: "http://h5-share-test.dymfilm.com/html5/mini/fanfan/index.php?timer=" + _timer,
			tTitle: "女神翻翻看",
			tContent: "众里寻Ta千百度，蓦然回首那人却在..."
		};
		// window.levelName=["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"];
		window.levelName = ["色不起来", "有色心没色胆", "好色之徒", "色胆包天", "色不知耻", "英雄本色", "色射具全", "裸色舔香", "衣冠禽色"];
		window.costScuessTime=0;
		a.Map = {
			time: 60,
			level: [{
				time: 10,
				mode: 2,
				pattern: ["01", "02"]
			}, {
				time: 10,
				mode: 2,
				pattern: ["03", "04"]
			}, {
				time: 15,
				mode: 4,
				pattern: ["05", "06", "07", "08", "09", "10", "11", "12"]
			}, {
				time: 15,
				mode: 4,
				pattern: ["09", "10", "11", "12", "13", "14", "15", "16"]
			}, {
				time: 15,
				mode: 4,
				pattern: ["13", "14", "15", "16", "17", "18", "19", "20"]
			}, {
				time: 20,
				mode: 4,
				pattern: ["01", "02", "03", "04", "05", "06", "07", "08"]
			}, {
				time: 20,
				mode: 4,
				pattern: ["17", "18", "19", "20", "21", "22", "23", "24"]
			}, {
				time: 30,
				mode: 6,
				pattern: ["01", "02", "03", "04", "05", "06", "19", "20", "21", "22", "23", "24"]
			}, {
				time: 30,
				mode: 6,
				pattern: ["05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
			}, {
				time: 30,
				mode: 6,
				pattern: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]
			}, {
				time: 40,
				mode: 6,
				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
			}, {
				time: 50,
				mode: 8,
				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
			}, {
				time: 50,
				mode: 8,
				pattern: ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
			}, {
				time: 60,
				mode: 8,
				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
			}]
		}
	}(window.FanFan);