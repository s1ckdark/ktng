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


  var info = new Swiper('#infoSwiper', {
    spaceBetween: 100,
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });

  // info pagination enable/disable

  info.on('slideChange', function(){
    if(info.activeIndex != 0) {
      $('.swiper-pagination').addClass('enable');
    } else {
      $('.swiper-pagination').removeClass('enable');
    }
  });

  function ani(){
    TweenMax.to('#infoSwiper .heading-1', .5, {autoAlpha:1});
    TweenMax.to('#infoSwiper .inner', .5, {autoAlpha:1, y:'=+30'});
    TweenMax.to('#infoSwiper img', .5, {autoAlpha:1,x:'=-50'});
  }

  var contribute = new Swiper('.contribute', {
    speed: 400,
    spaceBetween: 100,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });
});