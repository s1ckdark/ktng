# Innovation Lab Project Template
## 로컬에서 작업하기
1. `npm install` 실행
1. 빌드: `gulp build` 실행
   1. src 디렉토리에 있는 소스파일을 빌드해 public 디렉토리에 생성합니다.
1. 서버: `gulp serve` 실행
   1. 빌드 후 [BrowserSync](https://www.browsersync.io/)로 서버를 구성합니다.
   1. 터미널에 보여지는 접근 URL이 자동으로 기본 브라우저에 보여집니다.
   1. 파일이 수정되면 페이지가 자동으로 새로고침됩니다. (browserSync.stream() 참조)

## Directory
아래에서 숫자로 시작하는 설명이 들어간 파일만 실제로 작업하면 됩니다.

- `public` 배포용 - 개발용 소스 컴파일 등 처리 후 자동으로 생성됩니다. 이 폴더 내부의 소스가 FTP에 올라갑니다. 수정 금지. (*GiLab Pages 사용을 위해 폴더 이름을 꼭 *public*로 해야 함.)
- `src` 개발용. 모든 소스는 여기서 작성합니다.
   - `font` CDN을 사용하지 않는 웹폰트
   - `html`
      - `_head.html` 프로젝트마다 달리 들어가야할 내용(제목, 설명 등)은 변수로 출력되기 때문에 직접 내용을 써넣지 않습니다. 수정 금지.
      - `_header.html` 상단 공통 레이아웃. 수정 금지.
      - `_layout.html` 공통 레이아웃. 수정 금지.
      - `index.html` 1. 필요시 파일 상단에 **프로젝트 관련 변수를 설정**합니다. **페이지 내용**과 **스크립트 요소**를 작성합니다.
      - `*.html` 2. 추가로 필요한 페이지는 index.html과 동일하게 작성합니다.
   - `img`
   - `js`
      - `common/*.js` 기존 공통 스크립트.
      - `script.js` 1. 프로젝트 스크립트 작성. concat으로 합쳐져 script.js로 생성되기 때문에 **여러 파일로 분할해서 작성**해도 됩니다.
   - `mobile` 모바일용 페이지. 데스크탑용 페이지의 소스 구조를 동일하게 내부에 갖고 있습니다.
   - `sass` 
      - `style.scss` 1. 중심 스타일시트. 내부 내용 참조.

### HTML
- Template Engine [Nunjucks](https://mozilla.github.io/nunjucks) 사용.
   - `gulp-nunjucks`를 사용하여 컴파일합니다.
   - 목적: 프로젝트마다 공통으로 사용하는 레이아웃을 분리하여 관리합니다.
- `gulp-html-beautify`를 사용하여 포맷을 관리합니다.

### JavaScript
- ES5로 작성
- `gulp-eslint`를 사용하여 포맷을 관리합니다.
- `gulp-concat`을 사용하여 파일을 하나로 합칩니다.
- `gulp-uglify`를 사용하여 난독화 및 압축합니다.

### CSS
- Sass로 작성
- `gulp-sass`를 사용하여 컴파일합니다.
- `gulp-autoprefixer`를 사용하여 브라우저 벤더용 프리픽스를 자동으로 생성합니다. (*Sass로 프리픽스를 직접 작성할 필요가 없습니다.*)

### Webfont
웹폰트는 [Webfont Loader](https://github.com/typekit/webfontloader)를 사용해 불러옵니다.

#### 폰트
폰트 추가 Noto Sans CJK KR
  
### 브라우저 호환성
- PC: Chrome, Firefox, Safari, Edge, IE11, IE10
- Mobile: iPhone Safari, Android Browser