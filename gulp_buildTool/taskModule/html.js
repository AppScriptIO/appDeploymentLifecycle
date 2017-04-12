'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true }),
	babelInline = require('gulp-babel-inline'),
	babel = require('gulp-babel');

module.exports = (sources, destination) => {
	return () => {
		var hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
		var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
		var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];
		return gulp.src(sources)
			// .pipe(plugins.plumber())
		    // .pipe(babelInline({
			// 	"presets": ["es2015"],
			// 	// "plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"],
			// 	"babelrc": false
			// }))
			.pipe(plugins.htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				removeCommentsFromCDATA: true,
				minifyURLs: true,
				minifyJS: true,
				minifyCSS: true,
				ignoreCustomFragments: [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ],
				preserveLineBreaks: true
			}))
			.pipe(plugins.minifyInline())
			.pipe(gulp.dest(destination))
			.pipe(plugins.size({
				title: 'optimizeHtmlTask (& Inline JS and CSS)'
			}));
	}
};