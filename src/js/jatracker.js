/*
* JATracker 액션 추적 스크립트
*
* jatracker('event', 'clickEvent', '카테고리', '액션명', '라벨');
* */
if (typeof jatracker === 'function') {
  window.addEventListener('load', function() {
    $('#more .btn-1').on('click', function() {
      jatracker('event', 'clickEvent', '링크', '클릭', '상상유니브 자카르타 더 알아보기');
    });

    $('#more .btn-2').on('click', function() {
      jatracker('event', 'clickEvent', '링크', '클릭', '상상마당 더 알아보기');
    });
  });
}
