/*
* Nav 관련 스크립트
*
* JS Dependencies
* - ScrollMagic: http://scrollmagic.io
*    - ScrollMagic.min.js
*    - animation.gsap.min.js
*    - debug.addIndicators.min.js
* - TweenMax: https://greensock.com
*    - TweenMax.min.js
* */

window.addEventListener('load', function(){
  var $nav = $('#nav');
  if (!$nav.length) {
    return;
  }
  var $navLink = $nav.find('a');
  var duration = .4;
  var roofHeight = $('#roof').height();

  // nav 스크롤에 따른 활성화
  setTimeout(function(){ // 오감 슬라이더 scrollMagic 적용 후 높이 잡도록 setTimeout 설정
    var end = $('#outro').offset().top;

    $navLink.each(function(index){
      var $this = $(this);
      var start = $($this.attr('href')).offset().top;
      var height = $this.next('a').length ?  $($this.next('a').attr('href')).offset().top - start : end - start;

      // nav에 나온 섹션에서만 nav 보이기 - 인트로, 아웃트로에서는 nav 노출 안함
      if (index === 0) {
        new ScrollMagic.Scene({
          triggerElement: $this.attr('href'),
          triggerHook: 0,
          duration: end - start,
          offset: -roofHeight,
        })
          .setClassToggle('#nav', 'active')
          // .addIndicators({name: 'nav'})
          .addTo(controller);
      }

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
  }, 400);

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