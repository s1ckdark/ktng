function initScrollMagic(){var e=$("#roof").height();new ScrollMagic.Scene({triggerElement:".hero-sub",triggerHook:"onEnter",duration:"200%"}).setTween(".hero-intro",{y:"80%",zIndex:-1,ease:Linear.easeNone});var t=document.getElementById("interview");if(t){var n=document.getElementById("video-interview-bg");new ScrollMagic.Scene({triggerElement:t,triggerHook:1,duration:window.innerHeight+t.offsetHeight-e}).on("enter",function(){playBgVideo(n)}).on("leave",function(){pauseVideo(n)}).addTo(controller)}var o=document.getElementById("senses");if(o){var i=document.getElementById("video-senses-bg");new ScrollMagic.Scene({triggerElement:o,triggerHook:1,duration:window.innerHeight+o.offsetHeight-e}).on("enter",function(){playBgVideo(i)}).on("leave",function(){pauseVideo(i)}).addTo(controller)}var a=document.getElementById("channels");if(a){for(var r=document.getElementById("channels-history-active"),s=document.getElementById("channels-history"),l=r.getElementsByTagName("li"),c=s.getElementsByTagName("li"),d=c[0].offsetHeight,g=new TimelineMax({delay:.5}),f=0;f<l.length-1;f++)g.to(l[f],1,{opacity:0,yPercent:-100}),g.to(c[f],1,{autoAlpha:0},"-=.8"),g.to(l[f+1],1,{opacity:1},"-=.8"),g.to(s,1,{y:-d*(f+1)},"-=.5"),g.to({},1,{});new ScrollMagic.Scene({triggerElement:a,triggerHook:0,duration:"500%",offset:-e}).setPin(a).setTween(g).addTo(controller)}var v=document.getElementById("history");if(v){var u=document.getElementById("history-inner");new ScrollMagic.Scene({triggerElement:v,triggerHook:.5,duration:"90%",offset:-e}).setTween(u,1,{x:-1500}).addTo(controller)}var h=$(".animation-init");h.length&&h.each(function(){new ScrollMagic.Scene({triggerElement:this,triggerHook:.7,reverse:!1}).setClassToggle(this,"animation-active").on("start",function(e){e.target.destroy(),e.target=null}).addTo(controller)}),scrollToSection()}function scrollToSection(){$(".brand-identity a, #nav a, #nav-tips a").on("click",function(e){e.preventDefault();var t,n=$(this).attr("href"),o=$(n);o.length>0&&(t=o.offset().top-$("#roof").outerHeight(),$("html, body").stop().animate({scrollTop:t},1e3))})}function playBgVideo(e){e.currentTime>0&&!e.paused&&!e.ended&&e.readyState>2||e.play()}function pauseVideo(e){e.currentTime>0&&!e.paused&&!e.ended&&e.readyState>2&&e.pause()}$(function(){var e=$("#intro");if(e.length){var t=$("#intro-bg"),n=$("#sales"),o=t.find("video")[0],i=n.find(".door-content").offset().top,a=$("#roof").height();new ScrollMagic.Scene({triggerElement:e[0],triggerHook:0,duration:i,offset:-a}).setTween(new TimelineMax({delay:.3}).to(e.find(".inner"),1,{opacity:0,ease:Linear.easeNone}).to(t.find(".bg-sales"),.2,{opacity:1,ease:Linear.easeNone}).from(n.find(".door-header"),.2,{opacity:0,ease:Linear.easeNone}).to({},2,{})).on("enter",function(){t.addClass("fixed"),$("html").hasClass("intro-text-tween")||($("html").addClass("intro-text-tween"),setTimeout(function(){new TimelineMax({delay:1.5}).to(e.find(".inner > *"),.2,{opacity:1}).from(e.find(".intro-header .tween"),1.5,{y:e.find(".intro-header").outerHeight(),ease:Power4.easeOut}).from(e.find(".intro-text .tween"),1.2,{y:-e.find(".intro-text").outerHeight(),ease:Power4.easeOut},"-=.2")},1500))}).on("leave",function(){t.removeClass("fixed")}).on("update",function(){"1"===t.find(".bg-sales").css("opacity")?pauseVideo(o):playBgVideo(o)}).addTo(controller)}}),"function"==typeof jatracker&&window.addEventListener("load",function(){$("#nav a").on("click",function(){jatracker("event","clickEvent","링크","클릭","네비게이션-"+$(this).find(".normal").text())}),$("#nav-tips a").on("click",function(){jatracker("event","clickEvent","링크","클릭","네비게이션-"+($(this).index()+1))}),$("#popup-open").on("click",function(){jatracker("event","clickEvent","동영상","재생","카운셀러 인터뷰")}),$(".article .link").on("click",function(){jatracker("event","clickEvent","링크","클릭",$(this).siblings(".heading").text())}),$("#video-vision ~ .play").on("click",function(){jatracker("event","clickEvent","동영상","재생","시각")}),$("#video-smell ~ .play").on("click",function(){jatracker("event","clickEvent","동영상","재생","후각")}),$("#video-taste ~ .play").on("click",function(){jatracker("event","clickEvent","동영상","재생","미각")}),$("#video-touch ~ .play").on("click",function(){jatracker("event","clickEvent","동영상","재생","촉각")}),$("#video-hearing ~ .play").on("click",function(){jatracker("event","clickEvent","동영상","재생","청각")}),$(".s-sense-more .btn").on("click",function(){jatracker("event","clickEvent","링크","클릭",$.trim($(this).parent().siblings(".heading").text()))}),$(document).on("click",".color-slider .owl-nav > *",function(){jatracker("event","clickEvent","버튼","클릭","올해 색상 슬라이더-"+($(this).hasClass("owl-prev")?"이전":"다음"))}),$(document).on("click",".perfume-slider .owl-nav > *",function(){jatracker("event","clickEvent","버튼","클릭","올바른 향수 사용법 슬라이더-"+($(this).hasClass("owl-prev")?"이전":"다음"))}),$(".tab-color-cosmetics .tab-nav a").on("click",function(){jatracker("event","clickEvent","링크","클릭","색조 화장품 고르기-"+$(this).find(".name").text())}),$(".tab-perfume-tpo .tab-nav a").on("click",function(){jatracker("event","clickEvent","링크","클릭","TPO 향수 사용법-"+$(this).text())}),$("#outro .more").on("click",function(){jatracker("event","clickEvent","링크","클릭","아모레퍼시픽 더 보러가기")}),$(".sns-share-box a:not(.sns-more)").on("click",function(){var e=$(this).attr("title");jatracker("event","clickEvent","링크","클릭",e+" 공유")}),$(".section-sns-list a").on("click",function(){var e=$(this),t=e.closest(".hash-section").attr("id"),n=e.attr("class");jatracker("event","clickEvent","링크","클릭",n+" 공유-"+t)})}),window.addEventListener("load",function(){var e=$("#nav");if(e.length){var t=e.find("a"),n=$("#roof").height();setTimeout(function(){var e=$("#outro").offset().top;t.each(function(t){var o=$(this),i=$(o.attr("href")).offset().top,a=o.next("a").length?$(o.next("a").attr("href")).offset().top-i:e-i;0===t&&new ScrollMagic.Scene({triggerElement:o.attr("href"),triggerHook:0,duration:e-i,offset:-n}).setClassToggle("#nav","active").addTo(controller),new ScrollMagic.Scene({triggerElement:o.attr("href"),triggerHook:0,duration:a,offset:-n}).setClassToggle(this,"active").addTo(controller)})},400),e.hover(function(){(new TimelineMax).to(e.find(".normal"),.4,{opacity:0,ease:Linear.easeNone,overwrite:1}).to(e.find(".hover"),.4,{opacity:1,ease:Linear.easeNone},"-=0.2")},function(){(new TimelineMax).to(e.find(".hover"),.4,{opacity:0,ease:Linear.easeNone,overwrite:1}).to(e.find(".normal"),.4,{opacity:1,ease:Linear.easeNone},"-=0.2")})}}),"object"==typeof WebFont&&WebFont.load({google:{families:["Merriweather:400,300"],text:"1234567890.,~"}}),$(function(){var e=navigator.userAgent.toLowerCase();e.indexOf("edge")>-1||e.indexOf("trident")>-1?($("img.lazyload").each(function(){$(this).attr("src",$(this).data("src"))}),$(".lazyload").not("img").each(function(){$(this).css("background-image",'url("'+$(this).data("src")+'")')})):lazyload();var t=$("#interview-popup");$("#popup-open").on("click",function(){t.fadeIn(400,function(){t.find("video")[0].play()})}),$("#popup-close").on("click",function(){t.fadeOut(400,function(){t.find("video")[0].pause()})});var n=$(".section-sns"),o=n.find(".section-sns-list a"),i=o.width();n.on("mouseenter mouseleave",function(e){var t=$(this).parent().hasClass("s-sense-body")?"down":$(this).parent(".sense-top-video").hasClass("layout-left")?"left":"right",n=$(this).find(".section-sns-list a");"mouseenter"===e.type?"down"===t?TweenMax.staggerTo(n,.4,{overwrite:1,opacity:1,cycle:{y:function(e){return i*(n.length-e)+10}}},.2):TweenMax.staggerTo(n,.4,{overwrite:1,cycle:{x:function(e){switch(t){case"left":return i*(n.length-e);case"right":return-i*(n.length-e)}}}},.2):"down"===t?TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,y:0,opacity:0},.2):TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,x:0},.2)}),o.on("click",function(e){e.preventDefault();var t=$(this),n=t.closest(".hash-section").attr("id"),o=t.attr("class"),i=$('meta[property="og:url"]').attr("content")+"#"+n;fnSendSns(o,i)})});var controller=new ScrollMagic.Controller;$(function(){initScrollMagic()}),$(function(){var e=$("#roof").height(),t=$(".s-sense-body"),n=t.find(".original");t.find(".sense-slider-header > .heading").each(function(){var e=$(this).index();$(this).find(".num").text("0"+(e+1))}),t.find(".sense-slider > .box").each(function(){var e=$(this).index();$(this).attr("data-dot","0"+(e+1))}),n.each(function(){var e=$(this);if(e.find(".sense-slider-header .heading").length>1){var t=e.clone().addClass("copy").removeClass("original");t.find(".sense-slider-header .heading:first-child").remove(),t.find(".sense-slider .box:first-child").remove(),e.after(t)}}),$(".sense-slider").owlCarousel({loop:!1,nav:!0,dots:!0,dotsData:!0,items:1,mouseDrag:!1,touchDrag:!1,smartSpeed:600}),$(".color-slider, .perfume-slider").owlCarousel({loop:!0,nav:!0,dots:!0,dotsData:!0,items:1,mouseDrag:!1,navText:["&lt;","&gt;"],smartSpeed:0});var o=$(".sense-slider-header .heading"),i=30;new SplitText(o,{type:"chars,words",wordsClass:"word",charsClass:"char-outer"}),new SplitText(o,{type:"chars",charsClass:"char"}),TweenMax.set(o.find(".char"),{x:i}),t.each(function(){function t(e,t){var n="FORWARD"===t;TweenMax.to([c.filter(".visible").find(".char"),d.filter(".visible").find(".char")],.5,{x:n?-i:i,overwrite:1}),d.filter(".visible").removeClass("visible"),c.filter(".visible").removeClass("visible"),TweenMax.to([d.eq(e).find(".char"),c.eq(e).find(".char")],.5,{x:0,overwrite:1,delay:.5}),d.eq(e).addClass("visible"),c.eq(e).addClass("visible"),e===g-1?(a.addClass("last"),r.eq(0).trigger("to.owl.carousel",[e])):(a.removeClass("last"),r.trigger("to.owl.carousel",[e])),a.hasClass("smell")&&a[1===e?"addClass":"removeClass"]("bg2")}function n(e){var t=o.duration()*(1/g*(e+.5));$("html, body").stop().animate({scrollTop:o.scrollOffset()+t},1e3)}var o,a=$(this),r=a.find(".sense-slider"),s=r.find("> .owl-nav > *"),l=r.find("> .owl-dots > *"),c=a.find(".original .sense-slider-header .heading"),d=a.find(".copy .sense-slider-header .heading"),g=a.find(".original .sense-slider > .owl-dots .owl-dot").length;o=new ScrollMagic.Scene({triggerElement:a[0],triggerHook:0,duration:100*g+"%",offset:-e}).setPin(a[0]).on("progress",function(e){var n=parseInt(e.progress/(1/g));n!==a.data("index")&&n!==g&&(t(n,e.scrollDirection),a.data("index",n))}).addTo(controller),s.on("click",function(){var e=$(this).hasClass("owl-prev"),t=a.data("index");"number"==typeof t&&0<=(t=e?t-1:t+1)&&t<g&&n(t)}),l.on("click",function(){n($(this).index())})})}),$(function(){$(".tab-nav a").on("click",function(e){e.preventDefault();var t=$(this),n=t.closest(".tab").find(".tab-content .item"),o=t.index();t.hasClass("active")||(t.addClass("active").siblings(".active").removeClass("active"),n.eq(o).addClass("active").siblings(".active").removeClass("active"))}),$(".tab-color-cosmetics .tab-nav a").on("mouseenter",function(){var e=$(this);if(!e.hasClass("active")){var t=e.closest(".tab").find(".tab-content .item"),n=e.index();e.addClass("active").siblings(".active").removeClass("active"),t.eq(n).addClass("active").siblings(".active").removeClass("active")}})}),$(function(){var e=$("#intro-tips");if(e.length){var t=$("#roof").height(),n=document.getElementById("video-senses-bg");new ScrollMagic.Scene({triggerElement:e[0],triggerHook:1,duration:window.innerHeight+e[0].offsetHeight-t}).on("enter",function(){playBgVideo(n),setTimeout(function(){e.css("background-image","none")},2500),$("html").hasClass("intro-text-tween")||($("html").addClass("intro-text-tween"),setTimeout(function(){new TimelineMax({delay:1.5}).to(e.find(".inner > *"),.2,{opacity:1}).from(e.find(".intro-tips-text .tween"),1.2,{y:e.find(".intro-tips-text").outerHeight(),ease:Power4.easeOut}).from(e.find(".intro-tips-header .tween"),1.5,{y:-e.find(".intro-tips-header").outerHeight(),ease:Power4.easeOut},"-=.2")},1500))}).on("leave",function(){pauseVideo(n)}).addTo(controller);var o=$("#nav-tips");if(o.length){var i=o.find("a");$(window).height()>=750&&new ScrollMagic.Scene({triggerElement:o[0],triggerHook:0,offset:-t}).setPin(o[0]).addTo(controller),setTimeout(function(){i.each(function(){var e=$(this),n=$(e.attr("href")).height();new ScrollMagic.Scene({triggerElement:e.attr("href"),triggerHook:0,duration:n,offset:-t}).setClassToggle(this,"active").addTo(controller)})},800),o.hover(function(){(new TimelineMax).to(o.find(".normal"),.4,{opacity:0,ease:Linear.easeNone,overwrite:1}).to(o.find(".hover"),.4,{opacity:1,ease:Linear.easeNone},"-=0.2")},function(){(new TimelineMax).to(o.find(".hover"),.4,{opacity:0,ease:Linear.easeNone,overwrite:1}).to(o.find(".normal"),.4,{opacity:1,ease:Linear.easeNone},"-=0.2")})}}}),$(function(){$(".video-play .play").on("click",function(e){e.preventDefault();var t=$(this);t.siblings("video")[0].play(),t.fadeOut(300)});var e={introBg:{el:document.getElementById("video-intro-bg"),url:"http://cf.c.ooyala.com/xoNXdvYzE61lDwuUVwWRASf-83MKlHKV/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_",poster:"./img/intro/bg-intro.jpg"},interviewBg:{el:document.getElementById("video-interview-bg"),url:"http://cf.c.ooyala.com/4wNndvYzE6nJ0WAb2MlOMWXuyd4xFk7p/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_",poster:"./img/sales/bg-interview.jpg"},interview:{el:document.getElementById("video-interview"),url:"http://cf.c.ooyala.com/Z5NndvYzE6t36Xl80w_ePc3yHA2tfCnX/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"},sensesBg:{el:document.getElementById("video-senses-bg"),url:"http://cf.c.ooyala.com/54NXdvYzE6UvBvdjcA-7yCz0cSvWOcWW/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_",poster:"./img/senses/bg-senses.jpg"},vision:{el:document.getElementById("video-vision"),url:"http://cf.c.ooyala.com/hzNndvYzE6m-D99-z-rRdUO5-pW2tx7b/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"},smell:{el:document.getElementById("video-smell"),url:"http://cf.c.ooyala.com/13NndvYzE65tCFK3FvPGQ3kljbdWXfdf/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"},taste:{el:document.getElementById("video-taste"),url:"http://cf.c.ooyala.com/ozN3dvYzE6uGCXMvHZvQPYHtsZgQT-aL/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"},touch:{el:document.getElementById("video-touch"),url:"http://cf.c.ooyala.com/sxN3dvYzE6JiP8JfxIGptrBnyq0IeLXO/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"},hearing:{el:document.getElementById("video-hearing"),url:"http://cf.c.ooyala.com/F1NndvYzE6ufW302AR1bMwmH8NOC1Do2/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_"}};e.introBg.el&&(e.introBg.el.src=e.introBg.url,e.introBg.el.poster=e.introBg.poster),e.interviewBg.el&&(e.interviewBg.el.src=e.interviewBg.url,e.interviewBg.el.poster=e.interviewBg.poster),e.sensesBg.el&&(e.sensesBg.el.src=e.sensesBg.url,$("#senses").length&&(e.sensesBg.el.poster=e.sensesBg.poster)),$(".background-video").prop({controls:!1,preload:!0,muted:!0,loop:!0}),e.interview.el&&(e.interview.el.src=e.interview.url),e.vision.el&&(e.vision.el.src=e.vision.url),e.smell.el&&(e.smell.el.src=e.smell.url),e.taste.el&&(e.taste.el.src=e.taste.url),e.touch.el&&(e.touch.el.src=e.touch.url),e.hearing.el&&(e.hearing.el.src=e.hearing.url),$("video:not(.background-video)").prop({controls:!0,controlsList:"nodownload",preload:!1,volume:1})});
//# sourceMappingURL=script.js.map
