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
    spaceBetween: 100,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    fadeEffect: {
      crossFade: true
    },
  });

  TweenMax.set('#localizeSwiper .heading-1', {perspective:400});
  localizing.on('slideChangeTransitionStart', function(){
    TweenMax.set(['#localizeSwiper .heading-1', '#localizeSwiper .inner'], {opacity:0, y:30});
    TweenMax.set('#localizeSwiper img', {opacity:0, x:50});
  });
  localizing.on('slideChangeTransitionEnd', function () {
    ani();
  });

  // var $local = $('#localizing'), index = $('#localizeSwiper .swiper-slide').index(), slideLen = $('#localizeSwiper .swiper-slide').length, localH = $local.height();
  // $('#localizing, #localizeSwiper').css({height:localH});
  // var Slide = new ScrollMagic.Scene({
  //   triggerElement: '#localizeSwiper', 
  //   triggerHook:'onLeave',
  //   duration:localH*slideLen,
  // })
  //   .setPin('#localizeSwiper')
  //   .addTo(controller);

  // var localizeScene = new ScrollMagic.Scene({
  //   triggerElement: '#localizeSwiper', 
  //   offset:localH*index,
  // })
  //   .on('enter', function(){
  //     localizing.slideNext();
  //   })
  //   .reverse(true)
  //   .addTo(controller);

  function ani(){
    TweenMax.to('#localizeSwiper .heading-1', .5, {autoAlpha:1});
    TweenMax.to('#localizeSwiper .inner', .5, {autoAlpha:1, y:'=+30'});
    TweenMax.to('#localizeSwiper img', .5, {autoAlpha:1,x:'=-50'});
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