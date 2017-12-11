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
// window.addEventListener('load', initScrollMagic);

function initScrollMagic() {
  var roofHeight = $('#roof').height();

  //
  // #intro
  // 


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
    }, ease:Power1.easeOut}, 0);
  });
  
  var countUp = new ScrollMagic.Scene({
    triggerElement: '#info', 
    triggerHook: .5
  })
    .setTween(numTween)
    .reverse(false)
    .addTo(controller);
}