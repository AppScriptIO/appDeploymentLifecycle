'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });

module.exports = (sources, destination) => {
  return gulp.src(sources)
    .pipe(plugins.plumber())
    .pipe(plugins.if('*.js', plugins.uglify({
      preserveComments: 'some'
    })))
    .pipe(gulp.dest(destination));
};