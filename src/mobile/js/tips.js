/*
* Tips 페이지 스크립트
*
* JS Dependencies
* - ScrollMagic: http://scrollmagic.io
*    - ScrollMagic.min.js
*    - animation.gsap.min.js
*    - debug.addIndicators.min.js
* - TweenMax: https://greensock.com
*    - TweenMax.min.js
* */


$(function(){
  var $introTips = $('#intro-tips');
  if (!$introTips.length) {
    return;
  }
  var roofHeight = $('#roof').height();

  // 인트로 글자, 배경 전환하기
  new ScrollMagic.Scene(
    {
      triggerElement: $introTips[0],
      triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
      duration: $introTips.height(), // '100%' = screen height
      offset: -roofHeight,
    })
    .on('enter', function () {
      // 한 번만 실행
      if (!$('html').hasClass('intro-text-tween')) {
        $('html').addClass('intro-text-tween');

        // bg-intro-tips.jpg -> bg-intro-tips.gif 불러오고 교체하기
        var img = new Image();
        img.onload = function(){
          $introTips.css('background-image', 'url("./img/senses/bg-intro-tips.gif")');
        };
        img.src = './img/senses/bg-intro-tips.gif';

        // intro text 트윈
        setTimeout(function(){
          new TimelineMax({delay: 1.5})
            .to($introTips.find('.inner > *'), .2, {opacity: 1}) // 로딩 중일 때 안보이다가 로딩 후 보이게 처리
            .from($introTips.find('.intro-tips-text .tween'), 1.2, {y: $introTips.find('.intro-tips-text').outerHeight(), ease: Power4.easeOut})
            .from($introTips.find('.intro-tips-header .tween'), 1.5, {y: -$introTips.find('.intro-tips-header').outerHeight(), ease: Power4.easeOut}, '-=.2');
        }, 1500);
      }
    })
    // .addIndicators({name: 'intro bg'})
    .addTo(controller);
});