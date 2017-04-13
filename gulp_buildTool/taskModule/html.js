const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const babelInline = require('gulp-babel-inline')
const babel = require('gulp-babel')
const merge = require('merge-stream')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const htmlMinifier = require('gulp-html-minifier')
const cssSlam = require('css-slam').gulp
const polyclean = require('polyclean')
const HtmlSplitter = require('polymer-build').HtmlSplitter
const sourcesHtmlSplitter = new HtmlSplitter()

let ignoreCustomFragments = [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]

function webcomponent(sources, destination) {
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
			ignoreCustomFragments: ignoreCustomFragments
	})))

	.pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location

	// .pipe(plugins.plumber())
	// .pipe(plugins.minifyInline())
	// .pipe(polyclean.cleanJsComments())
	// .pipe(polyclean.leftAlignJs())
	// .pipe(polyclean.uglifyJs())
	// .pipe(polyclean.cleanCss())

    .pipe(gulp.dest(destination))
	.pipe(plugins.size({
		title: 'html task (webcomponent)'
	}));
}

function pureHTML(sources, destination) {
	let hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
	let hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
	let hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];
	return gulp.src(sources)
		// .pipe(plugins.plumber())
		// .pipe(babelInline({
		// 	"presets": ["es2015"],
		// 	// "plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"],
		// 	"babelrc": false
		// }))
		// .pipe(babelInline({
		// 	"presets": ["es2015", "stage-0"],
		// 	"plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"]
		// }))

		.pipe(plugins.htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			removeCommentsFromCDATA: true,
			minifyURLs: true,
			// minifyJS: true,
			minifyCSS: true,
			ignoreCustomFragments: ignoreCustomFragments,
			// preserveLineBreaks: true
		}))
		// .pipe(plugins.minifyInline())

		.pipe(gulp.dest(destination))
		.pipe(plugins.size({
			title: 'html task (pureHTML)'
		}));
}

module.exports = (sources, destination, type = null) => {
	return () => {
		let result;
		switch (type) {
			case 'webcomponent':
				result = webcomponent(sources, destination)
				break;
			case 'pureHTML':
			default:
				result = pureHTML(sources, destination)
				break;
		}
		return result;
	}
};