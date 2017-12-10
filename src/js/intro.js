// /*
// * Intro 영역 스크립트
// *
// * JS Dependencies
// * - ScrollMagic: http://scrollmagic.io
// *    - ScrollMagic.min.js
// *    - animation.gsap.min.js
// *    - debug.addIndicators.min.js
// * - TweenMax: https://greensock.com
// *    - TweenMax.min.js
// * */


$(function(){
  var screenWidth = $(window).width(), screenHeight = $(window).width() - 78;
  function convert(pos, ele){
    var pixels = ele;
    var percentage;
    if(pos == 'x') {
      percentage = pixels / screenWidth * 100; // 0.92%
    } else {
      percentage = pixels / screenHeight * 100; // 0.92%
    }
  }
  var img = [[0, 0, 80, 350], [80, 0, 350, 350], [430, 0, 300, 99], [730, 0, 200, 99], [930, 0, 250, 99], [1180, 0, 250, 250], [1430, 0, 170, 50], [1430, 50, 170, 450], [1380, 500, 220, 283], [1080, 700, 300, 83], [880, 700, 200, 83], [530, 550, 350, 233], [230, 550, 300, 233], [0, 349, 235, 434], [230, 350, 200, 200], [430, 100, 450, 450], [880, 100, 300, 300], [1180, 250, 250, 250], [1180, 500, 200, 200], [880, 400, 300, 300]];//1600, 783
  for (var i = 0; i<img.length; i++) {
    var posX = img[i][0] / 1600 * screenWidth;
    var posY = img[i][1] / 783 * screenHeight;
    var widthImg = img[i][2] / 1600 * screenWidth;;
    var heightImg = img[i][3] / 783 * screenHeight;
    var fileNum = i + 1;
    var file = '.pic-' + fileNum;
    $('#bg-img').append('<div class="lazyload pic-'+fileNum+ '" data-src="./img/hero/pic-'+fileNum+'.png"></div>');
    TweenMax.to(file, .5,{x:posX,y:posY,width:widthImg,height:heightImg});
  }
//   var $intro = $('#intro');
//   if (!$intro.length) {
//     return;
//   }
//   var $introBg = $('#intro-bg');
//   var $sales = $('#sales');
//   var introVideo = $introBg.find('video')[0];
//   var endPos = $sales.find('.door-content').offset().top;
//   var roofHeight = $('#roof').height();

//   // 인트로 글자, 배경 전환하기
//   new ScrollMagic.Scene(
//     {
//       triggerElement: $intro[0],
//       triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
//       duration: endPos, // '100%' = screen height
//       offset: -roofHeight,
//     })
//     .setTween(new TimelineMax({delay: .3})
//       .to($intro.find('.inner'), 1, {opacity: 0, ease: Linear.easeNone}) // intro 글자 사라지기
//       .to($introBg.find('.bg-sales'), .2, {opacity: 1, ease: Linear.easeNone}) // 방판 이미지 나타나기
//       .from($sales.find('.door-header'), .2, {opacity: 0, ease: Linear.easeNone}) // 방판 글자 나타나기
//       .to({}, 2, {}) // delay
//     )
//     // intro 백그라운드 영역 처리
//     .on('enter', function () {
//       // scroll 위치에 따라 화면 뒤에 따라붙이기
//       $introBg.addClass('fixed');

//       // intro text 트윈 - 한 번만 실행
//       if (!$('html').hasClass('intro-text-tween')) {
//         $('html').addClass('intro-text-tween');

//         setTimeout(function(){
//           new TimelineMax({delay: 1.5})
//             .to($intro.find('.inner > *'), .2, {opacity: 1}) // 로딩 중일 때 안보이다가 로딩 후 보이게 처리
//             .from($intro.find('.intro-header .tween'), 1.5, {y: $intro.find('.intro-header').outerHeight(), ease: Power4.easeOut})
//             .from($intro.find('.intro-text .tween'), 1.2, {y: -$intro.find('.intro-text').outerHeight(), ease: Power4.easeOut}, '-=.2');
//         }, 1500);
//       }
//     })
//     .on('leave', function () {
//       $introBg.removeClass('fixed');
//     })
//     // 비디오 보일때만 재생하기
//     .on('update', function () {
//       if ($introBg.find('.bg-sales').css('opacity') === '1') {
//         pauseVideo(introVideo);
//       } else {
//         playBgVideo(introVideo);
//       }
//     })
//     // .addIndicators({name: 'intro bg'})
//     .addTo(controller);
});