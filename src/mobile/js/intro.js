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
  function positioning(){
    var screenWidth = $(window).width(), screenHeight = $(window).height();
    function convert(pos, ele){
      var pixels = ele;
      var percentage;
      if(pos == 'x') {
        percentage = pixels / screenWidth * 100; // 0.92%
      } else {
        percentage = pixels / screenHeight * 100; // 0.92%
      }
    }
    var img = [[0, 0, 190, 100], [190, 0, 250, 100], [440, 0, 200, 250], [0, 100, 140, 450], [140, 100, 300, 300], [440, 250, 200, 250], [0, 550, 140, 350], [140, 400, 300, 300], [440, 500, 200, 200], [140, 700, 200, 200], [340, 700, 300, 300], [0, 900, 340,380],[340, 1000, 200,200],[590, 1140, 100,280],[440, 1240, 200,80]];
    //640, 1280
    for (var i = 0; i<img.length; i++) {
      // var posX = img[i][0] / 640 * screenWidth;
      // var posY = img[i][1] / 1280 * screenHeight;
      // var heightImg = img[i][3] / 1280 * screenHeight;
      // var widthImg = img[i][2 ] / 640 * screenWidth;     

      var posX = img[i][0] / 640 * screenWidth;
      var posY = img[i][1] / 1280 * screenHeight;
      var heightImg = img[i][3] * screenHeight / 1280;
      var widthImg = heightImg * img[i][2] / img[i][3];
      var random = Math.floor(Math.random() * 2);
      var fileNum = i + 1;
      var file = '.pic-' + fileNum, filebox = '.pic-'+ fileNum +'-bg';
      $('#bg-img').append('<div class="pic-img pic-'+ fileNum +'-bg"><div class="lazyload pic-'+fileNum+ '" data-src="./img/hero/pic-'+fileNum+'.png"></div></div>');
      TweenMax.to(filebox, random,{x:posX,y:posY,width:widthImg,height:heightImg,transformOrigin:'50% 50%'});
      TweenMax.to(file, random,{width:widthImg,height:heightImg,transformOrigin:'50% 50%'});
    }
  }
  positioning();
  var imgTween = new TimelineMax({repeat:-1,repeatDelay:1});
  var elements = $('.pic-img').toArray();
  elements.sort(function(){return 0.5-Math.random();});
  var $elements = $(elements);
  $elements.each(function(i){
    var $this = $(this), dur = Math.floor(Math.random() * 2);
    imgTween.add(TweenMax.staggerTo($this.find('.lazyload'), Math.random() * 0.5+0.2, {ease: Quad.easeInOut, scale:1.2,opacity:1},Math.random() * 0.5 + 0.2));
    imgTween.add(TweenMax.staggerTo($this.find('.lazyload'), Math.random() * 0.5+0.2, {ease: Quad.easeInOut, delay:1,scale:1,opacity:.5}));
  });

  $(window).resize(function(){
    positioning();
  });

  new ScrollMagic.Scene(
    {
      triggerElement: '.hero',
      triggerHook: .5
    })
    .reverse(false)
    .setTween(imgTween)
    .addTo(controller);
});
