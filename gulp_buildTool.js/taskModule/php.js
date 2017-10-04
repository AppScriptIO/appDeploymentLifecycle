'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });

// Other way
function x(sources, destination) {
	// var hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
	// var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
	// var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];
	return gulp.src(sources)
		.pipe(plugins.plumber())
		// .pipe(plugins.minifyHtml({
    //   quotes: true,
    //   empty: true,
    //   spare: true
    // }))
    // .pipe(plugins.htmlmin({
    //   collapseWhitespace: true,
    //   caseSensitive: true, // Polymer custom elements.
    //   removeComments: true,
    //   removeCommentsFromCDATA: true,
    //   minifyURLs: true,
    //   minifyJS: true,
    //   minifyCSS: true,
    //   customAttrAssign: [/\$=/], // Fixes "href$=" issue in Polymer.
    //   // ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /\$?="\[\[.*?\]\]"/],
    //   // ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/],
    // }))
    // .pipe(plugins.minifyInline())
    .pipe(gulp.dest(destination))
    .pipe(plugins.size({
      title: 'optimizePHPTask (& Inline JS and CSS)'
    }));
};

module.exports = (sources, destination) => {
	var hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
	var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
	var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];
	return gulp.src(sources)
		.pipe(plugins.plumber())
		// .pipe(plugins.minifyHtml({
    //   quotes: true,
    //   empty: true,
    //   spare: true
    // }))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      caseSensitive: true, // Polymer custom elements.
      removeComments: true,
      removeCommentsFromCDATA: true,
      minifyURLs: true,
      minifyJS: true,
      minifyCSS: true,
      customAttrAssign: [/\$=/], // Fixes "href$=" issue in Polymer.
      // ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /\$?="\[\[.*?\]\]"/],
      // ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/],
    }))
    .pipe(plugins.minifyInline())
    .pipe(gulp.dest(destination))
    .pipe(plugins.size({
      title: 'optimizePHPTask (& Inline JS and CSS)'
    }));
};