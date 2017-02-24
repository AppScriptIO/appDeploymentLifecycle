'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });

module.exports = (sources, destination) => {
	var hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
	var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
	var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];
	return gulp.src(sources)
		.pipe(plugins.plumber())
    .pipe(plugins.htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			removeCommentsFromCDATA: true,
			minifyURLs: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(plugins.minifyInline())
    .pipe(gulp.dest(destination))
    .pipe(plugins.size({
      title: 'optimizeHtmlTask (& Inline JS and CSS)'
    }));
};