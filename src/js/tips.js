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

  // 오감 백그라운드 비디오 컨트롤
  //
  var sensesVideo2 = document.getElementById('video-senses-bg');
  new ScrollMagic.Scene(
    {
      triggerElement: $introTips[0],
      triggerHook: 1, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
      duration: window.innerHeight + $introTips[0].offsetHeight - roofHeight, // '100%' = screen height
    })
    .on('enter', function () {
      playBgVideo(sensesVideo2);
      // 비디오 보이도록 배경이미지 없애기
      setTimeout(function(){
        $introTips.css('background-image', 'none');
      }, 2500);

      // intro text 트윈 - 한 번만 실행
      if (!$('html').hasClass('intro-text-tween')) {
        $('html').addClass('intro-text-tween');

        setTimeout(function(){
          new TimelineMax({delay: 1.5})
            .to($introTips.find('.inner > *'), .2, {opacity: 1}) // 로딩 중일 때 안보이다가 로딩 후 보이게 처리
            .from($introTips.find('.intro-tips-text .tween'), 1.2, {y: $introTips.find('.intro-tips-text').outerHeight(), ease: Power4.easeOut})
            .from($introTips.find('.intro-tips-header .tween'), 1.5, {y: -$introTips.find('.intro-tips-header').outerHeight(), ease: Power4.easeOut}, '-=.2');
        }, 1500);
      }
    })
    .on('leave', function () {
      pauseVideo(sensesVideo2);
    })
    // .addIndicators({name: 'intro tips video'})
    .addTo(controller);


  // tips nav
  //
  var $nav = $('#nav-tips');
  if (!$nav.length) {
    return;
  }
  var $navLink = $nav.find('a');
  var duration = .4;

  // nav pin
  if ($(window).height() >= 750) { // slider 헤더 가리지 않을 최소 높이 이상일 경우만 처리
    new ScrollMagic.Scene({
      triggerElement: $nav[0],
      triggerHook: 0,
      offset: -roofHeight,
    })
      .setPin($nav[0])
      // .addIndicators({name: 'nav link' + index})
      .addTo(controller);
  }

  // nav 스크롤에 따른 활성화
  setTimeout(function(){ // 오감 슬라이더 scrollMagic 적용 후 높이 잡도록 setTimeout 설정
    $navLink.each(function(){
      var $this = $(this);
      var height = $($this.attr('href')).height();

      // 각 섹션에서 해당 nav 링크 활성화하기
      new ScrollMagic.Scene({
        triggerElement: $this.attr('href'),
        triggerHook: 0,
        duration: height,
        offset: -roofHeight,
      })
        .setClassToggle(this, 'active')
        // .addIndicators({name: 'nav link' + index})
        .addTo(controller);
    });
  }, 800);

  // nav hover 이벤트
  $nav.hover(function(){
    // 한문 보이기
    new TimelineMax()
      .to($nav.find('.normal'), duration, {opacity: 0, ease: Linear.easeNone, overwrite: 1})
      .to($nav.find('.hover'), duration, {opacity: 1, ease: Linear.easeNone}, '-=' + duration/2);
  }, function(){
    // 한문 되돌리기
    new TimelineMax()
      .to($nav.find('.hover'), duration, {opacity: 0, ease: Linear.easeNone, overwrite: 1})
      .to($nav.find('.normal'), duration, {opacity: 1, ease: Linear.easeNone}, '-=' + duration/2);
  });
});