function initScrollMagic(){function e(e,t){var n=$(e);TweenMax.set(n,{opacity:0,y:30}),n.each(function(){var e=this,n=TweenMax.to(e,.8,{opacity:1,y:0});new ScrollMagic.Scene({triggerElement:e,triggerHook:t}).setTween(n).reverse(!1).addTo(controller)})}function t(e,t){$(e).each(function(){var e=this,n=new SplitText(e,{type:"lines"}),a=new TimelineMax({paused:!0});a.staggerFrom(n.lines,.5,{opacity:0,cycle:{x:[100,-100]}},.2);new ScrollMagic.Scene({triggerElement:e,triggerHook:t}).on("start",function(){a.play()}).reverse(!1).addTo(controller)})}function n(e){return e.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")}$("#roof").height();TweenMax.set("#video-intro",{autoAlpha:0,x:"-100"}),TweenMax.set("#intro .text",{autoAlpha:0,x:"+100"}),TweenMax.set("#intro .col:nth-child(2)",{autoAlpha:0});var a=new TimelineMax({paused:!0}).to("#video-intro",.5,{autoAlpha:1,x:"=+100"}).to("#intro .col:nth-child(2)",.5,{autoAlpha:1}).to("#intro .text",.5,{autoAlpha:1,x:"=+100"});new ScrollMagic.Scene({triggerElement:"#intro",triggerHook:.6}).on("enter",function(){a.play()}).reverse(!1).addTo(controller);t("#intro .title",.6),TweenMax.set(".type-ltr .interview-video",{autoAlpha:0,x:"-100"}),TweenMax.set(".type-rtl .interview-video",{autoAlpha:0,x:"+100"}),TweenMax.set(".bg-people",{autoAlpha:0,y:"+50"});var i=new TimelineMax({paused:!0}).to("#fighter .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#fighter .bg-people",1,{autoAlpha:1,y:"=-50"}),o=(new ScrollMagic.Scene({triggerElement:"#fighter",triggerHook:.6}).on("enter",function(){i.play()}).reverse(!0).addTo(controller),new TimelineMax({paused:!0}).to("#dancer .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#dancer .bg-people",1,{autoAlpha:1,y:"=-50"})),r=(new ScrollMagic.Scene({triggerElement:"#dancer",triggerHook:.6}).on("enter",function(){o.play()}).reverse(!0).addTo(controller),new TimelineMax({paused:!0}).to("#barista .interview-video",.5,{autoAlpha:1,x:"=+100"}).to("#barista .bg-people",1,{autoAlpha:1,y:"=-50"}));new ScrollMagic.Scene({triggerElement:"#barista",triggerHook:.6}).on("enter",function(){r.play()}).reverse(!0).addTo(controller);t(".interview .heading-1",.6),e(".interview-desc",.7),t("#localizing .heading-1",.6);var l=$(".info-num"),c=new TimelineMax;l.each(function(){var e={var:0},t=$(this),a=t.data("count");c.to(e,2,{var:a,onUpdate:function(){var a=n(e.var);t.text(a)},ease:Circ.easeOut},0)});new ScrollMagic.Scene({triggerElement:"#info .heading-1",triggerHook:.5}).setTween(c).reverse(!1).addTo(controller);e("#info .heading-1",.5),e("#info .text",.6)}$(function(){function e(){for(var e=0;e<a.length;e++){var i=a[e][0]/1600*t,o=a[e][1]/783*n/2,r=a[e][2]/1600*t,l=a[e][3]/783*n/2,c=Math.floor(2*Math.random()),s=e+1,g=".pic-"+s,d=".pic-"+s+"-bg";$("#bg-img").append('<div class="pic-img pic-'+s+'-bg"><div class="lazyload pic-'+s+'" data-src="./img/hero/pic-'+s+'.png"></div></div>'),TweenMax.to(d,c,{x:i,y:o,width:r,height:l,transformOrigin:"50% 50%"}),TweenMax.to(g,c,{width:r,height:l,transformOrigin:"50% 50%"})}}var t=$(window).width(),n=$(window).width(),a=[[0,0,80,350],[80,0,350,350],[430,0,300,99],[730,0,200,99],[930,0,250,99],[1180,0,250,250],[1430,0,170,50],[1430,50,170,450],[1380,500,220,283],[1080,700,300,83],[880,700,200,83],[530,550,350,233],[230,550,300,233],[0,349,235,434],[230,350,200,200],[430,100,450,450],[880,100,300,300],[1180,250,250,250],[1180,500,200,200],[880,400,300,300]];e();var i=new TimelineMax({repeat:-1,repeatDelay:1});$(".pic-img").each(function(e){var t=$(this);Math.floor(19*Math.random()),Math.floor(2*Math.random());i.add(TweenMax.staggerTo(t.find(".lazyload"),.5*Math.random()+.5,{ease:Quad.easeInOut,scale:1.2,opacity:1},.5*Math.random()+.5)),i.add(TweenMax.staggerTo(t.find(".lazyload"),.5*Math.random()+.5,{ease:Quad.easeInOut,delay:1,scale:1,opacity:.5}))}),$(window).resize(function(){e()}),new ScrollMagic.Scene({triggerElement:".hero",triggerHook:.5}).reverse(!1).setTween(i).addTo(controller)}),"object"==typeof WebFont&&WebFont.load({google:{families:["Merriweather:400,300"],text:"1234567890.,~"}}),$(function(){var e=navigator.userAgent.toLowerCase();e.indexOf("edge")>-1||e.indexOf("trident")>-1?($("img.lazyload").each(function(){$(this).attr("src",$(this).data("src"))}),$(".lazyload").not("img").each(function(){$(this).css("background-image",'url("'+$(this).data("src")+'")')})):lazyload();var t=$("#interview-popup");$("#popup-open").on("click",function(){t.fadeIn(400,function(){t.find("video")[0].play()})}),$("#popup-close").on("click",function(){t.fadeOut(400,function(){t.find("video")[0].pause()})});var n=$(".section-sns"),a=n.find(".section-sns-list a"),i=a.width();n.on("mouseenter mouseleave",function(e){var t=$(this).parent().hasClass("s-sense-body")?"down":$(this).parent(".sense-top-video").hasClass("layout-left")?"left":"right",n=$(this).find(".section-sns-list a");"mouseenter"===e.type?"down"===t?TweenMax.staggerTo(n,.4,{overwrite:1,opacity:1,cycle:{y:function(e){return i*(n.length-e)+10}}},.2):TweenMax.staggerTo(n,.4,{overwrite:1,cycle:{x:function(e){switch(t){case"left":return i*(n.length-e);case"right":return-i*(n.length-e)}}}},.2):"down"===t?TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,y:0,opacity:0},.2):TweenMax.staggerTo(n.get().reverse(),.4,{overwrite:1,x:0},.2)}),a.on("click",function(e){e.preventDefault();var t=$(this),n=t.closest(".hash-section").attr("id"),a=t.attr("class"),i=$('meta[property="og:url"]').attr("content")+"#"+n;fnSendSns(a,i)})});var controller=new ScrollMagic.Controller;$(function(){initScrollMagic()}),$(function(){$("#roof").height(),$(".s-sense-body").find(".original");var e=new Swiper("#localizeSwiper",{speed:400,spaceBetween:100,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});TweenMax.set(["#localizeSwiper .heading-1","#localizeSwiper .inner","#localizeSwiper img"],{opacity:0,y:30});var t=new SplitText("#localizeSwiper .heading-1",{type:"lines"}),n=new TimelineMax({paused:!0});n.staggerFrom(t.lines,.5,{opacity:0,cycle:{x:[100,-100]}},.2),e.on("slideChange",function(){n.play()});new Swiper(".contribute",{speed:400,spaceBetween:100,autoplay:!0,pagination:{el:".swiper-pagination",type:"bullets"}})});
//# sourceMappingURL=script.js.map
