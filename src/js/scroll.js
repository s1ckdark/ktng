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
  //     triggerElement: '#trigger',
  //     triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
  //     duration: 100, // '100%' = screen height
  //     offset: -roofHeight,
  //   })
  //   .setTween('#target', 1, {width: 100, ease: Linear.easeNone})
  //   .setPin('#sample')
  //   .setClassToggle('#sample', 'active')
  //   .addTo(controller);


  // 인터뷰 백그라운드 비디오 컨트롤
  //
  var interview = document.getElementById('interview');
  if (interview) {
    var interviewVideo = document.getElementById('video-interview-bg');
    new ScrollMagic.Scene(
      {
        triggerElement: interview,
        triggerHook: 1, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: window.innerHeight + interview.offsetHeight - roofHeight, // '100%' = screen height
      })
      .on('enter', function () {
        playBgVideo(interviewVideo);
      })
      .on('leave', function () {
        pauseVideo(interviewVideo);
      })
      // .addIndicators({name: 'interview video'})
      .addTo(controller);
  }

  // 오감 백그라운드 비디오 컨트롤
  //
  var senses = document.getElementById('senses');
  if (senses) {
    var sensesVideo = document.getElementById('video-senses-bg');
    new ScrollMagic.Scene(
      {
        triggerElement: senses,
        triggerHook: 1, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: window.innerHeight + senses.offsetHeight - roofHeight, // '100%' = screen height
      })
      .on('enter', function () {
        playBgVideo(sensesVideo);
      })
      .on('leave', function () {
        pauseVideo(sensesVideo);
      })
      // .addIndicators({name: 'senses video'})
      .addTo(controller);
  }

  // 화장품 판매 채널 트윈
  //
  var channels = document.getElementById('channels');
  if (channels) {
    var cHistoryActive = document.getElementById('channels-history-active');
    var cHistory = document.getElementById('channels-history');
    var hLiActive = cHistoryActive.getElementsByTagName('li');
    var hLi = cHistory.getElementsByTagName('li');
    var hLiHeight = hLi[0].offsetHeight;
    var channelsTl = new TimelineMax({delay: .5});

    for (var i = 0; i < hLiActive.length - 1; i++) {
      channelsTl.to(hLiActive[i], 1, {opacity: 0, yPercent: -100}); // 위 텍스트 올라가며 사라지기
      channelsTl.to(hLi[i], 1, {autoAlpha: 0}, '-=.8'); // 아래 목록 중 가장 위 텍스트 사라지며
      channelsTl.to(hLiActive[i+1], 1, {opacity: 1}, '-=.8'); // 위 영역 새로운 텍스트 보이기
      channelsTl.to(cHistory, 1, {y: -hLiHeight * (i+1)}, '-=.5'); // 아래 목록 위치 이동
      channelsTl.to({}, 1, {}); // 전환 완료
    }

    new ScrollMagic.Scene(
      {
        triggerElement: channels,
        triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: '500%', // '100%' = screen height
        offset: -roofHeight,
      })
      .setPin(channels)
      .setTween(channelsTl)
      // .addIndicators({name: 'channels'})
      .addTo(controller);
  }


  // 매출액 history 트윈
  //
  var history = document.getElementById('history');
  if (history) {
    var historyInner = document.getElementById('history-inner');
    new ScrollMagic.Scene(
      {
        triggerElement: history,
        triggerHook: .5, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: '90%', // '100%' = screen height
        offset: -roofHeight,
      })
      .setTween(historyInner, 1, {x: -1500})
      // .addIndicators({name: 'history'})
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
  $('.brand-identity a, #nav a, #nav-tips a').on('click', function (e) {
    e.preventDefault();

    var id = $(this).attr('href');
    var $id = $(id);
    var newpos;

    if ($id.length > 0) {
      newpos = $id.offset().top - $('#roof').outerHeight(); // header가 내용을 가리지 않게 위치 조정

      $('html, body').stop().animate({scrollTop: newpos}, 1000);

      // if supported by the browser we can even update the URL.
      // if (window.history && window.history.pushState) {
      //   history.pushState('', document.title, id);
      // }
    }
  });
}