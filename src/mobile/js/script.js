// web font loader
// if (typeof WebFont === 'object') {
//   WebFont.load({
//     custom: {
//       families: [
//         'Spoqa Han Sans',
//         'Spoqa Han Sans JP',
//         'Arita Buri',
//       ],
//       urls: [
//         'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-kr.min.css',
//         // 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.1/css/SpoqaHanSans-jp.min.css',
//       ],
//     },
//     google: {
//       families: ['Merriweather:400,300'],
//       text: '1234567890.,~'
//     }
//   });
// }
// if you want to use webFont Loader..
 
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

  //
  // localizing
  //


  function closeContent(ele){
    var $this = $(ele);
    TweenMax.to($this, .5, {rotation:360, onComplete:function(){
      TweenMax.to($this, .5, {className:'-=close', onComplete:function(){
        TweenMax.to($this.parents('.content'), .5, {background:'#f4f4f4'});
        TweenMax.to($this.prev('.hide-content'), .5, {className:'-=active',ease:Expo.easeInOut,transformOrigin:'50% 100%'});
      }});
    }});
  }
  function openContent(ele){
    var $this = $(ele);
    TweenMax.to($this, .5, {rotation:360, onComplete:function(){
      TweenMax.to($this, .5, {className:'+=close', onComplete:function(){
        TweenMax.to($this.parents('.content'), .5, {background:'#fff'});
        TweenMax.to($this.prev('.hide-content'), .5, {className:'+=active',ease:Expo.easeInOut,transformOrigin:'50% 100%'});
      }});
    }});
  }

  $('#localizing .btn').click(function(){
    var $this = $(this), $activeContent = $('.hide-content.active');
    if($activeContent.length>0){
      if($this.prev().hasClass('active')){
        closeContent(this);
      } else {
        TweenMax.to($activeContent.next('.btn'), .5, {className:'-=close', onComplete:function(){
          TweenMax.to($activeContent.parents('.content'), .5, {background:'#f4f4f4'});
          TweenMax.to($activeContent, .5, {className:'-=active',ease:Expo.easeInOut,transformOrigin:'50% 100%'});
        }});
        openContent(this);
      }
    } else {
      openContent(this);
    } 
  });
 
  // 
  // profressor 
  //
  var qna = 0;
  $('#professor .btn').click(function(){
    var $this = $(this);
    if(qna++ % 2 === 0) {
      TweenMax.to($this, .5, {rotation:360, onComplete:function(){
        TweenMax.to($this, .5, {className:'+=close'});
        TweenMax.to($this.prev('#qna'), .5, {className:'+=active', ease:Expo.easeInOut,transformOrigin:'50% 100%'});
      }});
    } else {
      TweenMax.to($this, .5, {rotation:360, onComplete:function(){
        TweenMax.to($this, .5, {className:'-=close'});
        TweenMax.to($this.prev('#qna'), .5, {className:'-=active', ease:Expo.easeInOut,transformOrigin:'50% 100%'});
      }});
    } 
  });

  //
  // video Play
  //
  $('.video-play .play').on('click', function(e){
    e.preventDefault();
    $(this).hide().next('video')[0].play();
  });

});