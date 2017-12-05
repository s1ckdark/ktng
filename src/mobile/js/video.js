/*
* Scroll 관련 스크립트
*
* JS Dependencies
* - ScrollMagic: http://scrollmagic.io
*    - ScrollMagic.min.js
*    - animation.gsap.min.js
*    - debug.addIndicators.min.js
* */

$(function(){
  //
  // Video play - Custom poster and play button
  //
  $('.video-play .play').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    var $video = $this.siblings('video');

    $video[0].play();
    $this.fadeOut(300);
  });

  //
  // Set Video
  //
  // 3 background videos
  // 6 normal videos
  var video = {
    interview: {
      el: document.getElementById('video-interview'),
      url: 'http://cf.c.ooyala.com/Z5NndvYzE6t36Xl80w_ePc3yHA2tfCnX/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
      poster: '../img/sales/poster-interview.jpg',
    },
    vision: {
      el: document.getElementById('video-vision'),
      url: 'http://cf.c.ooyala.com/hzNndvYzE6m-D99-z-rRdUO5-pW2tx7b/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
    },
    smell: {
      el: document.getElementById('video-smell'),
      url: 'http://cf.c.ooyala.com/13NndvYzE65tCFK3FvPGQ3kljbdWXfdf/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
    },
    taste: {
      el: document.getElementById('video-taste'),
      url: 'http://cf.c.ooyala.com/ozN3dvYzE6uGCXMvHZvQPYHtsZgQT-aL/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
    },
    touch: {
      el: document.getElementById('video-touch'),
      url: 'http://cf.c.ooyala.com/sxN3dvYzE6JiP8JfxIGptrBnyq0IeLXO/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
    },
    hearing: {
      el: document.getElementById('video-hearing'),
      url: 'http://cf.c.ooyala.com/F1NndvYzE6ufW302AR1bMwmH8NOC1Do2/DOcJ-FxaFrRg4gtDEwOmw3OjBrO9xAJa',
    },
  };

  // normal videos - src, etc
  video.interview.el && (video.interview.el.src = video.interview.url, video.interview.el.poster = video.interview.poster);
  video.vision.el && (video.vision.el.src = video.vision.url);
  video.smell.el && (video.smell.el.src = video.smell.url);
  video.taste.el && (video.taste.el.src = video.taste.url);
  video.touch.el && (video.touch.el.src = video.touch.url);
  video.hearing.el && (video.hearing.el.src = video.hearing.url);
  $('video').prop({
    controls: true,
    controlsList: 'nodownload',
    preload: false,
    volume: 1,
  });

});