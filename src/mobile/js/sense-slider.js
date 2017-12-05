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

  // dynamic numbering
  $bodies.find('.sense-slider-header > .heading').each(function(){
    var index = $(this).index();
    $(this).find('.num').text('0' + (index + 1));
  });

  // 내부 슬라이더 셋팅
  // vision - color slider
  // smell - perfume slider
  $('.color-slider, .perfume-slider').owlCarousel({
    loop: true,
    nav: true,
    dots: true,
    dotsData: true,
    lazyLoad: true,
    items: 1,
    mouseDrag: false,
    navText: ['&lt;', '&gt;'],
    smartSpeed: 0,
    dragEndSpeed: 400,
  });

  // 오감 슬라이더 헤더 셋팅 - 애니메이션용
  var $headings = $('.sense-slider-header .heading');
  var wordWidth = 25;
  new SplitText($headings, {type: 'chars,words', wordsClass: 'word', charsClass: 'char-outer'});
  new SplitText($headings, {type: 'chars', charsClass: 'char'}); // 두번 감싸기
  TweenMax.set($headings.find('.char'), {x: wordWidth});

  // 각 감각마다 처리하기
  $bodies.each(function(){
    var $body = $(this);
    var $slider = $body.find('.sense-slider');
    var $slides = $slider.find(' > .box');
    var length = $slides.length;
    var $sliderDots = $('<div class="sense-slider-dots"/>').insertAfter($slider);
    var $headings = $body.find('.sense-slider-header .heading');
    var height = $body.outerHeight();
    var scroll;
    // 첫번째 슬라이드 활성화
    $slides.filter(':first-child').addClass('visible');
    TweenMax.set($slides.filter(':not(:first-child)'), {xPercent: 100});

    // dots 설정
    $slides.each(function(index){
      $sliderDots.append('<div class="dot">0' + (index+1) + '</div>');
    });
    $sliderDots = $sliderDots.find('.dot');
    if (length <= 1) {$sliderDots.css('visibility', 'hidden');}

    function toSlide(index, scrollDirection) {
      var isForward = scrollDirection === 'FORWARD';
      // header tweens
      // 기존 타이틀 숨기기
      TweenMax.to($headings.filter('.visible').find('.char'), .5, {x: isForward ? -wordWidth : wordWidth, overwrite: 1});
      $headings.filter('.visible').removeClass('visible');
      // 현재 타이틀 보이기
      TweenMax.to($headings.eq(index).find('.char'), .5, {x: 0, overwrite: 1, delay: .5});
      $headings.eq(index).addClass('visible');

      // slider tweens
      //
      // 기존 슬라이드 숨기기
      TweenMax.to($slides.filter('.visible'), .5, {xPercent: isForward ? -100 : 100, overwrite: 1});
      $slides.filter('.visible').removeClass('visible');
      // 현재 슬라이드 보이기
      TweenMax.to($slides.eq(index), .5, {xPercent: 0, overwrite: 1});
      $slides.eq(index).addClass('visible');

      // dots 활성화
      $sliderDots.eq(index).addClass('active').siblings('.active').removeClass('active');
    }

    scroll = new ScrollMagic.Scene(
      {
        triggerElement: $body[0],
        triggerHook: 0, // 'onLeave' 0, 'onCenter' 0.5, 'onEnter' 1
        duration: (length * height * .6) + 'px', // '100%' = screen height // %에서 px로 변경. iOS 스크롤 방향 바뀔때 스크롤 포지션 튀는 버그 잡기
        offset: -roofHeight,
      })
      .setPin($body[0])
      .on('progress', function (e) {
        var index = parseInt(e.progress / (1/length)); // progress 값으로 현재 위치 알아내기
        if (index !== $body.data('index') && index !== length) {
          toSlide(index,  e.scrollDirection);
          $body.data('index', index);
        }
      })
      // .addIndicators({name: 'slider' + index})
      .addTo(controller);


    // slider nav
    //
    function scrollToSlide(index){
      var pos = scroll.duration() * (1 / length * (index + .5)); // index 중간으로 잡기
      $('html, body').stop().animate({scrollTop: scroll.scrollOffset() + pos}, 1000);
    }

    $sliderDots.on('click', function(){
      var $this = $(this);
      var index = $this.index(); // 현재 슬라이드 인덱스
      if (!$this.hasClass('active')) {
        scrollToSlide(index);
      }
    });
  });
});