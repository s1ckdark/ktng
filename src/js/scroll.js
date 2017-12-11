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

  function upTween(e, hook){
    var $e = $(e);
    TweenMax.set($e, {opacity:0, y:30});
    $e.each(function(){
      var $this = this;
      var sectionTitTween = TweenMax.to($this, .8, {opacity:1, y:0});
      var sectionTitScene = new ScrollMagic.Scene({
        triggerElement: $this,
        triggerHook: hook
      })
        .setTween(sectionTitTween)
        .reverse(false)
        .addTo(controller);
    });
  }

  function tweenText(e, hook){
    var $e = $(e);
    $e.each(function(){
      var $this = this;
      var textTween = new SplitText($this, {type:'lines'});
      var tl = new TimelineMax({paused:true});
      tl.staggerFrom(textTween.lines, 0.5, {opacity:0, cycle:{x:[100, -100]}}, 0.2);
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

  tweenText('#intro .title', .6);

  //
  // interview-ltr
  //

  TweenMax.set('.type-ltr .interview-video', {autoAlpha:0, x:'-100'});
  TweenMax.set('.type-rtl .interview-video', {autoAlpha:0, x:'+100'});
  TweenMax.set('.bg-people', {autoAlpha:0, y:'+50'});


  // var professorTween = new TimelineMax({paused:true})
  //   .to('#professor .interview-video', .5, {autoAlpha:1, x:'=+100'})
  //   .to('#professor .bg-people', 1, {autoAlpha:1,y:'=-50'}); 

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

  tweenText('.interview .heading-1', .6);
  upTween('.interview-desc',.7);

  //
  // localizing
  //
  
  tweenText('#localizing .heading-1', .6);
  //
  // #info
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
    }, ease:Circ.easeOut}, 0);
  });
  
  var infoScene = new ScrollMagic.Scene({
    triggerElement: '#info .heading-1', 
    triggerHook: .5
  })
    .setTween(numTween)
    .reverse(false)
    .addTo(controller);

  upTween('#info .heading-1', .5);
  upTween('#info .text',.6);
}
