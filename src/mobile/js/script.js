// web font loader
if (typeof WebFont === 'object') {
  WebFont.load({
    custom: {
      families: [
        'Spoqa Han Sans',
        'Spoqa Han Sans JP',
        'Arita Buri',
      ],
      urls: [
        'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-kr.min.css',
        // 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-jp.min.css',
      ],
    },
    google: {
      families: ['Merriweather:400,300'],
      text: '1234567890.,~'
    }
  });
}

$(function(){

  // lazyLoad
  // https://appelsiini.net/projects/lazyload
  lazyload();

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
    if ($popup.is(':visible')) {
      $popup.fadeOut(400, function(){
        $popup.find('video')[0].pause();
      });
    }
  }

  // 정지하면 팝업 자동으로 닫기
  $('#video-interview').on('pause', function(){
    closePopup();
  });


  // 매출 히스토리 슬라이더
  //
  $('#history-slider').owlCarousel({
    loop: false,
    nav: false,
    dots: true,
    // items: 2,
    autoWidth: true,
    center: true,
  });

  // 오감 섹션 - 섹션 공유
  //
  var $sns = $('.section-sns .share');
  var $snsLinks = $('.section-sns-list a');
  TweenMax.set($snsLinks, {y: 6, opacity: 0});

  // 공유 아이콘 click 하면 각 sns 링크 노출하기
  $sns.on('click', function(e){
    e.preventDefault();

    var $this = $(this);
    var $snsLinks = $this.parent().find('.section-sns-list a');

    if ($this.hasClass('opened')) {
      TweenMax.staggerTo($snsLinks, .3, {y: 6, opacity: 0}, .1);
    } else {
      TweenMax.staggerTo($snsLinks, .3, {y: 0, opacity: 1}, .1);
    }
    $this.toggleClass('opened');
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