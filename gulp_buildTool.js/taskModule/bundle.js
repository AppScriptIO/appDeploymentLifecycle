'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });

module.exports = (sources, destination) => {
  return gulp.src(sources)
    .pipe(plugins.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(destination))
    .pipe(plugins.size({
      title: 'vulcanize'
    }));
};
