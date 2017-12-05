//SNS 공유
$(function(){
  Kakao.init('0ea6b97767c7ca7b384389c25beb691f');
});

//공유 PC, Mobile 공통사용
function fnSendSns(sns, url, title, description, img) {
  var param, a_store, g_store, a_proto, g_proto;

  url         = url         || $('meta[property="og:url"]').attr('content');
  title       = title       || $('head title').text();
  description = description || $('meta[property="og:description"]').attr('content');
  img         = img         || $('meta[property="og:image"]').attr('content');

  switch(sns) {
    case 'facebook':
      openPopup('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), 555, 608);
      break;
    case 'twitter':
      openPopup('https://twitter.com/home?status=' + encodeURIComponent(url), 555, 500);
      break;
    case 'kakaotalk':
      Kakao.Link && Kakao.Link.sendTalkLink({
        label: title,
        webLink: {
          text: description,
          url: url
        },
        image: {
          src: img,
          width: 1200,
          height: 628
        },
        fail: function () {
          alert('지원하지 않는 플랫폼입니다.');
        }
      });
      break;
    case 'kakaostory':
      Kakao.Story.share({ url: url, text: title });
      break;
    case 'band':
      if (isMobile) {
        param = 'create/post?text=' + encodeURIComponent(title) + encodeURIComponent('\r\n') + encodeURIComponent(url);
        a_store = 'itms-apps://itunes.apple.com/app/id542613198?mt=8';
        a_proto = 'bandapp://';
        g_store = 'market://details?id=com.nhn.android.band';
        g_proto = 'scheme=bandapp;package=com.nhn.android.band';
        openApp();
      } else {
        openPopup('http://band.us/plugin/share?body=' + encodeURIComponent(title) + '&route=' + encodeURIComponent(url), 410, 540);
      }
      break;
    case 'naverblog':
      openPopup('http://share.naver.com/web/shareView.nhn?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title), 557, 558);
      break;
    case 'googleplus':
      // url = url.replace('innovationlab.co.kr', 'ilab.joins.com'); // 구글플러스에서 innovationlab.co.kr 링크는 잘못된 링크로 인식함.
      openPopup('https://plus.google.com/share?url=' + encodeURIComponent(url), 600, 600);
      break;
    case 'pinterest':
      openPopup('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&media=' + encodeURIComponent(img) + '&description=' + encodeURIComponent(title), 750, 650);
      break;
    default:
      alert('지원하지 않는 SNS입니다.');
      return false;
  }

  function openPopup(popupUrl, width, height) {
    window.open(popupUrl, sns + '_sns', 'width=' + width + ',height=' + height + ',menubar=no,toolbar=no,resizable=no');
  }

  function openApp() {
    // android
    if (navigator.userAgent.match(/android/i)) {
      setTimeout(function () {
        location.href = 'intent://' + param + '#Intent;' + g_proto + ';end';
      }, 100);
    }
    // ios
    else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
      setTimeout(function () {
        location.href = a_store;
      }, 200);
      setTimeout(function () {
        location.href = a_proto + param;
      }, 100);
    }
    else {
      alert('이 기능은 모바일에서만 사용할 수 있습니다.');
    }
  }
}