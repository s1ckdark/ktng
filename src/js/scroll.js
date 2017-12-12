/*
* Scroll 관련 스크립트
*
* JS Dependencies
* - ScrollMagic: http://scrollmagic.io
*    - ScrollMagic.min.js
*    - animation.gsap.min.js
*    - debug.addIndicators.min.js
* - TweenMax: https://greensock.com
*    - TweenMax.min.js
* */

// ScrollMagic 컨트롤러
var controller = new ScrollMagic.Controller();

$(function(){
  initScrollMagic();
});

function initScrollMagic() {
  var roofHeight = $('#roof').height();

  function moveTween(e, hook, direction){
    var $e = $(e), sectionTitTween;
    TweenMax.set($e, {perspective:400});
    $e.each(function(){
      var $this = this;
      if(direction =='up'){
        TweenMax.set($e, {opacity:0, y:+30});
        sectionTitTween = TweenMax.to($this, .8, {opacity:1, y:'=-30'});
      } else if(direction =='down'){
        TweenMax.set($e, {opacity:0, y:-30});
        sectionTitTween = TweenMax.to($this, .8, {opacity:1, y:'=+30'});
      } else if(direction == 'left') {
        TweenMax.set($e, {opacity:0, x:-30});
        sectionTitTween = TweenMax.to($this, .8, {opacity:1, x:'=+30'});
      } else if(direction == 'right') {
        TweenMax.set($e, {opacity:0, x:+30});
        sectionTitTween = TweenMax.to($this, .8, {opacity:1, x:'=-30'});
      }
      var sectionTitScene = new ScrollMagic.Scene({
        triggerElement: $this,
        triggerHook: hook
      })
        .setTween(sectionTitTween)
        .reverse(false)
        .addTo(controller);
    });
  }

  function textTween(e, hook, type){
    var $e = $(e);
    TweenMax.set($e, {perspective:400});
    $e.each(function(){
      var $this = this, textTween;
      var tl = new TimelineMax({paused:true});
      if(type=='zigzag')
      {
        textTween = new SplitText($this, {type:'lines'});
        tl.staggerFrom(textTween.lines, 0.5, {opacity:0, cycle:{x:[100, -100]}}, 0.2);
      } else if(type=='words') {
        textTween = new SplitText($this, {type:'words'});
        $(textTween.words).each(function(index, el){
          tl.staggerFrom(textTween.words, 0.6, {opacity:0, force3D:true}, index * 0.01);
          tl.staggerFrom(textTween.words, 0.6, {scale:index % 2 == 0  ? 0 : 2}, index * 0.01);
        });
      }  else if(type=='cwl') {
        textTween = new SplitText($this, {type:'chars, words, lines'});
        tl.staggerFrom(textTween.chars, 0.5, {autoAlpha:0, scale:4, force3D:true}, 0.01, 0.2);
      } else if(type=='twist') {
        textTween = new SplitText($this, {type:'chars, words'});
        tl.staggerFrom(textTween.chars, 0.6, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:'0% 50% -50',  ease:Back.easeOut}, 0.01, '+=0');
      }
      var textScene = new ScrollMagic.Scene({
        triggerElement: $this,
        triggerHook: hook
      })
        .on('start', function(){
          tl.play();
        })
        .reverse(false)
        .addTo(controller);
    });
  }
  //
  // hero
  //

  TweenMax.set('#hero-sub .heading-2', {autoAlpha:0, y:+30});

  var heroSubScene = new ScrollMagic.Scene({
    triggerElement: '#hero-sub', 
    triggerHook: .6
  })
    .on('enter', function(){
      TweenMax.to('#hero-sub .heading-2', .5, {autoAlpha:1,y:'=+30',onComplete:function(){
        TweenMax.to('#hero-sub .blue', .5, {color:'#3f8ee7'});
      }});
    })
    .reverse(true)
    .addTo(controller);

  var arrowTween = new TimelineMax({repeat:-1, yoyo:true});
  arrowTween.to('.intro-scroll', .5, {y:'=+50'});

  // var arrowScene = new ScrollMagic.Scene({
  //   triggerElement: '#hero', 
  //   triggerHook: .5
  // })
  //   .on('enter', function(){
  //     arrowTween.play();
  //   })
  //   .reverse(true)
  //   .addTo(controller);

  //
  // #intro
  // 
  TweenMax.set('#video-intro', {autoAlpha:0, x:'-100'});
  TweenMax.set('#intro .text', {autoAlpha:0, x:'+100'});
  TweenMax.set('#intro .col:nth-child(2)', {autoAlpha:0});
  var introTween = new TimelineMax({paused:true})
    .to('#video-intro', .5, {autoAlpha:1,x:'=+100'})
    .to('#intro .col:nth-child(2)', .5, {autoAlpha:1})
    .to('#intro .text', .5, {autoAlpha:1, x:'=+100'});

  var introScene = new ScrollMagic.Scene({
    triggerElement: '#intro', 
    triggerHook: .6
  })
    .on('enter', function(){
      introTween.play();
    })
    .reverse(false)
    .addTo(controller);

  textTween('#intro .title', .6, 'zigzag');

  //
  // interview-ltr
  //

  TweenMax.set('.type-ltr .interview-video', {autoAlpha:0, x:'-100'});
  TweenMax.set('.type-rtl .interview-video', {autoAlpha:0, x:'+100'});
  TweenMax.set('.bg-people', {autoAlpha:0, y:'+50'});



  //
  // interview-fighter
  // 
  var fighterTween = new TimelineMax({paused:true})
    .to('#fighter .interview-video', .5, {autoAlpha:1, x:'=+100'})
    .to('#fighter .bg-people', 1, {autoAlpha:1,y:'=-50'});
    
  var fighterScene = new ScrollMagic.Scene({
    triggerElement: '#fighter', 
    triggerHook: .6
  })
    .on('enter', function(){
      fighterTween.play();
    })
    .reverse(true)
    .addTo(controller);
  
  //
  // interview-dancer
  // 
  var dancerTween = new TimelineMax({paused:true})
    .to('#dancer .interview-video', .5, {autoAlpha:1, x:'=+100'})
    .to('#dancer .bg-people', 1, {autoAlpha:1,y:'=-50'});
 
  var dancerScene = new ScrollMagic.Scene({
    triggerElement: '#dancer', 
    triggerHook: .6
  })
    .on('enter', function(){
      dancerTween.play();
    })
    .reverse(true)
    .addTo(controller);
  
  //
  // interview-barista
  //
  var baristaTween = new TimelineMax({paused:true})
    .to('#barista .interview-video', .5, {autoAlpha:1, x:'=+100'})
    .to('#barista .bg-people', 1, {autoAlpha:1,y:'=-50'});  

  var baristaScene = new ScrollMagic.Scene({
    triggerElement: '#barista', 
    triggerHook: .6
  })
    .on('enter', function(){
      baristaTween.play();
    })
    .reverse(true)
    .addTo(controller);

  //
  // interview-professor
  //

  var professorTween = new TimelineMax({paused:true})
    .to('#professor .interview-video', .5, {autoAlpha:1, x:'=+100'})
    .to('#professor .bg-people', 1, {autoAlpha:1,y:'=-50'}); 
  
  
  var professorScene = new ScrollMagic.Scene({
    triggerElement: '#professor', 
    triggerHook: .6
  })
    .on('enter', function(){
      professorTween.play();
    })
    .reverse(true)
    .addTo(controller);
  
  moveTween('.interview .sub-heading-2', .6, 'up');
  textTween('.interview .heading-2', .6, 'zigzag');
  //
  // interview-common
  //

  textTween('.interview .heading-1', .6, 'zigzag');
  moveTween('.interview-desc',.7, 'up');
  
  //
  // localizing
  //
  
  textTween('#localizing .heading-1', .6, 'zigzag');
  moveTween('#localizing .text', .6, 'left');
  moveTween('#localizing img', .6, 'right');

  //
  // sangsang-univ
  //

  TweenMax.set(['#sangsang-univ .icon', '#sangsang-univ .icon icon-*','#sangsang-univ .text'], {autoAlpha:0, y:+30});
  TweenMax.set(['#sangsang-univ .col', '#sangsang-univ .descText'], {autoAlpha:0});
  textTween('#sangsang-univ .heading-1', .6, 'cwl');
  moveTween('#sangsang-univ .sub-title', .6, 'down');
  
  var sangsangUnivTween = new TimelineMax({paused:true})
    .to('#sangsang-univ .col', .5, {autoAlpha:1, y:'=-30', onComplete:function(){
      drawIcon.play();}});

  
  var drawIcon = new TimelineMax({paused:true});
  drawIcon.to('#sangsang-univ .icon', .5, {ease:Bounce.easeIn,autoAlpha:1,onComplete:iconic});
  function iconic(){
    TweenMax.to('#sangsang-univ icon div', .5, {autoAlpha:0, ease:Bounce.easeInOut,y:'=+30'});
    TweenMax.to('#sangsang-univ .descText', .5, {autoAlpha:1,y:'=+30'});
    TweenMax.to('#sangsang-univ .bold', .5, {autoAlpha:1,y:'=+30'});
    TweenMax.to('#sangsang-univ .text', .5, {autoAlpha:1,y:'=+30'});
    TweenMax.from('#sangsang-univ path', 1, {autoAlpha:0,drawSVG:'0%',fill:'none'});
    TweenMax.from('#sangsang-univ circle', 1, {delay:1,autoAlpha:0,drawSVG:'0%',fill:'none'});
    TweenMax.from('#sangsang-univ text', 1, {delay:1,autoAlpha:0,drawSVG:'0%'});
  }
  var sangsangUnivScene = new ScrollMagic.Scene({
    triggerElement: '#sangsang-univ .container', 
    triggerHook: .6
  })
    .on('enter', function(){
      sangsangUnivTween.play();
    })
    .reverse(true)
    .addTo(controller);
 
  //
  // curriculum
  //

  textTween('#curriculum .heading-1', .6);
  moveTween('#curriculum .text', .6, 'up');

  //
  // sangsang-madang
  //

  textTween('#sangsang-madang .heading-1', .6, 'cwl');
  textTween('#sangsang-madang .text', .7, 'twist');
  moveTween('#artist-1',.6, 'left');
  moveTween('#artist-2',.6, 'right');
  moveTween('.bg-circle',.6, 'down');

  //
  // info
  //
  // TweenMax.set($('#info .number'), {opacity:0});
  var $infoNum = $('.info-num'), counter = { var:0 };
 
  function numberWithCommas(n) {
    var parts=n.toString().split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var numTween = new TimelineMax();
  $infoNum.each(function(){
    var counter = { var:0 }, $this = $(this), numMax = $this.data('count');
    numTween.to(counter, 2, {var:numMax, onUpdate:function(){
      var nwc = numberWithCommas(counter.var);
      $this.text(nwc);
    }, ease:Expo.easOut}, 0);
  });
  
  var infoScene = new ScrollMagic.Scene({
    triggerElement: '#info .heading-1', 
    triggerHook: .5
  })
    .setTween(numTween)
    .reverse(false)
    .addTo(controller);

  moveTween('#info .heading-1', .5, 'up');
  moveTween('#info .text',.6, 'up');

  //
  // contribute-timeline
  //

  textTween('#contribute-timeline .heading-1',.6, 'zigzag');
  TweenMax.set('.odd .card', {autoAlpha:0, x:50});
  TweenMax.set('.even .card', {autoAlpha:0, x:-50});

  // $('.card').each(function(e){
  //   var $this = this, movePos;
  //   var tl = new TimelineMax({paused:true});
  //   if($this.parents().hasClass('odd')){
  //     movePos = '=-50';
  //   } else {
  //     movePos = '=+50';
  //   }
  //   tl.to($this, .5, {autoAlpha:1,x:movePos});
  //   var cardScene = new ScrollMagic.Scene({
  //     triggerElement: $this,
  //     triggerHook: .6,
  //   })
  //     .on('start', function(){
  //       tl.play();
  //     })
  //     .reverse(false)
  //     .addTo(controller);
  // });


  $('.odd .card').each(function(e){
    var $this = this, movePos;
    var tl = new TimelineMax({paused:true});
    movePos = '=-50';
    tl.to($this, .5, {autoAlpha:1,x:movePos,ease:Bounce.easeInOut,zIndex:11});
    var cardScene = new ScrollMagic.Scene({
      triggerElement: $this,
      triggerHook: .6,
    })
      .on('start', function(){
        tl.play();
      })
      .reverse(false)
      .addTo(controller);
  });

  $('.even .card').each(function(e){
    var $this = this, movePos;
    var tl = new TimelineMax({paused:true});
    movePos = '=+50';
    tl.to($this, .5, {autoAlpha:1,x:movePos,ease:Bounce.easeInOut,zIndex:11});
    var cardScene = new ScrollMagic.Scene({
      triggerElement: $this,
      triggerHook: .6,
    })
      .on('start', function(){
        tl.play();
      })
      .reverse(false)
      .addTo(controller);
  });

  //
  // contribute-destination
  //

  textTween('#contribute-destination .heading-1',.6, 'zigzag');
  moveTween('#contribute-destination .text',.6, 'up');

  //
  // more
  //

  textTween('#more .text',.6, 'zigzag');
  moveTween('#more .heading-3',.6, 'right');
  moveTween('#more .heading-3',.6, 'right');
  moveTween('#video-more',.6, 'left');
  moveTween('#more .btn-1',.8, 'down');
  moveTween('#more .btn-2',.8, 'up');
}
