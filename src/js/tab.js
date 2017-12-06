// /*
// * Tab 관련 스크립트
// *
// * */

// $(function(){

//   $('.tab-nav a').on('click', function(e) {
//     e.preventDefault();

//     var $this = $(this);
//     var $tab = $this.closest('.tab');
//     var $items = $tab.find('.tab-content .item');
//     var index = $this.index();

//     if ($this.hasClass('active')) {
//       return;
//     }

//     $this.addClass('active').siblings('.active').removeClass('active');
//     $items.eq(index).addClass('active').siblings('.active').removeClass('active');
//   });

//   // hover 할때 내용도 바뀌도록
//   $('.tab-color-cosmetics .tab-nav a').on('mouseenter', function() {
//     var $this = $(this);
//     if ($this.hasClass('active')) {
//       return;
//     }

//     var $tab = $this.closest('.tab');
//     var $items = $tab.find('.tab-content .item');
//     var index = $this.index();

//     $this.addClass('active').siblings('.active').removeClass('active');
//     $items.eq(index).addClass('active').siblings('.active').removeClass('active');
//   });
// });