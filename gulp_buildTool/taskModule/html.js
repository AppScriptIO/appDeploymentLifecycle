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
const FragmentIndentation = require('../utilityModule/fragmentIndentation.js').FragmentIndentation
const babelPresetES2015 = require('babel-preset-es2015');
const babelPresetES2015NoModules = babelPresetES2015.buildPreset({}, {modules: false});


let ignoreCustomFragments = [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]
let hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
let hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
let hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];

function webcomponent(sources, destination) {
	const sourcesHtmlSplitter = new HtmlSplitter()
  return gulp.src(sources)
	.pipe(FragmentIndentation.TransformToFragmentKeys())
	.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
	
	// Inline CSS
	.pipe(gulpif(/\.css$/, cssSlam()))
	
	// Inline JAVASCRIPT
	.pipe(gulpif(/\.js$/, 
			babel({
				"presets": [
					// `${__dirname}/../node_modules/babel-preset-es2015`,
					`${__dirname}/../node_modules/babel-preset-babili`,
					// { "modules": false }
				],
				"plugins": [
					// `${__dirname}/../node_modules/babel-plugin-transform-custom-element-classes`,
					// `${__dirname}/../node_modules/babel-plugin-transform-es2015-classes`,
				]
			})
		)
	)
	// .pipe(gulpif(/\.js$/, uglify()))

	// Inline HTML
	.pipe(gulpif(/\.html$/, htmlMinifier()))
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
	.pipe(FragmentIndentation.TransformBackToFragment())

	// .pipe(plugins.plumber())
	// .pipe(plugins.minifyInline())
	// .pipe(polyclean.cleanJsComments())
	// .pipe(polyclean.leftAlignJs())
	// .pipe(polyclean.uglifyJs())
	// .pipe(polyclean.cleanCss())

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

    .pipe(gulp.dest(destination))
	.pipe(plugins.size({
		title: 'html task (webcomponent)'
	}));
}

function webcomponentES5(sources, destination) {
	const sourcesHtmlSplitter = new HtmlSplitter()
  return gulp.src(sources)
	.pipe(FragmentIndentation.TransformToFragmentKeys())
	.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
	
	// Inline CSS
	.pipe(gulpif(/\.css$/, cssSlam()))
	
	// Inline JAVASCRIPT
	.pipe(gulpif(/\.js$/, 
		babel({
			"presets": [
				`${__dirname}/../node_modules/babel-preset-es2015`,
				// `${__dirname}/../node_modules/babel-preset-babili`,
				// { "modules": false }
			],
			"plugins": [
				// `${__dirname}/../node_modules/babel-plugin-transform-custom-element-classes`,
				// `${__dirname}/../node_modules/babel-plugin-transform-es2015-classes`,
			]
		})
	))
	// .pipe(gulpif(/\.js$/, uglify()))

	// // Inline HTML
	// .pipe(gulpif(/\.html$/, htmlMinifier()))
    // .pipe(gulpif(/\.html$/, plugins.htmlmin({
	// 		collapseWhitespace: true,
	// 		removeComments: true,
	// 		removeCommentsFromCDATA: true,
	// 		minifyURLs: true,
	// 		minifyJS: true,
	// 		minifyCSS: true, 
	// 		ignoreCustomFragments: ignoreCustomFragments
	// })))

	.pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
	.pipe(FragmentIndentation.TransformBackToFragment())

	// .pipe(plugins.plumber())
	// .pipe(plugins.minifyInline())
	// .pipe(polyclean.cleanJsComments())
	// .pipe(polyclean.leftAlignJs())
	// .pipe(polyclean.uglifyJs())
	// .pipe(polyclean.cleanCss())

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

    .pipe(gulp.dest(destination))
	.pipe(plugins.size({
		title: 'html task (webcomponent)'
	}));
}

function polymer(sources, destination) {
	const sourcesHtmlSplitter = new HtmlSplitter()
  return gulp.src(sources)
	// .pipe(FragmentIndentation.TransformToFragmentKeys())
	.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
	
	// Inline CSS
	// .pipe(gulpif(/\.css$/, cssSlam()))
	
	// Inline JAVASCRIPT
	.pipe(gulpif(/\.js$/, 
			babel({
				"presets": [
					babelPresetES2015NoModules
					// `${__dirname}/../node_modules/babel-preset-es2015`,
					// `${__dirname}/../node_modules/babel-preset-babili`,
					// { "modules": false }
				]
				// "plugins": [
				// 	// `${__dirname}/../node_modules/babel-plugin-transform-custom-element-classes`,
				// // 	// `${__dirname}/../node_modules/babel-plugin-transform-es2015-classes`,
				// ]
			})
		)
	)
	// .pipe(gulpif(/\.js$/, uglify()))

	// Inline HTML
	// .pipe(gulpif(/\.html$/, htmlMinifier()))
    // .pipe(gulpif(/\.html$/, plugins.htmlmin({
	// 		collapseWhitespace: true,
	// 		removeComments: true,
	// 		removeCommentsFromCDATA: true,
	// 		minifyURLs: true,
	// 		minifyJS: true,
	// 		minifyCSS: true, 
	// 		ignoreCustomFragments: ignoreCustomFragments
	// })))

	.pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
	// .pipe(FragmentIndentation.TransformBackToFragment())

	// .pipe(plugins.plumber())
	// .pipe(plugins.minifyInline())
	// .pipe(polyclean.cleanJsComments())
	// .pipe(polyclean.leftAlignJs())
	// .pipe(polyclean.uglifyJs())
	// .pipe(polyclean.cleanCss())

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

    .pipe(gulp.dest(destination))
	.pipe(plugins.size({
		title: 'html task (polymer)'
	}));
}

module.exports = (sources, destination, type = null) => {
	return () => {
		let result;
		switch (type) {
			case 'polymer':
				result = polymer(sources, destination)
				break;
			case 'webcomponentES5':
				result = webcomponentES5(sources, destination)
				break;
			case 'webcomponent':
			default:
				result = webcomponent(sources, destination)
				break;
		}
		return result;
	}
};