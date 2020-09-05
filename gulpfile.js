const gulp = require('gulp');
const { src, dest, watch } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function minCSS() {
  src('less/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('css'))
    .pipe(browserSync.stream())
}

function imgMin() {
  src('srcImgs/*')
    .pipe(minifyImg())
    .pipe(dest('distImgs'))
    .pipe(browserSync.stream())
}

exports.watch = function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./less/**/*.less', minCSS);
  gulp.watch('srcImgs/*', imgMin);
  gulp.watch('./*.html').on('change', browserSync.reload);
}
