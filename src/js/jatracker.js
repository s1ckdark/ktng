/*
* JATracker 액션 추적 스크립트
*
* jatracker('event', 'clickEvent', '카테고리', '액션명', '라벨');
* */


if (typeof jatracker === 'function') {
  window.addEventListener('load', function(){

    // nav
    $('#nav a').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', '네비게이션-' + $(this).find('.normal').text());
    });

    // nav - tips.html
    $('#nav-tips a').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', '네비게이션-' + ($(this).index() + 1));
    });

    // 인터뷰 Play movie
    $('#popup-open').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '카운셀러 인터뷰');
    });

    // 기사 더보기
    $('.article .link').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', $(this).siblings('.heading').text());
    });

    // 오감 동영상 재생
    $('#video-vision ~ .play').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '시각');
    });
    $('#video-smell ~ .play').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '후각');
    });
    $('#video-taste ~ .play').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '미각');
    });
    $('#video-touch ~ .play').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '촉각');
    });
    $('#video-hearing ~ .play').on('click', function(){
      jatracker('event', 'clickEvent', '동영상', '재생', '청각');
    });

    // 오감 기사 더보기
    $('.s-sense-more .btn').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', $.trim($(this).parent().siblings('.heading').text()));
    });

    // 시각 - 올해 색상 슬라이더
    $(document).on('click', '.color-slider .owl-nav > *', function(){
      jatracker('event', 'clickEvent', '버튼', '클릭', '올해 색상 슬라이더-' + ($(this).hasClass('owl-prev') ? '이전' : '다음'));
    });
    // 후각 - 향수 슬라이더
    $(document).on('click', '.perfume-slider .owl-nav > *', function(){
      jatracker('event', 'clickEvent', '버튼', '클릭', '올바른 향수 사용법 슬라이더-' + ($(this).hasClass('owl-prev') ? '이전' : '다음'));
    });

    // 시각 - 색조 화장품 고르기 탭
    $('.tab-color-cosmetics .tab-nav a').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', '색조 화장품 고르기-' + $(this).find('.name').text());
    });
    // 후각 - TPO 향수 사용법 탭
    $('.tab-perfume-tpo .tab-nav a').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', 'TPO 향수 사용법-' + $(this).text());
    });


    // outro - 아모레퍼시픽 더 보러가기
    $('#outro .more').on('click', function(){
      jatracker('event', 'clickEvent', '링크', '클릭', '아모레퍼시픽 더 보러가기');
    });

    // 헤더 공유
    $('.sns-share-box a:not(.sns-more)').on('click', function(){
      var $this = $(this);
      var type = $this.attr('title');

      jatracker('event', 'clickEvent', '링크', '클릭', type + ' 공유');
    });

    // 섹션 공유
    $('.section-sns-list a').on('click', function(){
      var $this = $(this);
      var section = $this.closest('.hash-section').attr('id');
      var type = $this.attr('class');

      jatracker('event', 'clickEvent', '링크', '클릭', type + ' 공유-' + section);
    });

  });
}
