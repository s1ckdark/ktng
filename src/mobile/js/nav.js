/*
* Nav 관련 스크립트
*
* */

$(function(){
  var $nav = $('#nav');
  if (!$nav.length) {
    return;
  }
  var $navInner = $nav.find('.inner');
  var $navLink = $navInner.find(' a');
  var $navMenuLink = $nav.find('.nav-menu');

  // 메뉴 열고 닫기
  $navMenuLink.on('click', function(e){
    e.preventDefault();
    $('html').toggleClass('nav-opened');
  });

  // 링크 위치로 스크롤하기
  $navLink.on('click', function(){
    // 스크롤은 scrollToSection() 함수내에서 처리함.
    $navMenuLink.trigger('click'); // 메뉴 닫기
  });
});