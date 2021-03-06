'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nunjucks = require('gulp-nunjucks');
const htmlbeautify = require('gulp-html-beautify');
const path = require('path');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();
const del = require('del');
const rename = require('gulp-rename');

const folders = ['.', 'mobile']; // 웹, 모바일 페이지별로 폴더 분리. 폴더 내 리소스 폴더 구조는 동일함.

const baseurl = 'http://innovationlab.co.kr/innovation/ktng2017_2'; // project url

// run template engines
gulp.task('html', function () {
  var options = {
    'indent_size': 2,
    'max_preserve_newlines': 0
  };
  var date = new Date();

  // 웹, 모바일 폴더 별로 처리하기
  var tasks = folders.map(function(element){
    return gulp.src('src/' + element + '/html/**/!(_)*.njk')
      .pipe(nunjucks.compile({
        baseurl: baseurl,
        url: baseurl + '/',
        version: date.getTime(), // CSS, JS 파일 캐시용 버전
        viewport_width: '1200', // pc 버전은 프로젝트마다 넓이가 상이함. mobile은 device-width으로 설정
        brand: 'KTNG', // header logo 이미지에 들어가는 대체 텍스트
        title: '눈 맞추고, 귀 기울이다 … 한류 3.0 꽃 피우다',
        description: '동남아의 경제 대국 인도네시아, 우리에겐 아직 낯선 곳입니다. 2015년 이곳에서 만난 낯선 청춘에게, 낯선 제안을 했습니다. 그리고 2년이 지났습니다. 어떤 일이 벌어졌을까요?',
        keyword: 'KT&G, 케이티앤지, 인도네시아, KT&G_글로벌_사회공헌, 인도네시아_젊은_나라, 자카르타, 무에타이, 태국_전통_무에타이, 구스티, 구스티아니, 상상유니브, 상상유니브_자카르타, 이슬람, 히잡, 인도네시아국립대학 학생, 에기_로트젠, KT&G_판매량_50%_해외, 인도네시아_최초_대학생_교양_강좌, 소통형_맞춤형_커리큘럼, 인도네시아_동남아_경제_대국, 리마_리스노와티, 트리삭티대, 나시오날대, 무띠아라, K팝, 칼군무, 나디아, 프란스, 프란스스커스, 한류 3.0, 토크_콘서트, 상상마당, 상상마당_홍대, 상상마당_춘천, 상상마당_ 논산, 인재_육성_프로젝트, 우세계, 독립_출판가, 어바웃_북스, 프로추어, 사비나_앤_드론즈, 써라운드, 연상호, 장기하와_얼굴들, 아라벨라호, 존_윈스롭_목사, 근대_기부_문화, 기업_사회적_책임, 하워드_보웬, 기업인_사회적_책임, 순화국, 연초_제작소, 함께_하는_기업, KT&G장학재단, KT&G복지재단, 상상, 자기성장, 매출_2%_사회공헌_활동, 대기업_평균_0.2%, 경승용차_지원, KT&G복지재단_경승용차_공급_사업, 노인_복지, 어르신_탁구대회, 청춘, 북한산_생태복원, 산수국, 마을_벽화, 물고기, 물고기_헤엄_환경, 상상_실현, KT&G_상상유니브_자카르타, KT&G_상상마당',
        og_image: baseurl + '/img/og-image.jpg', // 최적 사이즈 1200x628px
        dablena_init: 'www.ktng.co.kr', // client website
      }))
      .pipe(rename({extname: '.html'})) // rename from .njk to .html
      .pipe(htmlbeautify(options)) // beautify HTML files
      .pipe(gulp.dest('public/' + element + '/'))
      .pipe(browserSync.stream({once: true}));
  });

  return merge(tasks);
});

// js/lib/ 소스 처리 - 외부 라이브러리 파일
gulp.task('js:lib', function () {
  var tasks = folders.map(function(element){
    return gulp.src('src/' + element + '/js/lib/*.js')
      .pipe(gulp.dest('public/' + element + '/js/lib'));
  });

  return merge(tasks);
});
// js/common/ 소스 처리 - concat & uglify js
gulp.task('js:common', function () {
  var tasks = folders.map(function(element){
    return gulp.src([
      'src/' + element + '/js/common/transparency.js',
      'src/' + element + '/js/common/jquery.utils.js',
      'src/' + element + '/js/common/utils.js',
      'src/' + element + '/js/common/layout.js',
      'src/' + element + '/js/common/sns.js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('common.js')) // concat
      .pipe(uglify()) // uglify 적용
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/' + element + '/js'));
  });

  return merge(tasks);
});
// eslint & concat & uglify js
gulp.task('js', ['js:common', 'js:lib'], function () {
  var tasks = folders.map(function(element){
    return gulp.src('src/' + element + '/js/*.js') // 순서대로 합쳐야할 경우 배열로 변경하세요.
      .pipe(eslint()) // lint 적용
      .pipe(eslint.format())
      .pipe(sourcemaps.init())
      .pipe(concat('script.js')) // concat
      .pipe(uglify()) // uglify 적용
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/' + element + '/js'))
      .pipe(browserSync.stream({once: true}));
  });

  return merge(tasks);
});

// compile sass to css
gulp.task('sass', function () {
  var tasks = folders.map(function(element){
    return gulp.src('src/' + element + '/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer([
        // 해당 브라우저 버전에 맞춰 prefix 붙이기
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12'
      ]))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/' + element + '/css'))
      .pipe(browserSync.stream({once: true}));
  });

  return merge(tasks);
});

// images
gulp.task('img', function () {
  var tasks = folders.map(function(element){
    var dest = 'public/' + element + '/img';
    return gulp.src('src/' + element + '/img/**/*.{jpg,jpeg,gif,png,svg,ico}')
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({once: true}));
  });

  return merge(tasks);
});

// fonts
gulp.task('font', function () {
  var tasks = folders.map(function(element){
    var dest = 'public/' + element + '/font';
    return gulp.src('src/' + element + '/font/*.*')
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({once: true}));
  });

  return merge(tasks);
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: ['public']
  });

  gulp.watch('src/**/html/*.{njk,svg}', ['html']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/img/**/*.{jpg,jpeg,gif,png,svg,ico}', ['img']);
});

gulp.task('clean', function() {
  del.sync(['public/**']);
});

gulp.task('build', ['clean', 'html', 'js', 'sass', 'img', 'font'], function() {

});