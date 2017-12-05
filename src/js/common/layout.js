/**
* layout.js
* 공통으로 사용되는 header 를 작성한다.
*/
(function (window, document, $) {

    //document.domain = 'joins.com';
    var utils = window.utils,
		pageType = utils.config('pageType'),
		domain = utils.config('webPcPath'),
		windowSize = utils.windowSize(),
		$body = $(document.body);

    //jTracker Begin
    var jTracker = {
        siteName: "TRACKER",
        __getCookieVal: function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        __getCookie: function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) return this.__getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        },
        __getCookieA: function (name1, name2) {
            var string = this.__getCookie(name1);
            if (string == null) string = "";
            var flag = string.indexOf(name2 + "=");
            if (flag != -1) {
                flag += name2.length + 1;
                var end = string.indexOf("&", flag);
                if (end == -1) end = string.length;
                return unescape(string.substring(flag, end));
            }
            else {
                return "";
            }
        },
        __request: function (param) {
            try {
                var aParams = new Array();
                var sUrlParam = document.location.search.substring(1);
                for (var nIdx = 0; nIdx < sUrlParam.split("&").length; nIdx++)
                    aParams[sUrlParam.split("&")[nIdx].split("=")[0].toString()] = sUrlParam.split("&")[nIdx].split("=")[1].toString();
                if (aParams[param]) { return aParams[param]; } else { return ""; }
            } catch (e) {
                return "";
            }
        },
        __joins_device_detect_type1: function () {
            var sDeviceCheck = "0"; // pc
            var _agent = navigator.userAgent.toLowerCase();
            if (_agent.indexOf("iphone") != -1 || _agent.indexOf("ipod") != -1) sDeviceCheck = "2";
            else if (_agent.indexOf("ipad") != -1) sDeviceCheck = "4";
            else if (_agent.indexOf("android") != -1) {
                if (_agent.indexOf("mobile") != -1) sDeviceCheck = "1";
                else sDeviceCheck = "3";
            }
            else {
                var mobile = (/blackberry|mini|windows\sce|palm/i.test(_agent));
                if (mobile) sDeviceCheck = "5";
                else {
                    if (_agent.indexOf("mac") != -1) sDeviceCheck = "8";
                    else if (_agent.indexOf("x11") != -1) sDeviceCheck = "9";
                }
            }
            return sDeviceCheck;
        },
        __get_browser: function () {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/Edge/i.test(ua)) {
                tem = /(edge)\/((\d+)?[\w\.]+)/ig.exec(ua) || [];
                return "Edge%20" + (tem[3] || "");
            }
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return "IE%20" + (tem[1] || "");
            }
            if (M[1] === "Chrome") {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) return "Opera%20" + tem[1];
            }
            if (navigator.appName.length > 0 && navigator.appVersion.charCodeAt(0) < 128) {
                M = (typeof (M[2]) != "undefined" && M[2]) ? [M[1], M[2]] : [navigator.appName, navigator.appVersion];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M.join("%20");
            }
            else {
                return ua;
            }
        },
        __get_os: function () {
            var os = "";
            var clientStrings = [
				{ s: 'Windows 3.11', r: /Win16/ },
				{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
				{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
				{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
				{ s: 'Windows CE', r: /Windows CE/ },
				{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
				{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
				{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
				{ s: 'Windows Vista', r: /Windows NT 6.0/ },
				{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
				{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
				{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
				{ s: 'Windows 10', r: /Windows NT 10.0/ },
				{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
				{ s: 'Windows ME', r: /Windows ME/ },
				{ s: 'Android', r: /Android/ },
				{ s: 'Open BSD', r: /OpenBSD/ },
				{ s: 'Sun OS', r: /SunOS/ },
				{ s: 'Linux', r: /(Linux|X11)/ },
				{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
				{ s: 'Mac OS X', r: /Mac OS X/ },
				{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
				{ s: 'QNX', r: /QNX/ },
				{ s: 'UNIX', r: /UNIX/ },
				{ s: 'BeOS', r: /BeOS/ },
				{ s: 'OS/2', r: /OS\/2/ },
				{ s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];

            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(navigator.userAgent)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = "";
            try {
                if (/Windows/.test(os)) {
                    osVersion = /Windows (.*)/.exec(os)[1];
                    os = 'Windows';
                }
                switch (os) {
                    case 'Mac OS X':
                        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(navigator.userAgent)[1];
                        break;
                    case 'Android':
                        osVersion = /Android ([\.\_\d]+)/.exec(navigator.userAgent)[1];
                        break;
                    case 'iOS':
                        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
                        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                        break;
                }
            }
            catch (e) {
            }
            return os.replace(" ", "%20") + (osVersion == "" ? "" : "%20" + osVersion);
        },
        put: function () {
            var _ref = document.referrer;
            var _ref_param = "";
            var _tmpPos = _ref.indexOf("?");
            if (_tmpPos != -1) { _ref_param = _ref.substring(_tmpPos + 1).replace(/\^/g, "-"); _ref = _ref.substring(0, _tmpPos); }
            var _uri = document.location.href;
            var _uri_param = "";
            var _tmpPos = _uri.indexOf("?");
            if (_tmpPos != -1) { _uri_param = _uri.substring(_tmpPos + 1).replace(/\^/g, "-"); _uri = _uri.substring(0, _tmpPos); }
            var _dt = this.__joins_device_detect_type1();
            var _br = this.__get_browser();
            var _os = this.__get_os();
            var _w = window.screen.width;
            var _h = window.screen.height;
            var _joins_memid = this.__getCookieA("MemArray", "MemID"); if (_joins_memid == null) _joins_memid = "";
            var _joins_pcid = this.__getCookie("PCID"); if (_joins_pcid == null) _joins_pcid = "";
            var _href = "http://counter.joins.com/bin/ArticleCounterLogger.dll?Total_ID=" + _br + "&Ctg_ID=" + _os + "&cloc=" + _joins_pcid + "&svc=" + this.siteName + "&memid=" + _joins_memid + "&comm1=" + _dt + "&comm3=" + _w + "x" + _h + "&comm2=" + encodeURIComponent(_uri) + "&ref=" + encodeURIComponent(_ref) + "&Master_Code=" + encodeURIComponent(_uri_param) + "&gubun=" + encodeURIComponent(_ref_param);

            var _ifrm = document.createElement("IFRAME");
            _ifrm.setAttribute("src", _href);
            _ifrm.style.width = "0px";
            _ifrm.style.height = "0px";
            _ifrm.style.display = "none";
            document.body.appendChild(_ifrm);
        }
    };
    //jTracker End

    // link : {href, target, text[, html]}
    // image : {src, alt}
    setConfigLoginInfo();

    //jTracker Exec
    $(function ($) {
        jTracker.siteName = "TRACKERJA";
        jTracker.put();
    });

    function setConfigLoginInfo() {
        var id = utils.getCookie(COOKIE_NAMES.userId) || '';
        utils.config(CONFIG_NAMES.isLogin, !id.isEmpty());
    }

    utils.linkService = new function () {
        var
			mapData = {
			    service: [
					{ key: 'jp', link: { text: '日文', href: 'http://japanese.joins.com', target: '_blank', title: '(새창) 일문 사이트로 이동' } },
					{ key: 'cn', link: { text: '中文', href: 'http://chinese.joins.com', target: '_blank', title: '(새창) 중문 사이트로 이동' } },
					{ key: 'en', link: { text: 'ENG', href: 'http://joongangdaily.joins.com', target: '_blank', title: '(새창) 영문 사이트로 이동' } },
					{ key: 'usajoongang', link: { text: 'USA중앙', href: 'http://www.koreadaily.com/', target: '_blank' } },
					{ key: 'joongangilbo', link: { text: '중앙일보', href: 'http://joongang.joins.com', target: '_blank' } },
					{ key: 'joongangsunday', link: { text: '중앙SUNDAY', href: 'http://sunday.joins.com', target: '_blank' } },
					{ key: 'ilgansports', link: { text: '일간스포츠', href: 'http://isplus.joins.com', target: '_blank' } },
					{ key: 'koreajoongangdaily', link: { text: 'Korea Joongang Daily', href: 'http://koreajoongangdaily.joins.com', target: '_blank' } },
					{ key: 'koreadaily', link: { text: 'The Korea Daily', href: 'http://www.koreadaily.com', target: '_blank' } },
					{ key: 'jtbc', link: { text: 'JTBC', href: 'http://jtbc.joins.com', target: '_blank' } },
					{ key: 'jtbc2', link: { text: 'JTBC2', href: 'http://jtbc2.joins.com', target: '_blank' } },
					{ key: 'jtbcgolf', link: { text: 'JTBC GOLF', href: 'http://www.jtbcgolf.com', target: '_blank' } },
                    { key: 'jtbc3foxsports', link: { text: 'JTBC3 FOX Sports', href: 'http://jtbc3foxsports.joins.com', target: '_blank' } },
					{ key: 'economist', link: { text: '이코노미스트', href: 'http://jmagazine.joins.com/economist', target: '_blank' } },
					{ key: 'newsweek', link: { text: '뉴스위크한국판', href: 'http://jmagazine.joins.com/newsweek', target: '_blank' } },
					{ key: 'monthlyjoongang', link: { text: '월간중앙', href: 'http://jmagazine.joins.com/monthly', target: '_blank' } },
					{ key: 'forbeskorea', link: { text: '포브스코리아', href: 'http://jmagazine.joins.com/forbes', target: '_blank' } },
					{ key: 'ceci', link: { text: '쎄씨', href: 'http://ceci.joins.com', target: '_blank' } },
					{ key: 'womanjoongang', link: { text: '여성중앙', href: 'http://woman.joins.com', target: '_blank' } },
					{ key: 'sure', link: { text: '슈어', href: 'http://sure.joins.com', target: '_blank' } },
					{ key: 'lemontree', link: { text: '레몬트리', href: 'http://lemontree.joins.com', target: '_blank' } }, //jMnet 더보기에서 제거 요청
					{ key: 'heren', link: { text: '헤렌', href: 'http://heren.joins.com', target: '_blank' } },
					{ key: 'instylekorea', link: { text: '인스타일', href: 'http://www.instylekorea.com', target: '_blank' } },
					{ key: 'cosmopolitan', link: { text: '코스모폴리탄', href: 'http://cosmopolitan.joins.com', target: '_blank' } },
					{ key: 'elle', link: { text: '엘르', href: 'http://www.elle.co.kr', target: '_blank' } },
					{ key: 'gentlemankorea', link: { text: '젠틀맨코리아', href: 'http://www.gentlemankorea.com', target: '_blank' } },//jMnet 더보기에서 제거 요청
					{ key: 'jbooks', link: { text: '문예중앙', href: 'http://jbooks.joins.com', target: '_blank' } },
					{ key: 'myjlook', link: { text: 'Jlook', href: 'http://www.myjlook.com', target: '_blank' } },
					{ key: 'joins', link: { text: 'Joins', href: 'http://www.joins.com', target: '_blank' } },
					{ key: 'mediaspider', link: { text: 'Joins Spider', href: 'http://www.mediaspider.co.kr', target: '_blank' } },
					{ key: 'ourhistory', link: { text: 'Our History', href: 'http://ourhistory.joins.com/', target: '_blank' } },
					{ key: 'chinajoins', link: { text: '중국연구소', href: 'http://china.joins.com', target: '_blank' } },
					{ key: 'nkjoins', link: { text: '북한네트', href: 'http://nk.joins.com', target: '_blank' } },
					{ key: 'koreanjoins', link: { text: '우리말', href: 'http://korean.joins.com', target: '_blank' } },
					{ key: 'joinsland', link: { text: '조인스랜드', href: 'http://www.joinsland.com', target: '_blank' } },
					{ key: 'jhealthmedia', link: { text: '헬스미디어', href: 'http://www.jhealthmedia.com', target: '_blank' } },
					{ key: 'jeconomy', link: { text: '중앙일보 경제연구소', href: 'http://jeri.joins.com', target: '_blank' } },
					{ key: 'societyenvironment', link: { text: '시민사회·환경', href: 'http://ngo.joongang.co.kr', target: '_blank' } },
					{ key: 'universityestimation', link: { text: '중앙일보 대학평가', href: 'http://univ.joongang.co.kr', target: '_blank' } },
					{ key: 'footerjoongangilbo', link: { text: '중앙일보', href: 'http://jmedianet.com/content_newspaper_01.jsp' } },
					{ key: 'customercenter', link: { text: '고객센터', href: 'http://news.joins.com/customercenter' } },
					{ key: 'onlinecustomercenter', link: { text: '온라인 고객센터', href: 'http://help.joins.com' } },
					{ key: 'joongangad', link: { text: '광고 안내', href: 'http://jad.joongang.co.kr' } },
					{ key: 'joongangbiz', link: { text: '제휴문의', href: 'mailto:digitalbiz@joongang.co.kr' } },
					{ key: 'joongangterms', link: { text: '회원약관', href: 'http://bbs.joins.com/app/myjoins_policy/163114' } },
					{ key: 'joongangpolicy', link: { text: '개인정보 취급방침', href: 'http://bbs.joins.com/app/myjoins_policy/163117' } },
					{ key: 'youthprotection', link: { text: '청소년 보호정책', href: 'http://bbs.joins.com/app/myjoins_policy/2777964' } },
					{ key: 'joongangproblem', link: { text: '고충처리', href: 'http://blog.joins.com/jombudsman/6293024' } },
					{ key: 'koreanair', link: { text: '대한항공', href: 'http://kr.koreanair.com/', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/news10/common/b_kal_v2.gif', alt: '대한항공' } },
					{ key: 'samsung', link: { text: '삼성전자', href: 'http://www.samsung.com/', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/news10/common/b_samsung_v2.gif', alt: '삼성전자' } },
					{ key: 'raemian', link: { text: '래미안', href: 'http://www.raemian.co.kr/', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/news10/common/b_raemian_v2.gif', alt: '래미안' } },
					{ key: 'login', link: { text: '로그인', href: 'https://my.joins.com/login/', cls: 'login' } },
					{ key: 'joongangmedia', link: { text: '중앙미디어네트워크', href: 'http://jmedianet.com' } },
					{ key: 'assembly', link: { text: '대한민국국회', href: 'http://www.assembly.go.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site01.jpg' } },
					{ key: 'president', link: { text: '청와대', href: 'http://www.president.go.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site02.jpg' } },
					{ key: 'mnd', link: { text: '국방부', href: 'http://www.mnd.go.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site03.jpg' } },
					{ key: 'saenuriparty', link: { text: '새누리당', href: 'http://www.saenuriparty.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site04.jpg' } },
					{ key: 'npad', link: { text: '더불어민주당', href: 'http://theminjoo.kr/', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site07.jpg' } },
					{ key: 'mofa', link: { text: '외교부', href: 'http://www.mofa.go.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site06.jpg' } },
                    { key: 'people21', link: { text: '국민의당', href: 'http://people21.kr', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joins/politics/i_politics_site08.jpg' } },
					{ key: 'facebook', link: { text: '페이스북', href: 'https://www.facebook.com/joongang', target: '_blank', cls: 'icon_facebook' } },
					{ key: 'twitter', link: { text: '트위터', href: 'https://twitter.com/joongangilbo', target: '_blank', cls: 'icon_twitter' } },
					{ key: 'googleplus', link: { text: '구글플러스', href: 'https://plus.google.com/u/0/+JoongangCoKr/posts', target: '_blank', cls: 'icon_googleplus' } },
					{ key: 'kakaostory', link: { text: '카카오스토리', href: 'https://story.kakao.com/ch/joongangilbo', target: '_blank', cls: 'icon_kakaostory' } },
					{ key: 'pinterest', link: { text: '핀터레스트', href: 'http://www.pinterest.com/joongangilbo/', target: '_blank', cls: '' } },
                    { key: 'tong', link: { text: 'TONG', href: 'http://tong.joins.com/', target: '_blank', cls: '' } },
                    { key: 'sojoong', link: { text: '소년중앙', href: 'http://sojoong.joins.com/', target: '_blank', cls: '' } },
			        { key: 'newsletter', link: { text: '뉴스레터', href: 'http://news.joins.com/newsletter', target: '_self', cls: 'icon_email' } }
					//{ key: 'time7', link: { text: '타임7', href: 'http://news.joins.com/time7', target: '_blank', cls: 'icon_email' } }
			    ]
			};
        this.getData = function (key, obj) {
            var data = {},
				rtnObj = {};

            if (key) {
                data = mapData.service.filter(function (v) {
                    return v.key == key;
                })[0];
            }
            $.extend(true, rtnObj, data, { link: obj || {} });

            return rtnObj;
        };
    };

    utils.getLinkData = function (key) {
        var rtnHtml = ""
        rtnHtml = "<a href='" + utils.linkService.getData(key).link.href + "' target='" + utils.linkService.getData(key).link.target + "'>" + utils.linkService.getData(key).link.text + "</a>";
        return rtnHtml;
    };

    utils.shareArticleForMail = function () {
        var totalId = $('#total_id').val() || '',
			url = utils.config('webPcPath') + '/article/mail/' + totalId;
        if (totalId == '') {
            return alert('처리중 오류가 발생했습니다.\n다시 시도해주세요.');
        }
        window.open(url, 'send_mail', 'directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=no,width=670,height=820');
    };

    utils.saveSearchHistory = function (keyword) {
        var limitSize = 9,
			isSaving = utils.getCookie(COOKIE_CONDITION.isSavingKeyword),
			cookieName = COOKIE_NAMES.searchKeyword;

        if (isSaving === null || isSaving === 'true') {

            var cookieData = utils.getCookie(cookieName);
            if (cookieData === null) {
                cookieData = [];
            } else {

                cookieData = cookieData.split(',');

                if (cookieData.length >= limitSize) {
                    for (var i = 0,
							len = cookieData.length - limitSize; i < len; i++) {
                        cookieData.pop();
                    }
                }
                for (var i = 0,
						len = cookieData.length; i < len; i++) {
                    if (cookieData[i] === keyword) {
                        cookieData.splice(i, 1);
                    }
                }
            }
            cookieData.splice(0, 0, keyword);
            utils.setCookie(cookieName, cookieData.toString(), 90, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
        }
    };

    utils.fnSetOpinionPlayer = function (id) {

        var device_info = "W";
        var width = 576;
        var height = 353;

        utils.log('## fnSetOpinionPlayer');
        //브라우저 체크
        if (typeof (mobile_device_detect) == "function") {
            device_info = mobile_device_detect();
        }

        if (device_info == "W") {
            var file_url = "rtmp://jcubelive.ktics.co.kr/opinionlive/_definst_/opinionlive.stream";

            if (file_url.indexOf("/_definst_/") > 0) {
                arr_file_url = file_url.split("/_definst_/");
            }
            var stream = arr_file_url[0] + "/_definst_/";
            var file = escape(arr_file_url[arr_file_url.length - 1]);

            var so = new SWFObject("http://fs.jtbc.joins.com/common/ctl/player/player.swf", 'ply', width, height, '9', '#000000');
            so.addParam('allowfullscreen', 'true');
            so.addParam('allowscriptaccess', 'always');
            so.addParam('wmode', 'transparent');
            so.addVariable('autostart', 'true');
            so.addVariable('width', width);
            so.addVariable('height', height);
            //so.addVariable('stretching', 'fill');
            so.addVariable('provider', 'rtmp'); // Protocol
            so.addVariable('streamer', file_url); // VOD URL Path
            so.addVariable('file', file); // VOD URL
            so.addVariable('image', $("div.play_on > a > img").attr("src")); // Thumbnail Image URL - VOD
            so.addVariable('skin', "http://fs.jtbc.joins.com/common/ctl/player/glow.zip");
            so.addVariable('controlbar', 'bottom');
            so.write(id);
            if (jwplayer('ply') != null) {
                jwplayer('ply').onPlay(function () {
                    $.ajax({ url: 'http://app.joins.com/news/opinioncast/set_onair_log.asp' });
                });
            }
        } else {
            var file_url = "rtmp://jcubelive.ktics.co.kr/opinionlive/_definst_/opinionlive.stream";
            var video_tag = "<a href=\"" + file_url + "\" ><img src=\"" + $("div.play_on > a > img").attr("src") + "\" width=\"" + width + "\" height=\"" + height + "\"></a>";
            $("#" + id).html(video_tag);
            $("a", $("#" + id)).click(function () {
                $.ajax({ url: 'http://app.joins.com/news/opinioncast/set_onair_log.asp' });
            });
        }
    };

    function getAttr(prop) {
        var rtn = '';

        if (prop !== undefined) {
            rtn = prop;
        }

        return rtn;
    }

    function getAttrForTarget(prop) {
        return getAttr(prop) || '_self';
    }

    function getAttrForTargetFromHref(href) {
        //utils.log('##### href' + href);
        return href.indexOf('http://') > -1 ? '_blank' : '_self';
    }

    function getDecorator(name) {

        var decorator = {
            linkEtc: function () {
                return '<a href="' + getLogParams(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + this.name + '</a>';
            },
            link: function () {
                return this.href ? '<a href="' + getAttr(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + this.name + '</a>' : '';
            },
            linkImage: function () {
                return '<a href="' + getAttr(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + decorator.image.apply(this.img) + '</a>';
            },
            image: function () {
                return '<img src="' + getAttr(this.src) + '" alt="' + getAttr(this.alt) + '">';
            },
            thumb: function () {
                var html = '';

                html += '<span class="thumb">';
                html += '	<a href="' + this.href + '">' + getDecorator('image').apply(this.img) + '</a>';
                html += '</span>';

                return html;
            }
        };

        if (decorator[name] == undefined) {
            utils.error(name + ' is not defined');
        }
        return decorator[name];
    }

    function getLogParams(href) {

        var rtn = href;

        if (href !== undefined && href.indexOf('?') !== -1) {
            rtn += '&';
        } else {
            rtn += '/?';
        }

        return rtn + 'cloc=' + domain + '|' + pageType + '|' + ''; // domain : 'joongang', pageType : home or article, position : navi1(GNB), navi2(MEGA), navi_more, navi_home, list1,
    }

    /**
	* 아티클, 외부 유입인 경우.
	*/
    function resetWidgetForExternalInfo() {

        //utils.log('## resetWidgetForExternalInfo');

        // 포탈 서비스
        // 홈 포털 검색어 편집 기사 : 추천 기사 아래 추가
        // 포토이슈 : 많이 본 기사 위로 이동
        // 내부 홍보 베너 : 댓글 많은 기사 위로 이동

        // SNS
        // SNS 기사 : 추천 기사 아래 추가
        // 포토이슈 : 많이 본 기사 위로 이동
        // 내부 홍보 베너 : 댓글 많은 기사 위로 이동
        var referrer = document.referrer;
        var PORTAL_TARGETS = ['naver.com', 'daum.net', 'www.google', 'nate.com'];
        var SNS_TARGETS = ['facebook.com', 'twitter.com', 'plus.google.com', 'pinterest.com', 'story.kakao.com'];

        var isPortal = PORTAL_TARGETS.filter(function (v) { return referrer.indexOf(v) > -1; }).length > 0 ? true : false;
        var isSns = SNS_TARGETS.filter(function (v) { return referrer.indexOf(v) > -1; }).length > 0 ? true : false;

        //isPortal = true;
        var $externalInflow = $('#externalInflow');

        var params = $.deparam(location.search.replace('?', ''));

        //utils.log('-----------------------' + location.host.indexOf('dev') != -1 && params.refer);

        if ((location.host.indexOf('dev') != -1 || location.host.indexOf('local') != -1) && params.refer) {
            if (params.refer == 'portal') {
                isPortal = true;
            } else if (params.refer == 'sns') {
                isSns = true;
            }
        }

        if (isPortal) {
            //$externalInflow.removeClass('sub_article').addClass('');
            $('#externalInflow').data('widgetType', 'PortalSearchKeyword');
            move('widget_photo_issue', 'widget_hot_articles');
            move('widget_imc_banner', 'widget_hot_articles_orderby_reply');
        } else if (isSns) {
            $('#externalInflow').data('widgetType', 'SnsArticle');
            move('widget_photo_issue', 'widget_hot_articles');
            move('widget_imc_banner', 'widget_hot_articles_orderby_reply');
        }

        function move(id, targetId) {

            var $w = $('<div></div>'),
				$e = $('#' + id);

            $w.html($e.clone());
            $e.remove();

            $('#' + targetId).before($w.html());
        }
    };

    function isExternalInflow() {

        var isExternal = document.referrer && document.referrer.indexOf(document.domain) == -1;

        return isExternal;
    }

    function isMyinfoYN() {
        var isJoongang = document.location.href.indexOf("joongang.joins.com") > 0
            || document.location.href.indexOf("news.joins.com") > 0
            || document.location.href.indexOf("www.joins.com") > 0
            || document.location.href.indexOf("jplus.joins.com") > 0
            || document.location.href.indexOf("search.joins.com") > 0
            || document.location.href.indexOf("plus.dev.joins.com") > 0;

        return isJoongang;
    }

    window.layout = new function Layout() {
        if (location.host.indexOf("dev.") > -1 || location.host.indexOf("local.") > -1) {
            $("body").append("<textarea id='txtDebug' style='width:100%;height:50px;position:fixed;bottom:0px;left:0;border:1px solid red;z-index:100;background:#fff;overflow:auto;'/></textarea>");
        }

        var _layout = this,
			gnb,
			header,
			footer,
			$gnb = $('#gnb'),
			$body = $(document.body),
			menuKey = utils.menu.getPageMenuKey(),
			arrKey = menuKey.split(','),
			lastMenuKey = arrKey[arrKey.length - 1],
			BUTTON_ATTRIBUTE = {
			    login: { 'title': '로그인', 'href': 'https://my.joins.com/login/', 'class': 'login' },
			    logout: { 'title': '로그아웃', 'href': 'https://my.joins.com/login/logout.asp', 'class': 'logout' },
			    myinfo: { 'title': '내정보', 'href': 'https://my.joins.com/', 'class': 'devmyinfo', 'target': '_blank' }
			};

        (function init() {

            _layout.gnb = new Gnb();
            _layout.header = new Header();
            _layout.megamenu = new Megamenu();
            _layout.footer = new Footer();
            _layout.wide = new Wide();
            utils.menu.init(function (_menus) {
                _layout.header.menuRender(_menus);
            });

            if (pageType == PAGE_TYPE.search) {
                $('#body').css('background', '#f8f8f8');
            }

            $('#aside').css('min-height', utils.windowSize().height);
        })();

        this.render = function () {

            var articleType = utils.config('articleType'),
				pageType = utils.config('pageType');

            if (articleType == ARTICLE_TYPE.cover) {
                $body.addClass('cover_on');
            }
            if (pageType == PAGE_TYPE.article) {
                resetWidgetForExternalInfo();
            }
            _layout.gnb.render();
            _layout.header.render();
            _layout.footer.render();

            if (arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('jplus') !== -1) { //jplus indexOf 조건에 !== -1 이 없어서 추가하였습니다.
                $.getScript('http://jplus.joins.com/Scripts/layout.js', function () {
                    // TODO : J플러스 예외처리 > wide 영역
                    var totalId = utils.getTotalId();
                    jplus.layout.wide.renderHtml(totalId);
                });
            } else {
                _layout.wide.render();
            }

        };

        this.logout = function () {
            setLoginLayout();
        };

        this.login = function () {
            setLogoutLayout();
        };

        function setLoginLayout() {
            var $btn = $gnb.find('.member a'),
				attr = BUTTON_ATTRIBUTE.login;

            $btn.attr(attr).text(attr.title);

            $(".myinfo").hide();
        }

        function setLogoutLayout() {
            var $btn = $gnb.find('.member a'),
				attr = BUTTON_ATTRIBUTE.logout;

            $btn.attr(attr).text(attr.title);

            if (!isMyinfoYN()) {
                var $btn2 = $gnb.find('.myinfo a'),
		        attr2 = BUTTON_ATTRIBUTE.myinfo;
                $btn2.attr(attr2).text(attr2.title);

                $(".myinfo").show();
            }
            else $(".myinfo").hide();
        }

        function Gnb() {

            var _gnb = this,
				gnbStyle = 'general', // general, gray, black
				data = {
				    slogo: utils.linkService.getData('joins', { html: '<em>Joins</em>' }),
				    family_site: [
						utils.linkService.getData('joongangilbo', { html: '<em>중앙일보</em>', pCls: 'joongangilbo' }),
						utils.linkService.getData('joongangsunday', { html: '<em>중앙<strong>SUNDAY</strong></em>', pCls: '' }),
						utils.linkService.getData('jtbc', { html: '<em>JTBC</em>', pCls: 'jtbc' }),
						utils.linkService.getData('ilgansports', { html: '<em>일간스포츠</em>', pCls: 'isplus' }),
						utils.linkService.getData('koreajoongangdaily', { html: '<em><strong>Korea JoongAng Daily</strong></em>', pCls: '' }),
						{ link: { pCls: 'jmnet', html: '<em>JMnet <span>더보기</span></em>', href: '#jmnet_more', cls: 'jmnet_more', title: 'JMnet 더보기 레이어 열기' } }
				    ],
				    login: utils.linkService.getData('login')
				},
				layerJmnet = {
				    data: [
						{
						    cls: 'area1',
						    cols: [
								{ cls: 'a', title: '신문', list: [utils.linkService.getData('joongangilbo'), utils.linkService.getData('joongangsunday'), utils.linkService.getData('ilgansports'), utils.linkService.getData('koreajoongangdaily'), utils.linkService.getData('koreadaily')] },
								{ cls: 'b', title: '방송', list: [utils.linkService.getData('jtbc'), utils.linkService.getData('jtbc2'), utils.linkService.getData('jtbcgolf'), utils.linkService.getData('jtbc3foxsports')] }
						    ]
						},
						{
						    cls: 'area2',
						    cols: [
								{ cls: '', title: '매거진', list: [utils.linkService.getData('economist'), utils.linkService.getData('newsweek'), utils.linkService.getData('monthlyjoongang'), utils.linkService.getData('forbeskorea'), utils.linkService.getData('ceci')] },
								{ cls: 'c x', title: '', list: [utils.linkService.getData('womanjoongang'), utils.linkService.getData('sure'), utils.linkService.getData('heren'), utils.linkService.getData('instylekorea')] },
								{ cls: 'c', title: '', list: [utils.linkService.getData('cosmopolitan'), utils.linkService.getData('elle'), utils.linkService.getData('jbooks'), utils.linkService.getData('myjlook')] }
						    ]
						},
						{
						    cls: 'area3',
						    cols: [
								{ cls: 'd', title: '인터넷', list: [utils.linkService.getData('joins'), utils.linkService.getData('mediaspider'), utils.linkService.getData('ourhistory'), utils.linkService.getData('tong'), utils.linkService.getData('sojoong')] },
								{ cls: 'd', title: '전문 콘텐트', list: [utils.linkService.getData('jbooks'), utils.linkService.getData('chinajoins'), utils.linkService.getData('koreanjoins'), utils.linkService.getData('joinsland'), utils.linkService.getData('jhealthmedia')] }
						    ]
						}
				    ],
				    temp: '<div class="layer_jmnet" style="display:none;" data-bind="groups">' +
						'<ul data-bind="cols">' +
						'<li data-bind="listinfo">' +
						'<span></span>' + // TODO : 이거 처리 방법..흠.
						'<dl data-bind="list">' +
						//'<dt>매거진</dt>' +
						'<dd><a href="#" data-bind="link"></a></dd>' +
						'</dl>' +
						'</li>' +
						'</ul>' +
						'</div>',
				    directives: {
				        groups: {
				            cols: {
				                'class': function () {
				                    return this.cls;
				                },
				                list: { link: utils.decorators.link },
				                listinfo: {
				                    'class': function () {
				                        return this.cls;
				                    },
				                    html: function (params) {

				                        var html = '';
				                        if (this && this.title) {
				                            html = '<dt class="mg"><a href="#none">' + this.title + '</a></dt>';
				                        } else {
				                            html = '<dt></dt>';
				                        }
				                        $(params.element).find('span').prepend(html);
				                    }
				                }
				            }
				        }
				    }
				},
				directives = {
				    slogo: { link: utils.decorators.link },
				    family_site: {
				        item: {
				            pCls: function (params) {
				                if (this.link.pCls) {
				                    ele = params.element;
				                    $(ele).addClass(this.link.pCls);
				                }
				            }
				        },
				        link: utils.decorators.link
				    },
				    login: { link: utils.decorators.link }
				};

            this.render = function (targetId) {

                var html = '',
					jmnetHtml = '',
					$jmnetLayer = $('#layer_jmnet');

                targetId = targetId || 'gnb';

                if (gnbStyle == 'black' || utils.config('articleType') == ARTICLE_TYPE.cover) {
                    html += '<span class="back_mask"></span>';
                }
                html += '<div class="doc">';
                html += '   <strong class="slogo" ><a href="#" data-bind="link"><em>Joins</em></a></strong>';
                html += '   <div class="gnb_doc">';
                html += '	   <h2 class="hidden">패밀리 사이트</h2>';
                html += '	   <ul class="family_site">';
                html += '		   <li data-bind="item"><a href="#" data-bind="link"></a></li>';
                html += '	   </ul>';
                html += '	   <h2 class="hidden">로그인</h2>';
                html += '	   <ul class="member">';
                html += '		   <li class="login"> <a href="#" data-bind="link"></a> </li>';
                html += '	   </ul>';
                html += '	   <h2 class="hidden">내정보</h2>';
                html += '	   <ul class="myinfo" style="display:none;">';
                html += '		   <li class="devmyinfo"> <a href="#" data-bind="link"></a> </li>';
                html += '	   </ul>';
                html += '   </div>';
                html += '</div>';

                //utils.log('## layerJmnet.data');
                //utils.log(layerJmnet.data);

                jmnetHtml += "<div id='layer_jmnet' style='display:none;' class='layer_jmnet'>";
                jmnetHtml += "<span class='mask'></span><span class='shadow_btm'></span><span class='shadow_md'></span><span class='shadow_rt'></span>";
                jmnetHtml += "<ul class='area1'>";
                jmnetHtml += "<li class='a'>";
                jmnetHtml += "<dl>";
                jmnetHtml += "<dt>신문</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("joongangilbo") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("joongangsunday") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("ilgansports") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreajoongangdaily") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreadaily") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='b'>";
                jmnetHtml += "<dl>";
                jmnetHtml += "<dt>방송</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc2") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbcgolf") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jtbc3foxsports") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";
                jmnetHtml += "<ul class='area2'>";
                jmnetHtml += "<li class=''>";
                jmnetHtml += "<dl> <dt>매거진</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("economist") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("newsweek") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("monthlyjoongang") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("forbeskorea") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='c x'>";
                jmnetHtml += "<dl> <dt></dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("womanjoongang") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("sure") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("heren") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("instylekorea") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='c'>";
                jmnetHtml += "<dl> <dt></dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("cosmopolitan") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("elle") + "</dd>";
                //jmnetHtml += "<dd>" + utils.getLinkData("jbooks") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("myjlook") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("ceci") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";
                jmnetHtml += "<ul class='area3'>";
                jmnetHtml += "<li class='d'>";
                jmnetHtml += "<dl> <dt>인터넷</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("joins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("mediaspider") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("ourhistory") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("tong") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("sojoong") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "<li class='d'>";
                jmnetHtml += "<dl> <dt>전문 콘텐트</dt>";
                jmnetHtml += "<dd>" + utils.getLinkData("jbooks") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("chinajoins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("koreanjoins") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("joinsland") + "</dd>";
                jmnetHtml += "<dd>" + utils.getLinkData("jhealthmedia") + "</dd>";
                jmnetHtml += "</dl>";
                jmnetHtml += "</li>";
                jmnetHtml += "</ul>";
                jmnetHtml += "</div>";

                //jmnetHtml = $.renderTemplate({
                //	template: layerJmnet.temp,
                //	data: {groups: layerJmnet.data},
                //	directives: layerJmnet.directives
                //});

                //utils.log(data);

                $gnb = $('#' + targetId);

                //utils.log('################');
                //utils.log($gnb);

                $gnb.html(html).render(data, directives);
                $gnb.find('.gnb_doc').append(jmnetHtml);
                //.find('.layer_jmnet').prepend('<span class="mask"></span><span class="shadow_btm"></span><span class="shadow_md"></span><span class="shadow_rt"></span>')
                $gnb.on('click', 'a.jmnet_more', function () {

                    var $jmnetLayer = $('.layer_jmnet', $gnb),
						$parent = $(this).parent();

                    if ($jmnetLayer.css('display') == 'none') {
                        $jmnetLayer.fadeIn(200);
                    } else {
                        $jmnetLayer.hide();
                    }

                    $parent.toggleClass('jmnet_open');

                    return false;
                });

                if (utils.config(CONFIG_NAMES.isLogin)) {
                    setLogoutLayout();
                }

                function closeJmnet() {
                    $('.layer_jmnet', $gnb).hide();
                }

                $(document.body).on('click', function (e) {

                    var $target = $(utils.getElementFromEvent(e));

                    if ($target.closest('.layer_jmnet').length === 0) {
                        closeJmnet();
                    }
                });

                //remove jmnet title
                $('.layer_jmnet').find('li[data-bind="listinfo"]').each(function () {
                    var $dt = $(this).find('>span dt'),
						$target = $(this).find('dl').prepend($dt);

                    $(this).find('>span').remove();
                });
            };

            this.renderHtml = function (styleType) {

                gnbStyle = styleType || 'general'; // general, gray, black
                var gnbId = 'gnb',
					cssHref = window.GNB_STYLES[gnbStyle];

                if (!cssHref) {
                    gnbStyle = 'general';
                    cssHref = window.GNB_STYLES.general;
                }
                utils.loadStyle(cssHref, function () {
                    document.write('<div id="' + gnbId + '" class="joins_gnb gnb_joins_service"></div>');
                    _gnb.render(gnbId);
                });
            };
        };

        function Header() {

            var _header = this,
				$head = $('#head'),
				$keyword = $('#search_keyword'),
				searchKeyword = $('#Keyword').val() || '',
				data = {
				    sns: [
						utils.linkService.getData('facebook', { cls: 'facebook', service: 'facebook' }),
						utils.linkService.getData('twitter', { cls: 'twitter', service: 'twitter' }),
						//utils.linkService.getData('googleplus', { cls: 'googleplus', service: 'googleplus' }),
						utils.linkService.getData('kakaostory', { cls: 'kakaostory', service: 'kakaostory' })
				    ],
				    languageSite: [utils.linkService.getData('jp', { pCls: 'jp' }), utils.linkService.getData('cn', { pCls: 'cn' }), utils.linkService.getData('en', { pCls: 'en' })],
				    headTitle: $('#article_title').text()
				},
				directives = {
				    services: { item: { html: getDecorator('link') } },
				    languageSite: {
				        link: utils.decorators.link,
				        pCls: {
				            'class': function (params) {
				                return this.link.pCls;
				            }
				        }
				    },
				    sns: {
				        link: utils.decorators.link,
				        service: {
				            text: function (params) {
				                $(params.element).find('a').data('service', this.link.service);
				            }
				        }
				    }
				},
				pageType = utils.config('pageType'),
				configMenus = utils.config('menus'),
				slideOptions = { direction: 'right' },
				slideDuration = 300;

            if (pageType == PAGE_TYPE.article) {
                data.sns.push({ key: 'email', link: { text: '이메일', cls: 'email' } });
            }

            /*if (pageType == PAGE_TYPE.index) {
                var options = utils.linkService.getData('time7');
                options.link.cls = 'email';
                data.sns.push(options);
            }*/

            // 메뉴 Data 에 기반하는 영역 Rendering.
            this.menuRender = function (_menus) {

                // menuKey reset;;
                menuKey = utils.menu.getPageMenuKey();
                arrKey = menuKey.split(',');
                lastMenuKey = arrKey[arrKey.length - 1];

                var menu = null,
					menuData = { title: {}, list: [] },
					template = '',
					menuHtml = '',
					directives = {
					    title: { link: utils.decorators.menuLink },
					    list: {
					        link: utils.decorators.menuLink,
					        on: {
					            'class': function () {
					                return this.active && this.active.cls;
					            }
					        }
					    },
					    newsGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon },
					    sectionGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon },
					    etcGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon }
					};

                //utils.log('## menuRender');
                //utils.log('menuKey : ' + menuKey);
                //utils.log('lastMenuKey : ' + lastMenuKey);

                // 상단 메뉴 template, data 셋팅
                if (pageType == PAGE_TYPE.index) {
                    menu = _menus.getMenuFromKey('NewsGroup');
                    template = '' +
					'<ul class="gnb_news mg" data-bind="newsGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>' +
					'<ul class="gnb_section mg" data-bind="sectionGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>' +
					'<ul class="gnb_etc mg" data-bind="etcGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>';

                    menuData = {
                        newsGroup: [],
                        sectionGroup: [],
                        etcGroup: []
                    };

                    menu.Children.forEach(function (v) {
                        if (v.IsShowTopMenu) {
                            menuData.newsGroup.push(utils.models.getLinkFromMenu(v));
                        }
                    });

                    menuData.sectionGroup = [
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('sectiongroup,JPlus')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Travel')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Gangnam')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Tong')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Retirement'))
                    ];

                    menuData.etcGroup = [
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('JoongangMemberShip')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('TypeSetting'))
                    ];

                    // DESC : new 아이콘 셋팅
                    // TODO : 키값만 전달하는 방식이 좋겠다.
                    //menuData.sectionGroup[4].icon = { newIcon: true };

                } else {

                    if (configMenus != '') {
                        menu = configMenus;
                    } else {
                        menu = _menus.getMenuFromKey(menuKey);
                    }

                    if (menu == null || menu == '') {
                        return;
                    }

                    if (menu.Parent && menu.Parent.IsShowTopMenu && menu.Parent.Key) {
                        menu = menu.Parent;
                    }

                    if (pageType == PAGE_TYPE.search) {
                        template += '<ul class="mg" data-bind="list">' +
							'<li data-bind="on"><a data-bind="link"></a></li>' +
							'</ul>';
                    } else if (lastMenuKey == "Issue" || lastMenuKey == "Reporter" || lastMenuKey == 'CommentList' || lastMenuKey == 'Jtbc') { // 시세, 이한마디, 타임7
                        if (lastMenuKey == "Issue" || lastMenuKey == "Reporter") {
                            template = '<h2 class="mg" data-bind="title"><a data-bind="link"></a></h2>';

                            if ($("input#reporterType").length > 0) {
                                menuData.title = {
                                    link: {
                                        href: (menu.Url ? menu.Url.Path : ''),
                                        text: ($("input#reporterType").val().toLowerCase() == "jplus" ? "" : menu.Display)
                                    }
                                };
                            }
                            else {
                                menuData.title = {
                                    link: {
                                        href: (menu.Url ? menu.Url.Path : ''),
                                        text: (menu.Display)
                                    }
                                };
                            }
                        } else {
                            template = '<h2 class="mg" data-bind="title"></h2>';
                            menuData.title = menu.Display;
                        }
                    } else {
                        template = '<h2 class="mg" data-bind="title"><a data-bind="link"></a></h2>';
                        if (menu.Children.length) {
                            template += '' +
							'<ul class="mg" data-bind="list">' +
								'<li data-bind="on"><a data-bind="link"></a></li>' +
							'</ul>';
                        }
                        menuData.title = { link: { href: (menu.Url ? menu.Url.Path : ''), text: menu.Display } };
                    }

                    lastMenuKey = lastMenuKey == 'Find' ? 'All' : lastMenuKey;
                    menuData.list.length = 0;
                    menu.Children.forEach(function (v) {

                        var link = v.Url && v.Url.Path;

                        if (pageType == PAGE_TYPE.search) {
                            link = link.indexOf('{KEYWORD}') > -1 ? link.replace('{KEYWORD}', searchKeyword) : link + '?keyword=' + searchKeyword;
                        }

                        if (configMenus == '') {
                            if (v.IsShowTopMenu) {
                                menuData.list.push({ link: { text: v.Display, href: link, key: v.Key }, active: { cls: (lastMenuKey.toLowerCase() == v.Key.toLowerCase() ? 'on' : '') } });
                            }
                        } else {
                            menuData.list.push({ link: { text: v.Display, href: link, key: v.Key }, active: { cls: (lastMenuKey.toLowerCase() == v.Key.toLowerCase() ? 'on' : '') } });
                        }
                    });

                    if (pageType == PAGE_TYPE.search) {
                        menuData.list[4].link = { html: menuData.list[4].link.text + ' <em>지면</em>', href: menuData.list[4].link.href };
                        menuData.list[4].link.text = '';
                    }

                }

                //utils.log('## gnb menuData');
                //utils.log(menuData);
                //utils.log(directives);
                //utils.log(template);

                menuHtml = $.renderTemplate({ data: menuData, template: template, directives: directives });

                //utils.log(menuHtml);

                renderMenu(menuHtml);

                function renderMenu(menuHtml) {
                    var $gnbMenu = $('#gnb_menu'),
						pathname = location.pathname.toLowerCase();

                    if ($gnbMenu.length > 0 && $gnbMenu.data('render') != true) {
                        $gnbMenu.append(menuHtml);
                        $gnbMenu.data('render', true);
                    } else {
                        setTimeout(function () {
                            renderMenu(menuHtml);
                        }, 250);
                    }

                    // 섹션명 Cloc
                    $gnbMenu.find('h2.mg a').each(function () {
                        if (pathname.indexOf('article') > -1) {
                            $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|sectiontitle'));
                        } else {
                            $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|section|sectiontitle'));
                        }
                    });

                    // 2depth Cloc
                    $gnbMenu.find('ul.mg a').each(function (i) {
                        var $a = $(this),
							attr = $a.attr('href');

                        if (pageType == PAGE_TYPE.index) {

                            var $menuGroup = $a.closest('ul'),
								groupType = $menuGroup.data('bind'),
								menuNumber = $menuGroup.find('a').index($a) + 1;

                            if (groupType === 'newsGroup') {
                                $a.attr('href', utils.getClocUrl(attr, 'joongang|home|section' + menuNumber));
                            } else if (groupType === 'sectionGroup') {
                                $a.attr('href', utils.getClocUrl(attr, 'joongang|home|subsection' + menuNumber));
                            } else {
                                $a.attr('href', utils.getClocUrl(attr, 'joongang|home|service' + menuNumber));
                            }

                            //$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|section|subsection'));
                        } else {
                            if (pathname.indexOf('article') > -1) {
                                $a.attr('href', utils.getClocUrl(attr, 'joongang|article|subsection'));
                            } else {
                                $a.attr('href', utils.getClocUrl(attr, 'joongang|section|subsection'));
                            }
                        }
                    });
                }
            };

            this.renderHtml = function () {
                document.write('<div id="head"></div>');
                _header.render();
            };

            // Header 기본 Rendering
            this.render = function (targetId) {
                var html = '',
					nowDate = new Date().format('yyyy.MM.dd (e)'),
					searchHtml = '',
					weatherHtml = '',
					snsHtml = '',
					btnOpenHtml = '<button type="button" class="btn_open_aside" id="btnOpenAside" style="display:none;">열기</button>',
					pageType = utils.config('pageType'),
					headStyle = '';

                searchHtml += '<div class="search" id="searchArea">';
                searchHtml += '<fieldset>';
                searchHtml += '   <legend class="hide">검색</legend>';
                searchHtml += '   <label for="search_word" style="visibility:visible;">뉴스검색</label><!-- visibility: visible / hidden ; -->';
                searchHtml += '   <input type="text" id="searchKeyword" class="txt" value="' + searchKeyword + '">';
                searchHtml += '   <button type="button" id="btnSearch" class="btn">검색</button>';
                searchHtml += '</fieldset>';
                searchHtml += '</div>';

                /*weatherHtml += '<div class="weather_wrap" id="weather">' +
					'<div class="date"><strong class="mg">' + nowDate + '</strong></div>' +
					'<div class="weather">' +
					'<a data-bind="link" class="disable"><strong class="mg" data-bind="text"></strong><img data-bind="image"></a>' +
					'</div>' +
					'</div>';*/
				weatherHtml += '<div class="weather_wrap_v2" id="weather">' +
					'<a data-bind="link" class="disable">' +
					'<span class="date"><strong class="mg">' + nowDate + '</strong></span>' +
					'<span class="weather">' +
					'<strong class="mg" data-bind="regionNm"></strong> <strong class="mg" data-bind="curTemp"></strong>' +
					'<img data-bind="image" />' +
					'<span class="air"><em>미세먼지</em> <em data-bind="airGrade" class="good"></em></span>' +
					'</span>' +
					'</a>' +
					'</div>';

                snsHtml += '<div class="sns_wrap">' +
					'<ul class="sns clearfx" data-bind="sns">' +
					'<li data-bind="service"><a href="#" data-bind="link" target="_blank"></a></li>' +
					'</ul>' +
					'<div class="btn_search">' +
					'<a href="#none" id="btnOpenSearch">검색</a><span class="icon"></span>' +
					'</div>' +
					'</div>';

                if (pageType == PAGE_TYPE.index) {

                    var indexLogoHtml = $head.find('.head_top').html();
                    html += '<div class="head_top">' +
						'<div class="homepage_wrap">' +
						'<div class="homepage" style="display:none;">' +
						'<button type="button" id="btnStartPage">중앙일보를 시작페이지로</button>' +
						'</div>' +
						'<div class="language">' +
						'<ul class="clearfx" data-bind="languageSite">' +
						'<li data-bind="pCls"><a href="#" data-bind="link"></a></li>' +
						'</ul>' +
						'</div>' +
						'</div>';

                    if (indexLogoHtml) {
                        html += indexLogoHtml;
                    } else {
                        html += '<div class="logo_wrap"><div class="logo"><h1 class="mg"><a href="http://joongang.joins.com">중앙일보</a></h1></div></div>';
                    }

                    html += '<div class="gnb" id="gnb_menu"></div>';
                    html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu"><span class="icon"></span><strong class="mg">전체</strong></a></div>';
                    html += snsHtml;
                    html += searchHtml;
                    html += weatherHtml;
                    html += '<div class="event_banner_wrap" id="eventBanner"></div>';
                    html += btnOpenHtml;
                    html += '</div>';

                } else if (pageType == PAGE_TYPE.search) {
                    html += '<div class="head_search">';
                    html += '<div class="search_wrap">';
                    html += '   <div class="logo"><h1 class="mg"><a href="http://joongang.joins.com">중앙일보</a></h1></div>';
                    html += searchHtml;
                    html += '</div>';
                    html += '<div class="gnb_wrap">';
                    html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu" class="mg"><span class="icon"></span>전체메뉴</a></div>';
                    html += '<div class="gnb" id="gnb_menu">';
                    //html += '	<h2 class="hide">검색</h2>';
                    html += '</div>';
                    html += '</div>';
                    html += btnOpenHtml;
                    html += '</div>';
                } else if (lastMenuKey == "Issue" || lastMenuKey == "Reporter") {

                    html += '<div class="head_top">';
                    html += '<div class="logo"><h2 class="mg"><a href="http://joongang.joins.com">중앙일보</a></h2></div>';
                    html += '<div class="gnb" id="gnb_menu"></div>';
                    html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu">전체보기</a></div>';
                    html += snsHtml;
                    html += searchHtml;
                    html += '<div class="title"><p class="mg" id="head_title">' + data.headTitle + '</p></div>';
                    html += btnOpenHtml;
                    html += '</div>';
                } else {
                    html += '<div class="head_top">';
                    html += '<div class="logo"><h2 class="mg"><a href="http://joongang.joins.com">중앙일보</a></h2></div>';
                    html += '<div class="gnb" id="gnb_menu"></div>';
                    html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu">전체보기</a></div>';
                    html += snsHtml;
                    html += searchHtml;
                    html += '<div class="title"><p class="mg" id="head_title">' + data.headTitle + '</p></div>';
                    html += btnOpenHtml;
                    html += '</div>';

                }

                $head = targetId ? $('#' + targetId) : $('#head');
                $head.html(html).render(data, directives);

                $('#btnOpenMegamenu').on('click', layout.megamenu.openHandler);

                var isLoginContents = utils.getIsLoginContents();

                $('.sns_wrap a.email', $head).on('click', function () {
                    if (isLoginContents && !userInfo.isLogin()) {
                        alert('로그인을 해야 이용하실 수 있습니다.');
                        return false;
                    }
                    if (pageType !== PAGE_TYPE.index) {
                        utils.shareArticleForMail();
                        return false;
                    }
                });

                if (utils.browser.msie) {
                    var $btnStartPage = $('#btnStartPage', $head);
                    $btnStartPage.parent().show();
                    $btnStartPage.on('click', function () {
                        utils.setStartPage();
                    });
                }

                if (pageType == PAGE_TYPE.index) {
                    //utils.log('## weather_data');
                    setHeaderWeather();
                }
                if (pageType == PAGE_TYPE.search) {
                    $('#searchKeyword').addClass('mg');
                }

                setSearchForm();

                function setHeaderWeather() {
                    var weatherUrl = 'http://static.joins.com/common/data/weather/today_weather_list.js';
                    //var weatherUrl = 'http://static.joins.com/common/data/weather/top_weather.js';

                    var propertyName = 'TODAY_WEATHER_LIST';
                    //var propertyName = 'weather_data';

                    $.getScript(weatherUrl, function () {

                        if (window[propertyName]) {
                            renderWeather();
                        } else {
                            //setTiemout(setHeaderWeather, 4000);
                        }
                    });

                    function renderWeather() {
                        var $weather = $('#weather'),
							index = $weather.data('index') || 0,
							originData = window[propertyName] || {},
							data = { link: { href: 'http://weather.joins.com/', title: '날씨로 이동' }, image: {}, regionNm: {}, curTemp: {}, airGrade: {} },
							directives = {
								link: utils.decorators.link,
								image: utils.decorators.image,
								regionNm: {
									text: function () {
										return this.regionNm.text;
									}
								},
								curTemp: {
									text: function () {
										return this.curTemp.text;
									}
								},
								airGrade: {
									text: function () {
										return this.airGrade.text;
									},
									"class": function () {
										return this.airGrade.classNm;
									}
								}
							};
                        try {
							data.regionNm = {
								text: originData.DATA[index].REGION_NM
							};
							data.curTemp = {
								text: originData.DATA[index].CUR_TEMP + '℃'
							};
							data.airGrade = {
								text: originData.DATA[index].PM10_GRADE,
								classNm: originData.DATA[index].PM10_GRADE == "나쁨" ? "bad" : "good"
							};
							data.image = {
								src: originData.DATA[index].WEATHER_ICON_URL,
								alt: originData.DATA[index].WEATHER_STS
							};
                        }
						catch (e) { };
                        $weather.render(data, directives);
                        index = (originData.DATA.length - 1 == index ? 0 : index + 1);
                        $weather.data('index', index);
                        setTimeout(renderWeather, 2000);
                    }
                }

                function setSearchForm() {

                    var $aside = $('#aside'),
						$btnOpenSearch = $('#btnOpenSearch', $head),
						$btnSearch = $('#btnSearch', $head),
						$searchKeyword = $('#searchKeyword', $head),
						$searchArea = $('#searchArea', $head),
						$snsArea = $('.sns_wrap', $head);

                    $btnOpenSearch.on('click', function () {
                        showSearch();
                        $searchKeyword.focus();
                        return false;
                    });

                    $searchKeyword.searchAutoComplete && $searchKeyword.searchAutoComplete();

                    if (pageType == PAGE_TYPE.search) {
                        $searchKeyword.prev().addClass('hide');
                    }

                    if (pageType == PAGE_TYPE.article || pageType == PAGE_TYPE.search) {

                        $searchArea.show();
                        $snsArea.hide();

                    } else {

                        if ($aside.css('display') == 'block') {
                            $searchArea.show();
                            $snsArea.hide();
                        } else {
                            $searchArea.hide();
                            $snsArea.show();
                        }
                    }

                    $btnSearch.on('click', function () {
                        var keyword = $searchKeyword.val();
                        search(keyword);
                        return false;
                    });

                    $searchKeyword.on('keyup', function (e) {

                        //utils.log('$searchKeyword : key');
                        var keyword = $searchKeyword.val() || '',
							keyCode = utils.getKeyCode(e);

                        if (pageType != PAGE_TYPE.search) {
                            if (keyword.isEmpty()) {
                                $searchKeyword.prev().show();
                            } else {
                                $searchKeyword.prev().hide();
                            }
                        }

                        if (keyCode == 13) {
                            $btnSearch.click();
                        }
                    });

                    function search(keyword) {
                        if (keyword.isEmpty()) {
                            return alert('검색어를 입력해주세요.');
                        }

                        utils.saveSearchHistory(keyword);

                        var parameter = $.deparam(location.search.replace('?', '')),
							pathName = location.pathname.toLowerCase(),
							searchUrl = utils.config('searchWebPath');
                        //searchUrl = utils.getUrlFormat(URL_NAMES.search, keyword);

                        if (utils.config('searchWebPath').indexOf(location.host) != -1) {
                            searchUrl = utils.config('searchWebPath') + pathName + '?keyword=' + encodeURIComponent(keyword); //아티클 내에서 검색 시 오류가있어서 수정하였습니다.
                        } else {
                            searchUrl = utils.config('searchWebPath') + '/?keyword=' + encodeURIComponent(keyword); //아티클 내에서 검색 시 오류가있어서 수정하였습니다.
                        }

                        utils.log(location.origin);

                        if (typeof parameter['SearchCategoryType'] != 'undefined') {
                            searchUrl += '&searchcategorytype=' + parameter['SearchCategoryType'];
                        }

                        location.href = searchUrl;
                        //return false;
                    }
                }
            };

            this.bindCloseSearchArea = function () {
                //utils.log('## bindCloseSearchArea');
                $(document.body).on('click', closeSearchAreaHandler);
            };

            this.unbindCloseSearchArea = function () {
                //utils.log('## unbindCloseSearchArea');
                $(document.body).off('click', closeSearchAreaHandler);
            };

            this.showSnsArea = function (isSticky) {
                hideSearch(true);
            };

            this.showSearchArea = function () {
                showSearch(true);
            };

            function showSearch(noSlide) {
                var $searchArea = $('#searchArea', $head),
					$snsArea = $('.sns_wrap', $head);

                if (utils.browser.msie || noSlide) {
                    $searchArea.show();
                    $snsArea.hide();
                } else {
                    $searchArea.show();
                    $snsArea.hide();
                    //$searchArea.show('slide', slideOptions, slideDuration);
                    //$snsArea.hide('slide', slideOptions, slideDuration);
                }
            }

            function hideSearch(noSlide) {
                var $searchArea = $('#searchArea', $head),
					$snsArea = $('.sns_wrap', $head);

                if (utils.browser.msie || noSlide) {
                    $searchArea.hide();
                    $snsArea.show();
                } else {
                    $searchArea.hide();
                    $snsArea.show();
                    //$searchArea.hide('slide', slideOptions, slideDuration);
                    //$snsArea.show('slide', slideOptions, slideDuration);
                }
            }

            function closeSearchAreaHandler(e) {
                var ele = utils.getElementFromEvent(e),
					$target = $(ele),
					$searchArea = $('#searchArea', $head);

                if (ele.tagName == 'A' || ele.tagName == 'BUTTON') {
                } else {
                    if ($target.closest($searchArea).length === 0 && $searchArea.css('display') != 'none') {
                        hideSearch();
                    }
                }
            }
        };

        /**
		 *
		 */
        function Megamenu() {

            var $head = $('#head'),
				$megamenu = $('#nav'),
				$cover = null,
				html = '' +
				'<div class="menu_wrap" style="">' +
					'<div class="full_menu mg" style="">' +
						'<h3 class="hide">전체 메뉴</h3>' +
						'<ul class="menu_news" data-bind="NewsGroup"><li data-bind="item" data-parent-key="NewsGroup"></li></ul>' +
						'<ul class="menu_section" data-bind="SectionGroup"><li data-bind="item" data-parent-key="SectionGroup"></li></ul>' +
						'<ul class="menu_service" data-bind="ServiceGroup"><li data-bind="item" data-parent-key="ServiceGroup"></li></ul>' +
						'<ul class="menu_service" data-bind="MoreGroup" style="display:none;"><li data-bind="moreItem" data-parent-key="MoreGroup"></li></ul>' +
						'<div class="cover" style="display:none;"></div>' +
						'<button type="button" class="btn_close_nav" id="btnCloseMegamenu">닫기</button>' +
					'</div>' +
				'</div>',
				directives = {
				    moreItem: {
				        html: function () {

				            var html = '',
								parentKey = this.Parent ? this.Parent.Key : '';

				            html += '<a href="#" class="disable">More</a>';
				            html += '<div class="sub">';

				            this.Children.forEach(function (v) {
				                html += '<ul>';
				                v.Children.forEach(function (v) {
				                    if (v.IsShowMegaMenu) {
				                        html += getListItem(v);
				                    }
				                });
				                html += '</ul>';
				            });
				            html += '<ul>';

				            return html;
				        }
				    },
				    item: {
				        'data-key': function () {
				            return this.Key;
				        },
				        html: function () {
				            var html = '',
								parentKey = this.Parent ? this.Parent.Key : '';

				            if (this.Url) {
				                html += '<a href="' + (this.Url.Path) + '" ' + utils.getTargetFilter(this.Url.Path) + '>' + this.Display + '</a>';
				            } else {
				                html += '<a href="#" class="disable">' + this.Display + '</a>';
				            }

				            if (this.Children.length) {
				                html += '<ul class="sub">';
				                this.Children.forEach(function (v) {
				                    if (v.IsShowMegaMenu) {
				                        html += getListItem(v);
				                    }
				                });
				                html += '</ul>';
				            }

				            return html;
				        }
				    }
				},
				megaData = {},
				self = this,
				$menuWrap = null,
				timer = null,
				minMenuHeight = 600,
                moreBtnHeight = 60,
				defaultMenuHeight = windowSize.height < minMenuHeight ? minMenuHeight : windowSize.height - moreBtnHeight;

            function getListItem(v) {
                return v.IsShowMegaMenu ? '<li><a href="' + (v.Url.Path) + '" ' + utils.getTargetFilter(v.Url.Path) + '>' + v.Display + '</a></li>' : '';
            }

            (function init() {

                if ($megamenu.length == 0) {
                    $megamenu = $('<div id="nav"></div>');
                }

                var $btn = $('#btnOpenMegamenu');
                $btn.on('click', self.open);

                $megamenu.on('click', '#btnCloseMegamenu', closeHandler);

            })();

            this.openHandler = function () {

                if ($head.length == 0) {
                    $head = $('#head');
                    $head.after($megamenu);
                }

                if ($megamenu.children().length == 0) {
                    initData(self.render);
                } else {
                    setMegamenuHeight();
                    $megamenu.show('fast');
                }
                return false;
            };

            this.render = function (targetId) {

                //utils.log('megamenu render');
                //utils.log(megaData);
                var menuHeight = 0,
					pathname = location.pathname.toLowerCase(),
					newsClocName = '',
					news2DepthClocName = '',
					sectionClocName = '',
					section2DepthClocName = '',
					serviceClocName = '',
					service2DepthClocName = '';

                $megamenu.show('fast').html(html);
                renderGroup('ul[data-bind="NewsGroup"]', 'NewsGroup');
                renderGroup('ul[data-bind="SectionGroup"]', 'SectionGroup');
                renderGroup('ul[data-bind="ServiceGroup"]', 'ServiceGroup');
                renderGroup('ul[data-bind="MoreGroup"]', 'MoreGroup');

                function renderGroup(selector, name) {

                    var length = megaData[name].length;

                    if (selector == 'ul[data-bind="MoreGroup"]') {
                        length = megaData[name][0].Children.length;
                    }
                    //utils.log('## renderGroup : ' +selector);
                    //utils.log(megaData[name]);
                    //utils.log('length : ' +length);

                    if (length == 0) {
                        $megamenu.find(selector).hide();
                    } else {
                        $megamenu.find(selector).show();
                        $megamenu.find(selector).render(megaData[name], directives);
                    }
                }

                menuHeight = $megamenu.find('.full_menu').height();

                //utils.log('$megamenu.data(rerender) : ' + $megamenu.data('rerender'));
                //utils.log('menuHeight : ' + menuHeight);
                //utils.log($('.full_menu').height());
                //utils.log('defaultMenuHeight  : ' + (defaultMenuHeight));

                $cover = $megamenu.find('.cover');
                if (!$megamenu.data('rerender') && menuHeight > defaultMenuHeight) {
                    //utils.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ resetData')
                    $megamenu.data('rerender', true);
                    resetData(self.render);
                } else {
                    eventBind();
                    setMegamenuHeight();
                }

                // 메가메뉴 Cloc
                if (pathname == '/') {
                    newsClocName = 'joongang|home|megasection';
                    news2DepthClocName = 'joongang|home|megasection2';
                    sectionClocName = 'joongang|home|megasubsection';
                    section2DepthClocName = 'joongang|home|megasubsection2';
                    serviceClocName = 'joongang|home|megasvc';
                    service2DepthClocName = 'joongang|home|megasvc2';
                } else if (pathname.indexOf('article') > -1) {
                    newsClocName = 'joongang|article|megasection';
                    news2DepthClocName = 'joongang|article|megasection2';
                    sectionClocName = 'joongang|article|megasubsection';
                    section2DepthClocName = 'joongang|article|megasubsection2';
                    serviceClocName = 'joongang|article|megasvc';
                    service2DepthClocName = 'joongang|article|megasvc2';
                } else {
                    newsClocName = 'joongang|section|megasection';
                    news2DepthClocName = 'joongang|section|megasection2';
                    sectionClocName = 'joongang|section|megasubsection';
                    section2DepthClocName = 'joongang|section|megasubsection2';
                    serviceClocName = 'joongang|section|megasvc';
                    service2DepthClocName = 'joongang|section|megasvc2';
                }

                $megamenu.find('ul.menu_news > li').each(function () {
                    $(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), newsClocName));
                });

                $megamenu.find('ul.menu_section > li').each(function () {
                    $(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), sectionClocName));
                });

                $megamenu.find('ul.menu_service > li').each(function () {
                    $(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), serviceClocName));
                });

                $megamenu.find('ul.menu_news > li ul.sub a').each(function () {
                    $(this).attr('href', utils.getClocUrl($(this).attr('href'), news2DepthClocName));
                });

                $megamenu.find('ul.menu_section > li ul.sub a').each(function () {
                    $(this).attr('href', utils.getClocUrl($(this).attr('href'), section2DepthClocName));
                });

                $megamenu.find('ul.menu_service > li ul.sub a').each(function () {
                    $(this).attr('href', utils.getClocUrl($(this).attr('href'), service2DepthClocName));
                });
            };

            function setMegamenuHeight() {

                windowSize = utils.windowSize();

                var styles = { position: '', left: 0, height: windowSize.height };

                if ($('#gnb').length && $(window).scrollTop() > $('#gnb').offset().top) {
                    styles.left = $('#body').offset().left;
                    styles.position = 'fixed';
                }

                $megamenu.find('.full_menu').css(styles);
            }

            $(window).on('resize', function () {

                if ($('#nav').css('display') == 'block') {
                    setMegamenuHeight();
                }
                return false;
            });

            function closeHandler() {
                close();
                return false;
            }

            function closeTimerHandler() {
                timer = setTimeout(close, 350);
            }

            function close() {
                $megamenu.hide();
                $megamenu.find('li[class="on"]').removeClass('on');
            }

            function initData(callback) {

                var allMenu,
					children,
					rtn;

                if (utils.menu.loaded) {
                    allMenu = utils.menu.getMenus();
                    if (allMenu == undefined) {
                        return;
                    }
                    children = allMenu.Children;
                    rtn = { TrendGroup: [], ServiceGroup: [], MoreGroup: [{ Key: 'More', Display: 'More', Children: [] }] };

                    children.forEach(function (v, i, a) {
                        if (v.Key == 'Trend' || v.Key == 'Issue' || v.Key == 'TypeSetting' || v.Key == 'Time7' || v.Key == 'User' || v.Key == 'Reporter') {
                            rtn.ServiceGroup.push(v);
                        } else {
                            rtn[v.Key] = v.Children;
                        }
                    });

                    megaData = rtn;

                    callback && callback();
                } else {
                    setTimeout(function () {
                        initData(callback);
                    }, 100);
                }
            }

            function resetData(callback) {

                //utils.log('########################################## resetData');

                var itemOffsetTop = 0,
					itemOffsetBottom = 0,
					winScrollTop = $(window).scrollTop();

                //utils.log('defaultMenuHeight : ' + defaultMenuHeight)
                $megamenu.find('.full_menu > ul > li[data-key]').each(function (i, v) {

                    var $item = $(this),
						key = '',
						parentKey = '',
						groupKey = '',
						group = [];

                    itemOffsetTop = $item.offset().top;
                    itemOffsetBottom = itemOffsetTop + $item.height();

                    //utils.log('## $item.offset().top : ' + $item.offset().top);
                    //utils.log('## itemOffsetTop : ' + itemOffsetTop);
                    //utils.log('## itemOffsetBottom : ' + itemOffsetBottom);
                    //utils.log('## defaultMenuHeight : ' + defaultMenuHeight);

                    if (itemOffsetBottom > defaultMenuHeight) {

                        key = $item.data('key');
                        parentKey = $item.data('parentKey');

                        //utils.log('## itemOffsetBottom : ' + itemOffsetBottom);
                        //utils.log('## defaultMenuHeight : ' + defaultMenuHeight);
                        //utils.log('## parentKey : ' + parentKey);

                        if (parentKey == 'ServiceGroup') {

                            if (key == 'User') {

                                megaData[parentKey].forEach(function (v, i, a) {
                                    if (v && key == v.Key) {
                                        megaData.MoreGroup[0].Children.push(v);
                                        a.splice(i, 1);
                                    }
                                });

                            } else {

                                megaData[parentKey].forEach(function (v, i, a) {
                                    if (v && key == v.Key) {
                                        groupKey = 'EtcGroup';
                                        group = megaData.MoreGroup[0].Children.filter(function (v) {
                                            return v.Key == groupKey;
                                        });

                                        if (!group.length) {
                                            megaData.MoreGroup[0].Children.push({ Key: groupKey, Children: [v] });
                                        } else {
                                            group[0].Children.push(v);
                                        }
                                        a.splice(i, 1);
                                    }
                                });
                            }
                        } else {

                            group = megaData.MoreGroup[0].Children.filter(function (v) {
                                return v.Key == parentKey;
                            });

                            if (!group.length) {
                                if (parentKey == 'SectionGroup') {
                                    megaData.MoreGroup[0].Children.push({
                                        Key: 'SectionGroup',
                                        Children: [
											megaData[parentKey].filter(function (v) {
											    return v.Key == key;
											})[0]
                                        ]
                                    });
                                }
                            } else {
                                group[0].Children.push(megaData[parentKey].filter(function (v) {
                                    return v.Key == key;
                                })[0]);
                            }

                            //utils.log('## parentKey');
                            //utils.log(megaData[parentKey]);

                            megaData[parentKey].forEach(function (v, i, a) {

                                if (v && key == v.Key) {
                                    a.splice(i, 1);
                                }
                            });
                        }
                    }
                });

                callback && callback();
            }

            function closeMegaMenuHandler(e) {

                var ele = utils.getElementFromEvent(e),
					$target = $(ele);

                if (ele.tagName == 'A' || ele.tagName == 'BUTTON') {
                } else {
                    if ($target.closest($megamenu).length === 0 && $megamenu.css('display') != 'none') {
                        //$(document.body).off('click', closeMegaMenuHandler);
                        //$(window).off('scroll', closeMegaMenuHandler);
                        close();
                    }
                }
            }

            function eventBind() {

                var timeout = null;
                $(document.body).on('click', closeMegaMenuHandler);
                $(window).on('scroll', closeMegaMenuHandler);
                $megamenu
					//.on('mouseleave focusout', closeTimerHandler)
					.on('mouseenter focusin', 'li', function (e) {

					    var $this = $(this),
							$subList = $this.find('>.sub');

					    $this.addClass('on').siblings().removeClass('on');
					    $this.closest('ul').siblings().find('li').removeClass('on');

					    if ($subList.length) {
					        clearTimeout(timeout);
					        $cover.show();
					        setPositionMenu($subList, true);
					    } else {
					        if ($this.parent().filter('[class^=menu_]').length) {
					            $cover.hide();
					        }
					    }
					    return false;
					})
					.on('mouseleave focusout', function (e) { //이벤트 수정
					    var $this = $(this);

					    $this.find('.on').removeClass('on');
					    timeout = setTimeout(function () {
					        $cover.hide();
					    }, 250);

					    //$this.removeClass('on');

					    //if ($this.find('.sub').length > 0) {
					    //	timeout = setTimeout(function () {
					    //		$cover.hide();
					    //	}, 250);
					    //}

					    return false;
					});
            }

            function setPositionMenu($subList, type) {

                //utils.log('## setPositionMenu');
                //utils.log($subList);

                var winScrollBottom = $(window).scrollTop() + defaultMenuHeight,
					listBottom = $subList.offset().top + $subList.height(),
					styles = { top: (winScrollBottom - listBottom - 30) };

                if (!$subList.data('setPosition')) {
                    if (listBottom >= winScrollBottom + 30) {
                        $subList.css(styles);
                    }
                }

                $subList.data('setPosition', true);

                return;
            }
        };

        /**
		 *
		 */
        function Footer() {

            if (pageType == PAGE_TYPE.index) {
                var allServiceClass = '';
            }
            var _footer = this,
				allServiceClass = pageType == PAGE_TYPE.index ? 'btn_open' : 'btn_close',
				allServiceDisplay = pageType == PAGE_TYPE.index ? 'block' : 'none',
				temp = {
				    siteMap: '<div class="sitemap">' +
						'<div class="hd">' +
						'<h4 class="hide">사이트맵</h4>' +
						'<p>중앙일보를 펼치면 세상이 펼쳐집니다.</p>' +
						'<a href="#none" class="' + allServiceClass + '" id="btnFootAllService">서비스전체보기<span class="icon"></span></a>' +
						'</div>' +
						'<div id="footAllService" class="bd" style="display:' + allServiceDisplay + ';" data-bind="rows">' +
						'<div class="row clearfx" data-bind="group">' +
						'<div class="col">' +
						'<span data-bind="title" style=""></span>' +
						'<dl data-bind="list" >' +
						'<dd><a href="#none" data-bind="link"></a></dd>' +
						'</dl>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>',
				    snsCol: '<span class="mobile mg"><a href="http://mnews.joins.com" id="showMobileWeb">중앙일보 모바일 웹<span class="icon"></span></a></span>' +
						'<dl data-bind="list" >' +
						'<dd><a href="#none" data-bind="link"></a></dd>' +
						'</dl>',
				    promotion: '<div class="promote"><h4 class="hide">광고</h4>' +
						'<ul data-bind="promotion">' +
						'<li><a href="#" data-bind="link"><img data-bind="image" src="" alt=""></a></li>' +
						'</ul>' +
						'</div>',
				    footInfo: '<div class="foot_info">' +
						'<div class="policy">' +
						'<h3 class="hide">정책 및 약관</h3>' +
						'<ul class="clearfx" data-bind="services">' +
						'<li data-bind="item"><a href="#" data-bind="link"></a></li>' +
						'</ul>' +
						'<p class="logo" data-bind="logo"><a href="#" data-bind="link"></a></p>' +
						'<address class="clearfx">' +
						'<span><strong>주소</strong> : 서울시 중구 서소문로 100</span><span><span class="icon"></span><strong>인터넷신문등록번호</strong> 서울 아 01013</span><span><span class="icon"></span>등록일자 : 2009.11.2</span><span><span class="icon"></span>발행인 : 김교준</span><span><span class="icon"></span>편집인 : 김교준</span>' +
						'</address>' +
						'<p class="info" data-bind="info">JoongAng Ilbo의 모든 콘텐트(기사)는 저작권법의 보호를 받은바, 무단 전재, 복사, 배포 등을 금합니다.<a data-bind="link"></a></p>' +
						'<p class="copyright">Copyright by JoongAng Ilbo Co.,Ltd. All Rights Reserved</p>' +
						'</div>' +
						'</div>'
				},
				data = {
				    sitemap: {
				        rows: [
							{
							    group: [
									{
									    title: { text: '뉴스' },
									    list: [
											{ link: { text: '오피니언', href: 'http://news.joins.com/opinion', target: '_blank' } },
											{ link: { text: '정치', href: 'http://news.joins.com/politics', target: '_blank' } },
											{ link: { text: '경제', href: 'http://news.joins.com/money', target: '_blank' } },
											{ link: { text: '사회', href: 'http://news.joins.com/society', target: '_blank' } },
											{ link: { text: '국제', href: 'http://news.joins.com/world', target: '_blank' } },
											{ link: { text: '문화', href: 'http://news.joins.com/culture', target: '_blank' } },
											{ link: { text: '스포츠', href: 'http://news.joins.com/sports', target: '_blank' } },
											{ link: { text: '연예', href: 'http://news.joins.com/star', target: '_blank' } },
											{ link: { text: '포토·동영상', href: 'http://news.joins.com/pic', target: '_blank' } }
									    ]
									},
									{
									    title: { text: '섹션' },
									    list: [
											{ link: { text: 'J플러스', href: 'http://jplus.joins.com', target: '_blank' } },
											{ link: { text: 'Week&+', href: 'http://news.joins.com/travel', target: '_blank' } },
											{ link: { text: '강남통신', href: 'http://gangnam.joins.com/', target: '_blank' } },
											{ link: { text: 'TONG', href: 'http://tong.joins.com', target: '_blank' } },
											{ link: { text: '평양&', href: 'http://news.joins.com/nk', target: '_blank' } },
											{ link: { text: '반퇴시대', href: 'http://news.joins.com/retirement', target: '_blank' } },
											{ link: { text: '카툰', href: 'http://news.joins.com/cartoon', target: '_blank' } },
											{ link: { text: '블로그', href: 'http://blog.joins.com', target: '_blank' } },
                                            { link: { text: '소년중앙', href: 'http://sojoong.joins.com/', target: '_blank' } }
									    ]
									},
									{
									    title: { text: '서비스' },
									    list: [
											{ link: { text: '트렌드 뉴스', href: 'http://news.joins.com/trend/daily', target: '_blank' } },
											{ link: { text: '이슈', href: 'http://news.joins.com/issue', target: '_blank' } },
                                            { link: { text: '기자', href: 'http://news.joins.com/reporter', target: '_blank' } },
											{ link: { text: '전자판', href: 'http://paper.joins.com', target: '_blank' } },
											//{ link: { text: '타임7', href: 'http://news.joins.com/time7', target: '_blank' } },
											{ link: { text: '인물정보', href: 'http://people.joins.com', target: '_blank' } },
											{ link: { text: 'Joins Spider', href: 'http://mediaspider.joins.com/', target: '_blank' } },
											{ link: { text: 'Our History', href: 'http://ourhistory.joins.com/', target: '_blank' } }
									    ]
									},
									{
									    title: { text: '독자서비스' },
									    list: [
											{ link: { text: '중앙멤버십', href: 'https://jmembership.joins.com/', target: '_blank' } },
											{ link: { text: 'MY뉴스', href: 'http://news.joins.com/mynews', target: '_blank' } },
											{ link: { text: '구독신청', href: 'http://subscribe.joins.com/', target: '_blank' } },
											{ link: { text: '제보', href: 'http://news.joins.com/jebo', target: '_blank' } },
											//{ link: { text: '인물정보', href: 'http://people.joins.com/', target: '_blank' } },
											{ link: { text: '보도자료', href: 'http://news.joins.com/brandnews', target: '_blank' } },
											{ link: { text: '고객센터', href: 'http://news.joins.com/customercenter', target: '_blank' } },
											{ link: { text: '독자위원회', href: 'http://jcouncil.news.joins.com/', target: '_blank' } }
									    ]
									}
							    ]
							},
							{
							    group: [
									{
									    title: { text: 'JMnet 뉴스' },
									    list: [
											utils.linkService.getData('joongangilbo'),
											utils.linkService.getData('joongangsunday'),
											utils.linkService.getData('ilgansports'),
											utils.linkService.getData('koreajoongangdaily'),
											utils.linkService.getData('joinsland'),
											utils.linkService.getData('jhealthmedia'),
											utils.linkService.getData('cn'),
											utils.linkService.getData('usajoongang'),
											utils.linkService.getData('jp')
									    ]
									},
									{
									    title: { text: '시사매거진', href: 'http://jmagazine.joins.com/', target: '_blank' },
									    list: [
											utils.linkService.getData('monthlyjoongang'),
											utils.linkService.getData('newsweek'),
											utils.linkService.getData('forbeskorea'),
											utils.linkService.getData('economist')
									    ]
									},
									{
									    title: { text: '여성지' },
									    list: [
											utils.linkService.getData('womanjoongang'),
											utils.linkService.getData('ceci'),
											utils.linkService.getData('sure'),
											//utils.linkService.getData('lemontree'),
											utils.linkService.getData('heren'),
											utils.linkService.getData('instylekorea'),
											utils.linkService.getData('cosmopolitan'),
											utils.linkService.getData('elle'),
											utils.linkService.getData('myjlook')
									    ]
									},
									{
									    title: { text: '방송', href: 'http://www.joins.com/', target: '_blank' },
									    list: [
											utils.linkService.getData('jtbc'),
											utils.linkService.getData('jtbc2'),
											utils.linkService.getData('jtbcgolf'),
                                            utils.linkService.getData('jtbc3foxsports')
									    ]
									},
									{
									    title: { text: '연구소' },
									    list: [
											utils.linkService.getData('jeconomy'),
											utils.linkService.getData('societyenvironment'),
											utils.linkService.getData('chinajoins'),
											utils.linkService.getData('nkjoins'),
											utils.linkService.getData('koreanjoins'),
											utils.linkService.getData('universityestimation')
									    ]
									},
							    ]
							}
				        ]
				    },
				    snsCol: {
				        title: { text: '중앙일보 SNS', href: '#', target: '_blank' },
				        list: [
							utils.linkService.getData('twitter', { html: '<span class="icon_twitter"></span>트위터', cls: '' }),
							utils.linkService.getData('facebook', { html: '<span class="icon_facebook"></span>페이스북', cls: '' }),
							//utils.linkService.getData('googleplus', { html: '<span class="icon_googleplus"></span>구글+', cls: '' }),
							//utils.linkService.getData('pinterest', { html: '<span class="icon_pinterest"></span>핀터레스트', cls: '' })
				        ]
				    },
				    promotion: [utils.linkService.getData('koreanair'), utils.linkService.getData('samsung'), utils.linkService.getData('raemian')],
				    logo: utils.linkService.getData('joongangmedia'),
				    services: [
						utils.linkService.getData('footerjoongangilbo'),
						utils.linkService.getData('customercenter'),
						utils.linkService.getData('onlinecustomercenter'),
						utils.linkService.getData('joongangad'),
						utils.linkService.getData('joongangbiz'),
						utils.linkService.getData('joongangterms'),
						utils.linkService.getData('joongangpolicy', { html: '<strong>개인정보 취급방침</strong>' }),
						utils.linkService.getData('youthprotection'),
						utils.linkService.getData('joongangproblem')
				    ],
				    info: {
				        link: {
				            href: 'http://conbox.joins.com',
				            target: '_blank',
				            text: '[콘텐트 문의]'
				        }
				    }
				},
				directives = {
				    sitemap: {
				        rows: {
				            group: {
				                list: { link: utils.decorators.link },
				                title: {
				                    html: function (params) {

				                        if (this && this.title) {
				                            var $list = $(params.element),
												html = '';

				                            if (this.title.link) {
				                                html = '<dt class="mg"><a href="#none">' + this.title.text + '</a></dt>';
				                            } else {
				                                html = '<dt class="mg">' + this.title.text + '</dt>';
				                            }
				                            $list.prepend(html);
				                        }
				                    }
				                }
				            }
				        }
				    },
				    promotion: { link: utils.decorators.link, image: utils.decorators.image },
				    services: {
				        link: utils.decorators.link,
				        item: {
				            html: function (params) {
				                if (params.index != 0) {
				                    var $item = $(params.element);
				                    $item.prepend('<span class="icon"></span>');
				                }
				            }
				        }
				    },
				    logo: { link: utils.decorators.link },
				    info: { link: utils.decorators.link }
				};

            this.renderHtml = function () {
                document.write('<div id="foot"></div>');
                _footer.render();
            };

            this.render = function () {

                var $foot = $('#foot'),
					siteMapHtml = '',
					promotionHtml = '',
					footInfoHtml = '',
					snsColHtml = '';

                siteMapHtml = $.renderTemplate({
                    template: temp.siteMap,
                    data: data.sitemap,
                    directives: directives.sitemap
                });

                promotionHtml = $.renderTemplate({
                    template: temp.promotion,
                    data: { promotion: data.promotion },
                    directives: directives
                });

                footInfoHtml = $.renderTemplate({
                    template: temp.footInfo,
                    data: { logo: data.logo, services: data.services, info: data.info },
                    directives: directives
                });

                snsColHtml = $.renderTemplate({
                    template: temp.snsCol,
                    data: data.snsCol,
                    directives: directives.sitemap.rows.group
                });

                $foot.append(siteMapHtml).append(promotionHtml).append(footInfoHtml).find('.row').first().append(snsColHtml);

                if (utils.isMobile() && utils.config('applicationType') != utils.config('deviceType')) {
                    if (window.location.toString().toLowerCase().indexOf("election2016") == -1) {
                        var $btnMoveMobile = $('<div class="m_vers"><a href="' + utils.config('webMobilePath') + '">모바일 버전 보기</a></div>');
                        $btnMoveMobile.find('a').on('click', function () {
                            utils.removeIgnoreUserAgent();
                            utils.redirectUrl();
                            return false;
                        });
                        $foot.after($btnMoveMobile);
                    }
                }


                $('#btnFootAllService', $foot).on('click', function () {
                    var $btn = $(this);
                    if ($btn.hasClass('btn_open')) {
                        $btn.addClass('btn_close').removeClass('btn_open');
                        $('#footAllService', $foot).hide();
                    } else {
                        $btn.addClass('btn_open').removeClass('btn_close');
                        $('#footAllService', $foot).show();
                    }
                    return false;
                });

                /* Cloc */
                // 홈
                // 사이트맵
                $('div#footAllService a').each(function () {
                    $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|home|sitemap'));
                });

                // 푸터
                $('div.foot_info a').each(function () {
                    if ($(this).attr('href').indexOf("mailto:") < 0) {
                        $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|home|footer'));
                    }
                });
            };
        };

        /**
		 *
		 */
        function Wide() {

            var _wide = this,
				$body = $(document.body),
				$aside = $('#aside'),
				$btnOpen = $('#btnOpenAside'),
				$btnClose = $('<button type="button" class="btn_close_aside">닫기</button>'),
				CLASS_NAMES = {
				    on: 'aside_on',
				    off: 'aside_off'
				};

            this.open = function () {

                //utils.log('## wide openWide');
                //utils.log($body);

                utils.setCookie(COOKIE_NAMES.wide, '1', 1, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
                $(document.body).removeClass(CLASS_NAMES.off).addClass(CLASS_NAMES.on);
                $btnOpen.hide();
                if (pageType != PAGE_TYPE.article && pageType != PAGE_TYPE.search) {
                    _layout.header.showSearchArea();
                    _layout.header.unbindCloseSearchArea();
                }
                $(window).trigger('resize_layout');
            };

            this.close = function () {

                //utils.log('## wide closeWide');
                //utils.log(pageType != PAGE_TYPE.article || pageType != PAGE_TYPE.search);

                utils.setCookie(COOKIE_NAMES.wide, '0', 1, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
                $(document.body).removeClass(CLASS_NAMES.on).addClass(CLASS_NAMES.off);
                $btnOpen.css('display', '');
                if (pageType != PAGE_TYPE.article && pageType != PAGE_TYPE.search) {
                    _layout.header.showSnsArea();
                    _layout.header.bindCloseSearchArea();
                }
                $(window).trigger('resize_layout');
            };

            this.renderHtml = function () {
                document.write('<div id="aside"></div>');
                _wide.render();
            };

            this.render = function () {

                //var pageType = utils.config('pageType');

                var wideState = utils.getCookie(COOKIE_NAMES.wide),
					html = '',
					template = '<div data-bind="section"><div class="hd"><h4 data-bind="title"></h4><p data-bind="body"></p></div><div class="bd"></div></div>',
					data = [
						{ id: 'wide_sns', cls: 'rta sub_share', section: { title: '중앙일보 SNS 소개', cls: 'hide', body: { html: 'SNS에서도 중앙일보의<br><strong>뉴스를 받아보세요</strong>' } } },
						{ id: 'wide_trend', cls: 'rta sub_trend', type: 'TrendArticle', section: { title: '트렌드뉴스', cls: 'subtit_comm', body: { html: '현재 트렌드가 되고 있는 뉴스를 읽어 보세요' } } },
						{ id: 'wide_popular', cls: 'aside_banner', type: 'RecommendedArticleForWide', section: { title: '신규 & 추천 뉴스', cls: 'hide' } },
						{ id: 'wide_opinion_onair', cls: 'aside_banner', type: 'OpinionOnAir', section: { title: '오피니언 온에어', cls: 'hide' } }
					],
					addData = [
						{ id: 'wide_major', cls: 'rta sub_headline', type: 'MajorArticle', section: { title: '주요뉴스', cls: 'subtit_comm', body: { html: '중앙일보 주요기사를 읽어보세요' } } },
						{ id: 'wide_fast', cls: 'rta sub_digital', type: 'FastNews', section: { title: '지면보다 빠른 뉴스', cls: 'subtit_comm', body: { html: '디지털에서만 만날 수 있는 중앙일보 뉴스' } } },
						{ id: 'wide_ad_bottom', cls: 'aside_banner', type: 'Ad', section: { title: '광고', cls: 'hide' } }
					],
					directives = {
					    section: {
					        'id': function () { return this.id; },
					        'class': function () { return this.cls; },
					        html: function (params) {
					            if (this.type == 'Ad' && this.service == undefined) {
					                $(params.element).css('padding', 0);
					            }
					        },
					        'data-widget-type': function () { return this.type; },
					        'data-widget-service': function () {
					            return this.service;
					        },
					        title: {
					            'class': function () {
					                return this.cls;
					            }
					        },
					        body: {
					            html: function () {
					                return this.body && this.body.html;
					            }
					        }
					    }
					};
                var pageType = utils.config('pageType');

                //페이지타임 : PAGE_TYPE.index, PAGE_TYPE.article
                //wide_fast : 지면보다 빠른 뉴스
                //wide_major : 주요뉴스
                if (pageType == PAGE_TYPE.index) {
                    // 메인 광고 시 제외
                    if (typeof(isAdEx) == "undefined" || !isAdEx) {
                        var wideAd = addData.filter(function (v) {
                            return v.id == 'wide_ad_bottom';
                        })[0];
                        wideAd.service = 'wide_797';
                        data.push(wideAd);
                    }
                    data.push(addData.filter(function (v) {
                        return v.id == 'wide_fast';
                    })[0]);

                } else {
                    var wideAd = addData.filter(function (v) {
                        return v.id == 'wide_ad_bottom';
                    })[0];
                    wideAd.service = 'wide_798';
                    data.push(wideAd);

                    data.push(addData.filter(function (v) {
                        return v.id == 'wide_fast';
                    })[0]);
                }

                //if (pageType == PAGE_TYPE.index || pageType == PAGE_TYPE.article) {
                //	data.push(addData.filter(function (v) { return v.id == 'wide_ad_bottom' })[0]);
                //}

                $aside = $('#aside');
                $btnOpen = $('#btnOpenAside');

                //utils.log('#######' + wideState);

                function setSectionsBody($parent, parentData) {

                    var
						html = '',
						template = {
						    wide_sns: '<ul data-bind="list"><li><a data-bind="link"></a></li></ul>',
						    wide_trend: '<ul data-bind="list"><li>' +
								'<span class="thumb"><a data-bind="link"><img data-bind="image"></a></span>' +
								'<em data-bind="position"></em><strong class="mg"><a data-bind="link"></a></strong>' +
								'</li></ul>',
						    wide_major: '<ul data-bind="list"><li>' +
								'<span class="thumb"><a data-bind="link"><img data-bind="image"></a></span>' +
								'<strong class="mg"><a data-bind="link"></a></strong>' +
								'</li></ul>'
						},
						directives = {
						    list: {
						        link: utils.decorators.link,
						        image: utils.decorators.image,
						        position: {
						            'class': function (params) {
						                var pos = params.index + 1;
						                return 'rank' + (pos < 10 ? ('0' + pos) : pos);
						            },
						            text: function (params) {
						                return params.index + 1;
						            }
						        },
						        thumb: {
						            html: function (params) {
						                if (!this.image) {
						                    $(params.element).remove();
						                }
						            }
						        }
						    }
						};

                    parentData.forEach(function (v) {

                        getSectionData(v.id, function (id, data) {

                            var $section = $('#' + id);
                            //utils.log('## getSectionData');
                            //utils.log(data);
                            if (!data) {
                                $section.hide();
                                return;
                            }

                            if (data.list && data.list.length) {
                                html = $.renderTemplate({
                                    template: template[v.id],
                                    data: data,
                                    directives: directives
                                });

                                //utils.log('####### setSectionsBody : ' + v.id);

                                $section.find('.bd').html(html);
                            } else {
                                $section.hide();
                            }

                        });
                    });

                    function getSectionData(id, callback) {

                        var data = {},
							infos = {
							    //wide_sns: { cls: 'clearfx', list: [utils.linkService.getData('facebook'), utils.linkService.getData('twitter'), utils.linkService.getData('kakaostory'), utils.linkService.getData('time7')] }
							    wide_sns: { cls: 'clearfx', list: [utils.linkService.getData('facebook'), utils.linkService.getData('twitter'), utils.linkService.getData('newsletter')] } //utils.linkService.getData('kakaostory'),
							};

                        data = infos[id];

                        // TODO : 실제 데이타 연동 작업 필요.
                        callback(id, data);
                    }
                }

                (function initWide() {


                    var articleType = utils.config('articleType');
                    $aside = $('#aside');

                    // 무조건 close : cover 아티클.
                    if (articleType == ARTICLE_TYPE.cover) {
                        return;
                    }

                    if (wideState) { // 무조건 오픈.
                        if (wideState == '1') {
                            _wide.open();
                        } else {
                            _wide.close();
                        }
                    } else {
                        if ($(document.body).width() >= 1390) {
                            _wide.open();
                        } else {
                            _wide.close();
                        }
                    }

                    $btnClose.on('click', function () {
                        //utils.log('$btnClose > click');
                        _wide.close();
                    });

                    $btnOpen.on('click', function () {
                        //utils.log('$btnOpen > click');
                        _wide.open();
                    });

                    html = $.renderTemplate({ data: data, template: template, directives: directives });

                    //utils.log('################');
                    //utils.log($aside);

                    $aside.html(html);
                    setSectionsBody($aside, data);

                    $aside.wideWidget();
                    $aside.append($btnClose);
                    //addAd(); //사용하지 않음
                    // 최하단 time7 컴포넌트 추가
                    setTime7Body();
                })();

                //function addAd() {
                //	// 메인 or 아티클만 광고 추가

                //	var pageType = utils.config('pageType'),
                //		AD_CODE_INFO = { Home: 'wide_797', Article: 'wide_798' },
                //		$target = $('#wide_ad_bottom'),
                //		adCode = AD_CODE_INFO[pageType];

                //	if (adCode) {

                //		$target.data('widgetService', adCode);
                //	}
                //}

                return;
            };
        };

    };
})(window, document, jQuery);

function setTime7Body() {
    $.getScript(utils.config('staticPath') + '/scripts/data/time7/js/article_top1.js', render);
    function render(d) {
        var sWordSeq, sTitle, sContent, sImgUrl, sPushImgUrl, sRelTotalId, sRelUrl, sWordType, sPicYN, sRegDt, sLink;

        try {
            var time7List = utils.convertList(time7_article_top1);
            var strHtml = "";
            var time7data = time7List[0];
            var sWordSeq = time7data.word_seq;
            var sTitle = time7data.title;
            var sContent = time7data.content;
            var sImgUrl = time7data.img_url;
            var sPushImgUrl = time7data.push_img_url;
            var sRelTotalId = time7data.rel_total_id;
            var sRelUrl = time7data.rel_url;
            var sWordType = time7data.word_type;
            var sPicYN = time7data.pic_yn;
            var sRegDt = time7data.reg_dt;
            var checkTime = window.__Ndaytime.ba.hour24;
            var checkDay = window.__Ndaytime.ba.weekday;
            if ((sTitle != "undefined" && sTitle != "") && (sWordType != "undefined" && sWordType != "")) {
                if (sRelUrl != "undefined" && sRelUrl != "") {
                    sLink = sRelUrl;
                } else if (sRelTotalId != "undefined" && sRelTotalId != "") {
                    sLink = utils.config('webPcPath') + "/article/" + sRelTotalId;
                }
                if (sWordType == "R") {
                    if ((7 <= checkTime && checkTime < 10) && (checkDay != 0) && (checkDay != 6)) {
                        $("#wide_fast").after('<div class="sub_time7"></div>');
                        strHtml = strHtml + "<div class='time7_morning'>";
                        strHtml = strHtml + "<div class='hd'><h4 class='hide'>미리보는 오늘</h4></div>";

                        if (sImgUrl != "undefined" && sImgUrl != "") {
                            sImgUrl = "http://ir.joins.com?u=" + sImgUrl + "&w=260&h=148&t=c";
                            strHtml = strHtml + "<div class='bd image_type'>";
                            strHtml = strHtml + "<span class='txt_morning'><span class='bx'><span class='bg'></span></span><em>미리보는 오늘</em></span>";
                            var thumbHtml = "<span class='thumb'><img alt='' src='" + sImgUrl + "'><span class='shadow'></span></span>";
                            strHtml = strHtml + thumbHtml;
                            var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
                            strHtml = strHtml + titleHtml;
                            strHtml = strHtml + "</div>";
                            strHtml = strHtml + "<div class='ft'>";
                            var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
                            strHtml = strHtml + linkHtml;
                            strHtml = strHtml + "</div>";
                        }
                        else {
                            strHtml = strHtml + "<div class='bd text_type'>";
                            strHtml = strHtml + "<span class='txt_morning'><span class='bx'><span class='bg'></span></span><em>미리보는 오늘</em></span>";
                            var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
                            strHtml = strHtml + titleHtml;
                            strHtml = strHtml + "<span class='writer'>중앙일보 아침뉴스팀</span>";
                            strHtml = strHtml + "</div>";
                            strHtml = strHtml + "<div class='ft'>";
                            var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
                            strHtml = strHtml + linkHtml;
                            strHtml = strHtml + "</div>";
                        }
                        strHtml = strHtml + "</div>";
                        $(".sub_time7").html(strHtml);
                    }
                }
                else if (sWordType == "N") {
                    if ((18 <= checkTime && checkTime < 21) && (checkDay != 0) && (checkDay != 6)) {
                        $("#wide_fast").after('<div class="sub_time7"></div>');
                        strHtml = strHtml + "<div class='time7_newsroom'>";
                        strHtml = strHtml + "<div class='hd'><h4 class='hide'>Newsroom Letter</h4></div>";
                        strHtml = strHtml + "<div class='bd text_type'>";
                        if (sPicYN == "Y") {
                            strHtml = strHtml + "<span class='photo'><img alt='' src='http://images.joins.com/ui_joongang/news/pc/main/v_time7_newsroom_v2.png'></span>";
                        }
                        strHtml = strHtml + "<span class='txt_newsroom'><em>Newsroom Letter</em></span>";
                        var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
                        strHtml = strHtml + titleHtml;
                        if (sPicYN == "Y") {
                            strHtml = strHtml + "<span class='writer'><span class='hide'>남윤호 기자</span></span>";
                        }
                        strHtml = strHtml + "</div>";
                        strHtml = strHtml + "<div class='ft'>";
                        var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
                        strHtml = strHtml + linkHtml;
                        strHtml = strHtml + "</div>";
                        sstrHtml = strHtml + "</div>";
                        $(".sub_time7").html(strHtml);
                    }
                }
            }
        } catch (e) { }
    }
}