/*
* Tab 관련 스크립트
*
* */

$(function(){

  $('.tab-nav a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var $tab = $this.closest('.tab');
    var $items = $tab.find('> .tab-content > .item');
    var index = $this.index();

    if ($this.hasClass('active')) {
      return;
    }

    $this.addClass('active').siblings('.active').removeClass('active');
    $items.eq(index).addClass('active').siblings('.active').removeClass('active');
  });
});