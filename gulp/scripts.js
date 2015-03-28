'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {
    return gulp.src(options.src + '/{app,components}/**/*.js')
      .pipe($.jshint('.jshintrc'))
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.size());
  });
};
