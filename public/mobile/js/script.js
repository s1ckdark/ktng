function initScrollMagic(){function e(e,t,n){var o,a=$(e);TweenMax.set(a,{perspective:400}),a.each(function(){var e=this;"up"==n?(TweenMax.set(a,{opacity:0,y:30}),o=TweenMax.to(e,.8,{opacity:1,y:"=-30"})):"down"==n?(TweenMax.set(a,{opacity:0,y:-30}),o=TweenMax.to(e,.8,{opacity:1,y:"=+30"})):"left"==n?(TweenMax.set(a,{opacity:0,x:-30}),o=TweenMax.to(e,.8,{opacity:1,x:"=+30"})):"right"==n&&(TweenMax.set(a,{opacity:0,x:30}),o=TweenMax.to(e,.8,{opacity:1,x:"=-30"}));new ScrollMagic.Scene({triggerElement:e,triggerHook:t}).setTween(o).reverse(!1).addTo(controller)})}function t(e,t,n){var o=$(e);TweenMax.set(o,{perspective:400}),o.each(function(){var e,o=this,a=new TimelineMax({paused:!0});if("zigzag"==n)e=new SplitText(o,{type:"lines"}),a.staggerFrom(e.lines,.5,{opacity:0,cycle:{x:[100,-100]}},.2);else if("words"==n)e=new SplitText(o,{type:"words"}),$(e.words).each(function(t,n){a.staggerFrom(e.words,.6,{opacity:0,force3D:!0},.01*t),a.staggerFrom(e.words,.6,{scale:t%2==0?0:2},.01*t)});else if("cwl"==n)e=new SplitText(o,{type:"chars, words, lines"}),a.staggerFrom(e.chars,.5,{autoAlpha:0,scale:4,force3D:!0},.01,.2);else if("twist"==n)e=new SplitText(o,{type:"chars, words"}),a.staggerFrom(e.chars,.6,{opacity:0,scale:0,y:80,rotationX:180,transformOrigin:"0% 50% -50",ease:Back.easeOut},.01,"+=0");else if("random"==n){e=new SplitText(o,{type:"chars, words"});for(var r=0;r<e.chars.length;r++)a.from(e.chars[r],2,{opacity:0},2*Math.random())}new ScrollMagic.Scene({triggerElement:o,triggerHook:t}).on("start",function(){a.play()}).reverse(!1).addTo(controller)})}function n(e){return e.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")}$("#roof").height();var o=new TimelineMax({paused:!0});o.staggerTo(".intro-scroll",1.5,{opacity:.3,ease:Quad.easInOut,y:"+30",repeat:-1,delay:-1},.5),new ScrollMagic.Scene({triggerElement:$("#hero")[0],duration:$("#hero").height()}).on("enter leave",function(e){"enter"===e.type?o.play():o.pause()}).addTo(controller),TweenMax.set("#bg-hero .tween",{autoAlpha:0}),window.setTimeout(function(){TweenMax.set("#bg-hero .tween",{autoAlpha:1}),t("#bg-hero .tween",.5,"random")},2e3),e("#hero-sub .tween",.5,"up"),e("#hero-sub .heading-3",.5,"up"),TweenMax.set("#video-intro",{autoAlpha:0,x:"-100"}),TweenMax.set("#intro .text",{autoAlpha:0,x:"+100"}),TweenMax.set("#intro .col:nth-child(2)",{autoAlpha:0});var a=new TimelineMax({paused:!0}).to("#video-intro",.5,{autoAlpha:1,x:"=+100"}).to("#intro .col:nth-child(2)",.5,{autoAlpha:1}).to("#intro .text",.5,{autoAlpha:1,x:"=+100"});new ScrollMagic.Scene({triggerElement:"#intro",triggerHook:.6}).on("enter",function(){a.play()}).reverse(!1).addTo(controller);t("#intro .title",.6,"zigzag"),TweenMax.set("#fighter .interview-video",{autoAlpha:0,x:"-100"}),TweenMax.set("#dancer .interview-video",{autoAlpha:0,x:"-100"}),TweenMax.set("#barista .interview-video",{autoAlpha:0,x:"+100"}),TweenMax.set(".bg-people",{autoAlpha:0,y:"+50"});var r=new TimelineMax({paused:!0}).to("#fighter .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#fighter .bg-people",1,{autoAlpha:1,y:"=-50"}),i=(new ScrollMagic.Scene({triggerElement:"#fighter",triggerHook:.6}).on("enter",function(){r.play()}).reverse(!0).addTo(controller),new TimelineMax({paused:!0}).to("#dancer .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#dancer .bg-people",1,{autoAlpha:1,y:"=-50"})),c=(new ScrollMagic.Scene({triggerElement:"#dancer",triggerHook:.6}).on("enter",function(){i.play()}).reverse(!0).addTo(controller),new TimelineMax({paused:!0}).to("#barista .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#barista .bg-people",1,{autoAlpha:1,y:"=-50"})),s=(new ScrollMagic.Scene({triggerElement:"#barista",triggerHook:.6}).on("enter",function(){c.play()}).reverse(!0).addTo(controller),new TimelineMax({paused:!0}).to("#professor .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#professor .bg-people",1,{autoAlpha:1,y:"=-50"}));new ScrollMagic.Scene({triggerElement:"#professor",triggerHook:.6}).on("enter",function(){s.play()}).reverse(!0).addTo(controller);e(".interview .sub-heading-2",.6,"up"),t(".interview .heading-3",.6,"zigzag"),e("#fixedqna .qna",.6,"down"),t(".interview .heading-1",.6,"zigzag"),e(".interview-desc",.7,"down"),t("#localizing .heading-1",.6,"zigzag"),e("#localizing .text",.6,"left"),e("#localizing img",.6,"right"),t("#sangsang-univ .heading-1",.6,"cwl"),e("#sangsang-univ .sub-title",.6,"down"),e("#sangsang-univ .icon",.6,"down"),e("#sangsang-univ .text",.6,"down"),e("#sangsang-univ .chart",.6,"down"),t("#curriculum .heading-1",.6),e("#curriculum .text",.6,"up"),t("#sangsang-madang .heading-1",.6,"cwl"),e("#sangsang-madang .text",.6,"up"),e("#artist-1",.6,"left"),e("#artist-2",.6,"right"),e(".bg-circle",.6,"down");var l=$(".info-num"),g=new TimelineMax;l.each(function(){var e={var:0},t=$(this),o=t.data("count");g.to(e,2,{var:o,onUpdate:function(){var o=n(e.var);t.text(o)},ease:Expo.easOut},0)});new ScrollMagic.Scene({triggerElement:"#info .heading-1",triggerHook:.5}).setTween(g).reverse(!1).addTo(controller);e("#info .heading-1",.5,"up"),t("#contribute-timeline .heading-1",.6,"zigzag"),TweenMax.set(".card",{autoAlpha:0,y:-50});var d=new TimelineMax({paused:!0});$(".bar-chart .chart-bar").each(function(){var e=$(this),t=e.data("num");TweenMax.set(e,{height:t/6}),d.add(TweenMax.from(e,.2,{height:"0px",onComplete:function(){e.find("b").text(t)}}))});new ScrollMagic.Scene({triggerElement:".bar-chart",triggerHook:.6}).on("start",function(){d.play()}).reverse(!1).addTo(controller);$(".card").each(function(e){var t=this,n=new TimelineMax({paused:!0});n.to(t,.5,{autoAlpha:1,y:"=+50",ease:Bounce.easeInOut,zIndex:11});new ScrollMagic.Scene({triggerElement:t,triggerHook:.6}).on("start",function(){n.play()}).reverse(!1).addTo(controller)}),t("#contribute-destination .heading-1",.6,"zigzag"),e("#contribute-destination .text",.6,"up"),t("#more .text",.6,"zigzag"),e("#more .heading-3",.6,"right"),e("#more .heading-3",.6,"right"),e("#video-more",.6,"left"),e("#more .btn-1",.9,"down"),e("#more .btn-2",.9,"up")}$(function(){function e(){for(var e=$(window).width(),t=$(window).width(),n=[[0,0,190,100],[190,0,250,100],[440,0,200,250],[0,100,140,450],[140,100,300,300],[440,250,200,250],[0,550,140,350],[140,400,300,300],[440,500,200,200],[140,700,200,200],[340,700,300,300],[0,900,340,380],[340,1e3,200,200],[590,1140,100,280],[440,1240,200,80]],o=0;o<n.length;o++){var a=n[o][0]/640*e,r=n[o][1]/1280*t*2,i=n[o][3]*t/1280*2,c=i*n[o][2]/n[o][3],s=Math.floor(2*Math.random()),l=o+1,g=".pic-"+l,d=".pic-"+l+"-bg";$("#bg-img").append('<div class="pic-img pic-'+l+'-bg"><div class="lazyload pic-'+l+'" data-src="./img/hero/pic-'+l+'.png"></div></div>'),TweenMax.to(d,s,{x:a,y:r,width:c,height:i,transformOrigin:"50% 50%"}),TweenMax.to(g,s,{width:c,height:i,transformOrigin:"50% 50%"})}}e();var t=new TimelineMax({repeat:-1,repeatDelay:1}),n=$(".pic-img").toArray();n.sort(function(){return.5-Math.random()}),$(n).each(function(e){var n=$(this);Math.floor(2*Math.random());t.add(TweenMax.staggerTo(n.find(".lazyload"),.5*Math.random()+.2,{ease:Quad.easeInOut,scale:1.2,opacity:1},.5*Math.random()+.2)),t.add(TweenMax.staggerTo(n.find(".lazyload"),.5*Math.random()+.2,{ease:Quad.easeInOut,delay:1,scale:1,opacity:.5}))}),$(window).resize(function(){e()}),new ScrollMagic.Scene({triggerElement:".hero",triggerHook:.5}).reverse(!1).setTween(t).addTo(controller)}),$(function(){var e=navigator.userAgent.toLowerCase();e.indexOf("edge")>-1||e.indexOf("trident")>-1?($("img.lazyload").each(function(){$(this).attr("src",$(this).data("src"))}),$(".lazyload").not("img").each(function(){$(this).css("background-image",'url("'+$(this).data("src")+'")')})):lazyload();var t=$("#interview-popup");$("#popup-open").on("click",function(){t.fadeIn(400,function(){t.find("video")[0].play()})}),$("#popup-close").on("click",function(){t.fadeOut(400,function(){t.find("video")[0].pause()})});var n=$(".section-sns"),o=n.find(".section-sns-list a"),a=o.width();n.on("mouseenter mouseleave",function(e){var t=$(this).parent().hasClass("s-sense-body")?"down":$(this).parent(".sense-top-video").hasClass("layout-left")?"left":"right",n=$(this).find(".section-sns-list a");"mouseenter"===e.type?"down"===t?TweenMax.staggerTo(n,.4,{overwrite:1,opacity:1,cycle:{y:function(e){return a*(n.length-e)+10}}},.2):TweenMax.staggerTo(n,.4,{overwrite:1,cycle:{x:function(e){switch(t){case"left":return a*(n.length-e);case"right":return-a*(n.length-e)}}}},.2):"down"===t?TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,y:0,opacity:0},.2):TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,x:0},.2)}),o.on("click",function(e){e.preventDefault();var t=$(this),n=t.closest(".hash-section").attr("id"),o=t.attr("class"),a=$('meta[property="og:url"]').attr("content")+"#"+n;fnSendSns(o,a)});$("#localizing .btn").click(function(){var e=$(this);$(".hide-content.active").length>0?TweenMax.to(e,.5,{rotation:360,onComplete:function(){TweenMax.to(e,.5,{className:"-=close",onComplete:function(){TweenMax.to(e.parents(".content"),.5,{background:"#f4f4f4"}),TweenMax.to(e.prev(".hide-content"),.5,{className:"-=active",ease:Expo.easeInOut,transformOrigin:"50% 100%"})}})}}):TweenMax.to(e,.5,{rotation:360,onComplete:function(){TweenMax.to(e,.5,{className:"+=close",onComplete:function(){TweenMax.to(e.parents(".content"),.5,{background:"#fff"}),TweenMax.to(e.prev(".hide-content"),.5,{className:"+=active",ease:Expo.easeInOut,transformOrigin:"50% 100%"})}})}})});var r=0;$("#professor .btn").click(function(){var e=$(this);r++%2==0?TweenMax.to(e,.5,{rotation:360,onComplete:function(){TweenMax.to(e,.5,{className:"+=close"}),TweenMax.to(e.prev("#qna"),.5,{className:"+=active",ease:Expo.easeInOut,transformOrigin:"50% 100%"})}}):TweenMax.to(e,.5,{rotation:360,onComplete:function(){TweenMax.to(e,.5,{className:"-=close"}),TweenMax.to(e.prev("#qna"),.5,{className:"-=active",ease:Expo.easeInOut,transformOrigin:"50% 100%"})}})}),$(".video-play .play").on("click",function(e){e.preventDefault(),$(this).hide().next("video")[0].play()})});var controller=new ScrollMagic.Controller;$(function(){initScrollMagic()}),$(function(){$("#roof").height(),$(".s-sense-body").find(".original");var e=new Swiper("#infoSwiper",{spaceBetween:100,fadeEffect:{crossFade:!0},pagination:{el:".swiper-pagination",type:"bullets"}});e.on("slideChange",function(){0!=e.activeIndex?$(".swiper-pagination").addClass("enable"):$(".swiper-pagination").removeClass("enable")});new Swiper(".contribute",{speed:400,spaceBetween:100,autoplay:!1,pagination:{el:".swiper-pagination",type:"bullets"}})}),$(function(){$("#video-intro").find("video").attr({src:"http://cf.c.ooyala.com/U4cGJuZDE6UuOhe6PpnMz---HJoFAnPj/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa",controls:!0,controlsList:"nodownload",preload:"none",loop:!1,poster:""}),$("#video-fighter").find("video").attr({src:"http://cf.c.ooyala.com/o5bXdtZDE6Z-nWtRBIGp6ot3zDGpTbNW/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa",controls:!0,controlsList:"nodownload",preload:"none",loop:!1,poster:""}),$("#video-dancer").find("video").attr({src:"http://cf.c.ooyala.com/FsaXdtZDE6R_f1figA6Wb76LmLwbrS0f/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa",controls:!0,controlsList:"nodownload",preload:"none",loop:!1,poster:""}),$("#video-barista").find("video").attr({src:"http://cf.c.ooyala.com/U5aXdtZDE6CHLvKpez8ARxsyHm0HAe_r/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa",controls:!0,controlsList:"nodownload",preload:"none",loop:!1,poster:""}),$("#video-more").find("video").attr({src:"http://cf.c.ooyala.com/Z3aHdtZDE6BrkxscCuRM8SYspuClX464/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa",controls:!0,controlsList:"nodownload",preload:"none",loop:!1,poster:""})});
//# sourceMappingURL=script.js.map
