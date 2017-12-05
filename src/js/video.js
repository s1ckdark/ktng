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
    introBg: {
      el: document.getElementById('video-intro-bg'),
      url: 'http://cf.c.ooyala.com/xoNXdvYzE61lDwuUVwWRASf-83MKlHKV/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
      poster: './img/intro/bg-intro.jpg',
    },
    interviewBg: {
      el: document.getElementById('video-interview-bg'),
      url: 'http://cf.c.ooyala.com/4wNndvYzE6nJ0WAb2MlOMWXuyd4xFk7p/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
      poster: './img/sales/bg-interview.jpg',
    },
    interview: {
      el: document.getElementById('video-interview'),
      url: 'http://cf.c.ooyala.com/Z5NndvYzE6t36Xl80w_ePc3yHA2tfCnX/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
    sensesBg: {
      el: document.getElementById('video-senses-bg'),
      url: 'http://cf.c.ooyala.com/54NXdvYzE6UvBvdjcA-7yCz0cSvWOcWW/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
      poster: './img/senses/bg-senses.jpg',
    },
    vision: {
      el: document.getElementById('video-vision'),
      url: 'http://cf.c.ooyala.com/hzNndvYzE6m-D99-z-rRdUO5-pW2tx7b/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
    smell: {
      el: document.getElementById('video-smell'),
      url: 'http://cf.c.ooyala.com/13NndvYzE65tCFK3FvPGQ3kljbdWXfdf/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
    taste: {
      el: document.getElementById('video-taste'),
      url: 'http://cf.c.ooyala.com/ozN3dvYzE6uGCXMvHZvQPYHtsZgQT-aL/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
    touch: {
      el: document.getElementById('video-touch'),
      url: 'http://cf.c.ooyala.com/sxN3dvYzE6JiP8JfxIGptrBnyq0IeLXO/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
    hearing: {
      el: document.getElementById('video-hearing'),
      url: 'http://cf.c.ooyala.com/F1NndvYzE6ufW302AR1bMwmH8NOC1Do2/DOcJ-FxaFrRg4gtDEwOjFyazowODE7G_',
    },
  };

  // background videos - src, poster, etc
  video.introBg.el && (video.introBg.el.src = video.introBg.url, video.introBg.el.poster = video.introBg.poster);
  video.interviewBg.el && (video.interviewBg.el.src = video.interviewBg.url, video.interviewBg.el.poster = video.interviewBg.poster);
  if (video.sensesBg.el) {
    video.sensesBg.el.src = video.sensesBg.url;
    if ($('#senses').length) { // index.html 에서만 설정하기.
      video.sensesBg.el.poster = video.sensesBg.poster;
    }
  }

  $('.background-video').prop({
    controls: false,
    preload: true,
    muted: true,
    loop: true,
  });

  // normal videos - src, etc
  video.interview.el && (video.interview.el.src = video.interview.url);
  video.vision.el && (video.vision.el.src = video.vision.url);
  video.smell.el && (video.smell.el.src = video.smell.url);
  video.taste.el && (video.taste.el.src = video.taste.url);
  video.touch.el && (video.touch.el.src = video.touch.url);
  video.hearing.el && (video.hearing.el.src = video.hearing.url);
  $('video:not(.background-video)').prop({
    controls: true,
    controlsList: 'nodownload',
    preload: false,
    volume: 1,
  });

});

// Background video controll
function playBgVideo(video) {
  var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
  if (!isPlaying) {
    video.play();
  }
}
function pauseVideo(video) {
  var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
  if (isPlaying) {
    video.pause();
  }
}