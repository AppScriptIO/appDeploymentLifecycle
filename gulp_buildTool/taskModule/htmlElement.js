'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
const babel = require('gulp-babel')
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const htmlMinifier = require('gulp-html-minifier');
const cssSlam = require('css-slam').gulp;
let polyclean = require('polyclean');
const HtmlSplitter = require('polymer-build').HtmlSplitter;

const sourcesHtmlSplitter = new HtmlSplitter();
module.exports = (sources, destination) => {
  return gulp.src(sources)
	  .pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
		
		// Inline CSS
		.pipe(gulpif(/\.css$/, cssSlam()))
		
		// // Inline JAVASCRIPT
		// .pipe(gulpif(/\.js$/, 
		// 			babel({
		// 				"presets": ["es2015"],
		// 				"plugins": [
		// 					// "transform-custom-element-classes",
		// 					"transform-es2015-classes"
		// 				],
		// 				"babelrc": false
		// 			})
		// ))
		// .pipe(gulpif(/\.js$/, uglify()))

		// Inline HTML
	  // .pipe(gulpif(/\.html$/, htmlMinifier()))
    .pipe(gulpif(/\.html$/, plugins.htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			removeCommentsFromCDATA: true,
			minifyURLs: true,
			minifyJS: true,
			minifyCSS: true, 
			ignoreCustomFragments: [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]
		})))

	  .pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location

		// .pipe(plugins.plumber())
		// .pipe(plugins.minifyInline())
		// .pipe(polyclean.cleanJsComments())
		// .pipe(polyclean.leftAlignJs())
		// .pipe(polyclean.uglifyJs())
		// .pipe(polyclean.cleanCss())

    .pipe(gulp.dest(destination))
};
