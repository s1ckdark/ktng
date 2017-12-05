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

const baseurl = ''; // project url

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
        title: '',
        description: '',
        keyword: '',
        og_image: baseurl + '/img/og-image.jpg', // 최적 사이즈 1200x628px
        dablena_init: '', // client website
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