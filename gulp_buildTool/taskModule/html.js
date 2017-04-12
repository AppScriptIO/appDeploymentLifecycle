'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true }),
	babelInline = require('gulp-babel-inline'),
	babel = require('gulp-babel'),
	merge = require('merge-stream'),
	

module.exports = (sources, destination) => {
	return () => {
		// let html = optimizeHtmlTask( // produces errors.
		// 	[
		// 		source('clientSide/assets/**/*.html'),
		// 		'!'+ source('clientSide/assets/elements/**/*.html'),
		// 		'!'+ source('clientSide/assets/elements/bower_components/**/*.html'),
		// 		'!'+ source('clientSide/assets/javascripts/addons_library/Woothemes-FlexSlider2/dynamic-carousel-min-max.html') // Throughs errors.
		// 	],
		// 	destination('clientSide/assets')
		// );
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