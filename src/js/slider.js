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

  function ani(){
    TweenMax.to('#localizeOwl .heading-1', .5, {autoAlpha:1});
    TweenMax.to('#localizeOwl .inner', .5, {autoAlpha:1, y:'=+30'});
    TweenMax.to('#localizeOwl img', .5, {autoAlpha:1,x:'=-50'});
  }

  TweenMax.set('#localizeOwl .heading-1', {perspective:400});
  // TweenMax.set(['#localizeOwl .heading-1', '#localizeOwl .inner'], {opacity:0, y:30});
  // TweenMax.set('#localizeOwl img', {opacity:0, x:50});

  var $localize = $('#localizeOwl');
  $localize.owlCarousel({
    nav: true,
    dots: true,
    items: 1,
    loop:false,
    navClass:['owl-button-prev', 'owl-button-next'],
    center:true,
    navText: ['<span class="local-button-prev"></span>', '<span class="local-button-next"></span>']
  });

  $localize.on('initialized.owl.carousel changed.owl.carousel', function(event) {
    var item = event.item.index;
    TweenMax.set(['#localizeOwl .heading-1', '#localizeOwl .inner'], {opacity:0, y:30});
    TweenMax.set('#localizeOwl img', {opacity:0, x:50});
    ani();
  });

  var $contribute = $('.contribute');
  $contribute.owlCarousel({
    loop: true,
    dots: true,
    margin:30,
    items: 1,
    autoplay:true
  });
});