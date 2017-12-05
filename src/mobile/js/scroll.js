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

  // Scene 샘플
  // var scene = new ScrollMagic.Scene(
  //   {
  //     triggerElement: '#trigger,
  //     triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
  //     duration: 100, // '100%' = screen height
  //     offset: -100,
  //   })
  //   .setTween('#target', 1, {width: 100, ease: Linear.easeNone})
  //   .setPin('#sample')
  //   .setClassToggle('#sample', 'active')
  //   .addTo(controller);

  // 화장품 판매 채널 트윈
  //
  var channels = document.getElementById('channels');
  if (channels) {
    var cHistoryActive = document.getElementById('channels-history-active');
    var cHistory = document.getElementById('channels-history');
    var length = cHistoryActive.getElementsByTagName('li').length;

    new ScrollMagic.Scene(
      {
        triggerElement: channels,
        triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: (length * $(window).height() * .7) + 'px', // '100%' = screen height // %에서 px로 변경. iOS 스크롤 방향 바뀔때 스크롤 포지션 튀는 버그 잡기
        offset: -roofHeight,
      })
      .setPin(channels)
      .on('progress', function (e) {
        var index = parseInt(e.progress / (1/length)); // progress 값으로 현재 위치 알아내기
        var $listA = $(cHistoryActive).children();
        var $list = $(cHistory).children();

        if (index !== $(channels).data('index') && index !== length) {
          new TimelineMax()
            .to([$listA.not(':eq(' + index + ')'), $list.not(':eq(' + index + ')')], .3, {opacity: 0, overwrite: 1})
            .to([$listA.eq(index), $list.eq(index)], .3, {opacity: 1, overwrite: 1});

          $(channels).data('index', index);
        }
      })
      // .addIndicators({name: 'channels'})
      .addTo(controller);
  }


  // 스크롤 애니메이션 (공통 - 오감 영역)
  //
  var $animation = $('.animation-init');
  if ($animation.length) {
    $animation.each(function(){
      new ScrollMagic.Scene(
        {
          triggerElement: this,
          triggerHook: .7, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
          reverse: false,
        })
        .setClassToggle(this, 'animation-active')
        .on('start', function(e){
          // 단발성 스크롤매직 destroy
          e.target.destroy();
          e.target = null;
        })
        // .addIndicators({name: 'animation'})
        .addTo(controller);
    });
  }

  scrollToSection();
}

// Section Nav 링크 스크롤링
function scrollToSection () {
  $('.brand-identity a, #nav .inner a').on('click', function (e) {
    e.preventDefault();

    var id = $(this).attr('href');
    var $id = $(id);
    var newpos;

    if ($id.length > 0) {
      newpos = $id.offset().top - $('#roof').outerHeight(); // header가 내용을 가리지 않게 위치 조정

      $('html, body').stop().animate({scrollTop: newpos}, 500);

      // if supported by the browser we can even update the URL.
      // if (window.history && window.history.pushState) {
      //   history.pushState('', document.title, id);
      // }
    }
  });
}