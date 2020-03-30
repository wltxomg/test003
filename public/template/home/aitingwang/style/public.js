function share(a) {
    var b = typeof a.title=="undefind"?encodeURIComponent(document.title):encodeURIComponent(a.title),
        c =typeof a.url=="undefind"?document.URL :a.url + "?utm_source",
        d = encodeURIComponent(a.titlepic);
    return "undefined" == typeof d && (d = ""), sharebtn = {
        wb: $("<a class=\"wb left\" onclick=\"ga('send', 'event','Share','Button','Sina');\" target=\"_blank\" href=\"http://service.t.sina.com.cn/share/share.php?appkey=2579900422&ralateUid=1845864154&title=" + b + "&url=" + encodeURIComponent(c + "=weibo") + "&pic=" + d + '"><i></i></a>'),
        qq: $("<a class=\"qq left\" onclick=\"ga('send', 'event','Share','Button','QQ');\" target=\"_blank\" href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(c + "=qzone") + "&site=&title=" + b + "&pics=" + d + '"><i></i></a>'),
        wx: $("<a class=\"wx left\" onclick=\"ga('send', 'event','Share','Button','Wechat');\" dataurl=\"" + encodeURIComponent(c + "=wechat") + '" href="javascript:void(0)"><i></i></a>').bind("click", function() {
			if($("#weixin").length==0){
				var a = $('<div class="weixin-cen" id="weixin"><div class="weixin_close clearfix"><p class="left">亲，请扫描下方二维码，分享给微信的小伙伴们！</p><img class="right" src="http://skin.kankanews.com/v5/images/icon_close.gif"></div><div class="weixin-con" id="wxcode"><img src= "http://s.jiathis.com/qrcode.php?url=' + $(this).attr("dataurl") + '" width="250" height="250" alt="网址URL二维码生�?"></div><div class="sm">打开微信，点击界面右上角魔术棒，选择“扫一扫�?<br>打开微信，点击发现，选择“扫一扫”（5.0以上版本�?</div></div>');
				return a.show(), a.find(".weixin_close img").bind("click", function() {
					a.remove()
				}), $("body").append(a), !1
			}
        }),
        email: $("<a class=\"email left\" onclick=\"ga('send', 'event','Share','Button','Sina');\" target=\"_blank\" href=\"mailto:\"><i></i></a>"),
        sprint: $('<a class="print left" target="_blank" href="javascript:void(0)"><i></i></a>').bind("click", function() {
            $("body").html($("h1").html() + "<br/>" + $(".publish-data").html() + $(".resource").html() + "<br/>" + $(".context").html()), window.print()
        }),
        appad: $('<div class="app right clearfix"><p class="right"><a class="btnInstallApp" title="iPhone" href="http://www.kankanews.com/m/jianghu.html" target="_blank">立即下载</a></p><img class="left" src="http://skin.kankanews.com/mobile/jh/images/logo_jh180.jpg"><span>下载江湖客户�?</span><em>有人的地方就有江�?</em></div>')
    }, sharebtn
}
function getPassedTime(nowatime, time) {
	var intervalTime = nowatime - time;
	var laststr = "";
	//�?
	if (intervalTime < 60) {
		laststr = '�?';
	} else if (intervalTime / 60 < 60) {
		intervalTime = intervalTime / 60;
		laststr = '分钟';
	} else if (intervalTime / 3600 < 24) {
		intervalTime = intervalTime / 3600;
		laststr = '小时';
	} else if (intervalTime / 86400 <= 3){
		laststr = '�?';
		intervalTime = intervalTime / 86400;
	}else{
		return false;
	}
	return parseInt(intervalTime) + laststr + "�?";
}
$(function(){
	$(".navList li").each(function() {
        navclass = $(this).data("id");
		var windowsurl=window.location.href;
        if (typeof navclass != "undefined" && navclass !== null && navclass !== '') {
			if (navclass=='live'&&!/huikan/i.test(windowsurl)&&!/knews24/i.test(windowsurl)&&/live/i.test(window.location.href)) {
				$(".navList li.cur").removeClass("cur");
                $(this).addClass("cur");
				//console.log("live");
			}else if (navclass!=='live'&&eval('/' + navclass + '/i').test(window.location.href)) {
                $(".navList li.cur").removeClass("cur");
                $(this).addClass("cur");
				//console.log("other");
            }
        }
    });
    $("ul.rankList").each(function(){
        $(this).find('li:odd').addClass("odd");
        $(this).find('li:even').addClass("even");
    });
    $("ul.hotList").each(function(){
        $(this).find('li:odd').addClass("odd");
        $(this).find('li:even').addClass("even");
    });
    $("h1.hotbg li").each(function(index){
       $(this).on("click",function(){
           $("h1.hotbg li").removeClass("cur");
           $(this).addClass("cur");
           $(".tabCon ul").hide().eq(index).show();
       })
    });
	if(typeof info!=="undefind" && $(".share").length>0){
		var a = share(info);
		$(".share").append(a.wb, a.wx, a.qq);
	}
	if(typeof changetime!='undefined'&&changetime){
		$.ajax({
			type:"OPTIONS",
			url:"/crossdomain.xml",
			complete:function(x) {
				var time_stamp = Date.parse(x.getResponseHeader("Date"));
				var nowatime = time_stamp / 1000;
				$("span,b").each(function(){
					var datatime=$(this).data("time");
					if(datatime!==''&&typeof datatime!=='undefined'){
						var passedTime=getPassedTime(nowatime, datatime);
						if(passedTime){
							$(this).html(passedTime);
						}
					}
				})
			}
		});
	}
	if(typeof info!=="undefined"&&typeof info.filename!=="undefined"){
		//添加广告http://www.kankanews.com/skin/v7/js/ad20160811.json		//内容�?
		$.getJSON("http://www.kankanews.com/skin/v7/js/ad20160811.json",function(data){
			var ads;
			if($('#videoCon').length>0) ads=data.video;
			else ads=data.article;
			$('.adBox').last().addClass('marB').html('<div style="margin:0 auto; width:250px;">'+ads.right+'</div>');
			$('.relevant').before('<div class="adbar marB" style="margin-left:auto; margin-right:auto; margin-top:20px; width:640px;">'+ads.bottom+'</div>');
		});
	}else if($('.banner_second_ads_hide').length>0){
		$('.banner_second_ads_hide').each(function(i,item){
			if($(item).find('img').length>0) $(item).addClass('marB');
			if(i==0) {
				$('.mainBody').before('<div class="adindex1" style="width:100%;"></div>');
				$('.adindex1').append($(item));
			}else if(i==1){
				$('.conlist').eq(0).after('<div class="adindex2" style="width:100%;"></div>');
				$('.adindex2').append($(item));
			}else if(i==2){
				$('.adBox').eq(0).append($(item));
			}else if(i==3){
				$('.adBox').eq(1).append($(item));
			}
		})
	}else if($('.banner_ads_hide').length>0){
		$('.banner_ads_hide').each(function(i,item){
			if($(item).find('img').length>0) $(item).addClass('marB');
			if(i==0) {
				$('.mainBody').before('<div class="adindex1" style="width:100%;"></div>');
				$('.adindex1').append($(item));
			}
			if(i==1) {
				$('.conlist').eq(0).after('<div class="adindex2" style="width:100%;"></div>');
				$('.adindex2').append($(item));
			}
			if(i==2) {
				$('.conlist').eq(1).after('<div class="adindex3" style="width:100%;"></div>');
				$('.adindex3').append($(item));
			}
		})
	}
});
