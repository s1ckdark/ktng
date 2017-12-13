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

  // TweenMax.set('#infoSwiper .heading-1', {perspective:400});
  // localizing.on('slideChangeTransitionStart', function(){
  //   TweenMax.set(['#infoSwiper .heading-1', '#infoSwiper .inner'], {opacity:0, y:30});
  //   TweenMax.set('#infoSwiper img', {opacity:0, x:50});
  // });
  // localizing.on('slideChangeTransitionEnd', function () {
  //   ani();
  // });

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