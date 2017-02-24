'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });

module.exports = (src, dest) => {
  return gulp.src(src)
  .pipe(plugins.imagemin({
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(dest))
  .pipe(plugins.size({
    title: 'imageOptimizeTask'
  }));
};
