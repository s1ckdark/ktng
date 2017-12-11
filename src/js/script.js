// web font loader
if (typeof WebFont === 'object') {
  WebFont.load({
    // custom: {
    //   families: [
    //     'Spoqa Han Sans',
    //     'Spoqa Han Sans JP',
    //     'Arita Buri',
    //   ],
    //   urls: [
    //     'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-kr.min.css',
    //     // 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-jp.min.css',
    //   ],
    // },
    google: {
      families: ['Merriweather:400,300'],
      text: '1234567890.,~'
    }
  });
}

$(function(){

  // lazyLoad
  // https://appelsiini.net/projects/lazyload
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('edge') > -1 || userAgent.indexOf('trident') > -1) { // edge & ie - lazyload 버그로 임시로 처리함.
    $('img.lazyload').each(function(){
      $(this).attr('src', $(this).data('src'));
    });
    $('.lazyload').not('img').each(function(){
      $(this).css('background-image', 'url("' + $(this).data('src') + '")');
    });
  } else {
    lazyload();
  }

  // 인터뷰 섹션 - play movie 버튼
  //
  var $popup = $('#interview-popup');

  $('#popup-open').on('click', openPopup);
  $('#popup-close').on('click', closePopup);

  function openPopup(){
    $popup.fadeIn(400, function(){
      $popup.find('video')[0].play();
    });
  }
  function closePopup(){
    $popup.fadeOut(400, function(){
      $popup.find('video')[0].pause();
    });
  }

  // 오감 섹션 - 섹션 공유
  //
  var $sns = $('.section-sns');
  var $snsLinks = $sns.find('.section-sns-list a');
  var linkWidth = $snsLinks.width();

  // 공유 아이콘 hover 하면 각 sns 링크 노출하기
  $sns.on('mouseenter mouseleave', function(e){
    var direction = $(this).parent().hasClass('s-sense-body') ? 'down' : $(this).parent('.sense-top-video').hasClass('layout-left') ? 'left': 'right';
    var $snsLinks = $(this).find('.section-sns-list a');

    if (e.type === 'mouseenter') {
      if (direction === 'down') {
        TweenMax.staggerTo($snsLinks, .4, {overwrite: 1, opacity: 1,
          cycle: {
            y: function(index){
              return linkWidth * ($snsLinks.length - index) + 10;
            }
          }
        }, .2);
      } else {
        TweenMax.staggerTo($snsLinks, .4, {overwrite: 1,
          cycle: {
            x: function(index){
              switch (direction) {
                case 'left':
                  return linkWidth * ($snsLinks.length - index);
                case 'right':
                  return -linkWidth * ($snsLinks.length - index);
              }
            }
          }
        }, .2);
      }
    } else {
      if (direction === 'down') {
        TweenMax.staggerTo($snsLinks.get().reverse(), .4, {overwrite: 1, y: 0, opacity: 0}, .2);
      } else {
        TweenMax.staggerTo($snsLinks.get().reverse(), .4, {overwrite: 1, x: 0}, .2);
      }
    }
  });
  // 각 sns 링크 클릭하면, 해당 섹션 hash를 url에 추가해서 fnSendSns 함수 호출하기
  $snsLinks.on('click', function(e){
    e.preventDefault();

    var $this = $(this);
    var section = $this.closest('.hash-section').attr('id');
    var type = $this.attr('class');
    var url = $('meta[property="og:url"]').attr('content') + '#' + section;

    // console.log(section, type, url);
    fnSendSns(type, url);
  });

});