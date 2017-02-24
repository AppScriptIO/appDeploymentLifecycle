'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let polyclean = require('polyclean');

module.exports = (sources, destination) => {
  return gulp.src(sources)
		.pipe(plugins.plumber())
		.pipe(plugins.minifyInline())
		.pipe(polyclean.cleanJsComments())
		.pipe(polyclean.leftAlignJs())
		.pipe(polyclean.uglifyJs())
		.pipe(polyclean.cleanCss())
    .pipe(gulp.dest(destination))
};
