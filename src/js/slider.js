/*
* 오감 슬라이더 관련 스크립트
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

  var roofHeight = $('#roof').height();
  var $bodies = $('.s-sense-body');
  var $original = $bodies.find('.original');


  var localizing = new Swiper('#localizeSwiper', {
    speed: 400,
    spaceBetween: 100
  });

  // // dynamic numbering
  // $bodies.find('.sense-slider-header > .heading').each(function(){
  //   var index = $(this).index();
  //   $(this).find('.num').text('0' + (index + 1));
  // });
  // $bodies.find('.sense-slider > .box').each(function(){
  //   var index = $(this).index();
  //   $(this).attr('data-dot', '0' + (index + 1));
  // });

  // // copy 만들기
  // $original.each(function(){
  //   var $org = $(this);
  //   if ($org.find('.sense-slider-header .heading').length > 1) {
  //     var $copy = $org.clone().addClass('copy').removeClass('original');
  //     $copy.find('.sense-slider-header .heading:first-child').remove();
  //     $copy.find('.sense-slider .box:first-child').remove();
  //     $org.after($copy);
  //   }
  // });

  // // 오감 슬라이더 셋팅
  // var $sliders = $('.sense-slider');
  // $sliders.owlCarousel({
  //   loop: false,
  //   nav: true,
  //   dots: true,
  //   dotsData: true,
  //   items: 1,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   smartSpeed: 600,
  // });

  // // 내부 슬라이더 셋팅
  // // vision - color slider
  // // smell - perfume slider
  // $('.color-slider, .perfume-slider').owlCarousel({
  //   loop: true,
  //   nav: true,
  //   dots: true,
  //   dotsData: true,
  //   items: 1,
  //   mouseDrag: false,
  //   navText: ['&lt;', '&gt;'],
  //   smartSpeed: 0,
  // });

  // // 오감 슬라이더 헤더 셋팅 - 애니메이션용
  // var $headings = $('.sense-slider-header .heading');
  // var wordWidth = 30;
  // new SplitText($headings, {type: 'chars,words', wordsClass: 'word', charsClass: 'char-outer'});
  // new SplitText($headings, {type: 'chars', charsClass: 'char'}); // 두번 감싸기
  // TweenMax.set($headings.find('.char'), {x: wordWidth});

  // // 각 감각마다 처리하기
  // $bodies.each(function(){
  //   var $body = $(this);
  //   var $slider = $body.find('.sense-slider');
  //   var $sliderNav = $slider.find('> .owl-nav > *');
  //   var $sliderDots = $slider.find('> .owl-dots > *');
  //   var $orgHeadings = $body.find('.original .sense-slider-header .heading');
  //   var $copyHeadings = $body.find('.copy .sense-slider-header .heading');
  //   var length = $body.find('.original .sense-slider > .owl-dots .owl-dot').length;
  //   var scroll;

  //   function toSlide(index, scrollDirection) {
  //     var isForward = scrollDirection === 'FORWARD';
  //     // header tweens
  //     // 기존 타이틀 숨기기
  //     TweenMax.to([$orgHeadings.filter('.visible').find('.char'), $copyHeadings.filter('.visible').find('.char')], .5, {x: isForward ? -wordWidth : wordWidth, overwrite: 1});
  //     $copyHeadings.filter('.visible').removeClass('visible');
  //     $orgHeadings.filter('.visible').removeClass('visible');
  //     // 현재 타이틀 보이기
  //     TweenMax.to([$copyHeadings.eq(index).find('.char'), $orgHeadings.eq(index).find('.char')], .5, {x: 0, overwrite: 1, delay: .5});
  //     $copyHeadings.eq(index).addClass('visible');
  //     $orgHeadings.eq(index).addClass('visible');

  //     // slider tweens
  //     if (index === length - 1) { // 마지막 슬라이드
  //       $body.addClass('last'); // .copy 영역 숨기기
  //       $slider.eq(0).trigger('to.owl.carousel', [index]); // .original 슬라이더만 이동
  //     } else {
  //       $body.removeClass('last'); // .copy 영역 보이기
  //       $slider.trigger('to.owl.carousel', [index]);  // .original, .copy 슬라이더 함께 이동
  //     }

  //     // smell - 두번째 슬라이드에서 배경이미지 교체
  //     if ($body.hasClass('smell')) {
  //       $body[index === 1 ? 'addClass' : 'removeClass']('bg2');
  //     }
  //   }

  //   scroll = new ScrollMagic.Scene(
  //     {
  //       triggerElement: $body[0],
  //       triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
  //       duration: (length * 100) + '%', // '100%' = screen height
  //       offset: -roofHeight,
  //     })
  //     .setPin($body[0])
  //     .on('progress', function (e) {
  //       var index = parseInt(e.progress / (1/length)); // progress 값으로 현재 위치 알아내기
  //       if (index !== $body.data('index') && index !== length) {
  //         toSlide(index,  e.scrollDirection);
  //         $body.data('index', index);
  //       }
  //     })
  //     // .addIndicators({name: 'slider' + index})
  //     .addTo(controller);


  //   // slider nav
  //   //
  //   function scrollToSlide(index){
  //     var pos = scroll.duration() * (1 / length * (index + .5)); // index 중간으로 잡기
  //     $('html, body').stop().animate({scrollTop: scroll.scrollOffset() + pos}, 1000);
  //   }

  //   $sliderNav.on('click', function(){
  //     var isPrev = $(this).hasClass('owl-prev');
  //     var index = $body.data('index'); // 현재 슬라이드 인덱스
  //     if (typeof index === 'number') {
  //       index = isPrev ? index - 1 : index + 1;
  //       if (0 <= index && index < length) {
  //         scrollToSlide(index);
  //       }
  //     }
  //   });
  //   $sliderDots.on('click', function(){
  //     var index = $(this).index(); // 현재 슬라이드 인덱스
  //     scrollToSlide(index);
  //   });
  // });
});