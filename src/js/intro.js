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
    var screenWidth = $(window).width(), screenHeight = $(window).width();
    // function convert(pos, ele){
    //   var pixels = ele;
    //   var percentage;
    //   if(pos == 'x') {
    //     percentage = pixels / screenWidth * 100; // 0.92%
    //   } else {
    //     percentage = pixels / screenHeight * 100; // 0.92%
    //   }
    // }
    var img = [[0, 0, 80, 350], [80, 0, 350, 350], [430, 0, 300, 99], [730, 0, 200, 99], [930, 0, 250, 99], [1180, 0, 250, 250], [1430, 0, 170, 50], [1430, 50, 170, 450], [1380, 500, 220, 283], [1080, 700, 300, 83], [880, 700, 200, 83], [530, 550, 350, 233], [230, 550, 300, 233], [0, 349, 235, 434], [230, 350, 200, 200], [430, 100, 450, 450], [880, 100, 300, 300], [1180, 250, 250, 250], [1180, 500, 200, 200], [880, 400, 300, 300]];//1600, 783
    for (var i = 0; i<img.length; i++) {
      var posX = img[i][0] / 1600 * screenWidth;
      var posY = img[i][1] / 783 * screenHeight / 2;
      var widthImg = img[i][2] / 1600 * screenWidth;
      var heightImg = img[i][3] / 783 * screenHeight / 2;
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
    imgTween.add(TweenMax.staggerTo($this.find('.lazyload'), Math.random() * 0.5+0.2, {ease: Quad.easeInOut, delay:1,scale:1,opacity:.4}));
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