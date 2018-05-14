const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
// const babelInline = require('gulp-babel-inline')
const babel = require('gulp-babel')
const merge = require('merge-stream')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const htmlMinifier = require('gulp-html-minifier')
const cssSlam = require('css-slam').gulp
const HtmlSplitter = require('polymer-build').HtmlSplitter
const FragmentIndentation = require('../../utilityModule/fragmentIndentation.js').FragmentIndentation
const babelPresetES2015 = require('babel-preset-es2015');
const babelPresetES2015NoModules = babelPresetES2015.buildPreset({}, {modules: false});
const debug = require('gulp-debug');


let ignoreCustomFragments = [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]
let hbAttrWrapOpen = /\{\{(#|\^)[^}]+\}\}/;
let hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
let hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];

export const webcomponent = ({sources, destination, babelPath}) => () => {
	const sourcesHtmlSplitter = new HtmlSplitter()
	return gulp.src(sources)
		.pipe(debug({title: 'debug:'}))
		.pipe(FragmentIndentation.TransformToFragmentKeys())
		.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
		
		
		// Inline JAVASCRIPT
		.pipe(gulpif(/\.js$/, 
				babel({
					"presets": [
						// `${__dirname}/../node_modules/babel-preset-es2015`,
						path.join(babelPath, `/node_modules/babel-minify`),
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
				// minifyJS: true,
				// minifyCSS: true, 
				ignoreCustomFragments: ignoreCustomFragments
		})))
		// Inline CSS
		.pipe(gulpif(/\.css$/, cssSlam()))

		.pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
		.pipe(FragmentIndentation.TransformBackToFragment())

		// .pipe(plugins.plumber())
		// .pipe(plugins.minifyInline())

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
		}))
}

export const webcomponentES5 = ({ sources, destination, babelPath }) => () => {
	const sourcesHtmlSplitter = new HtmlSplitter()
  return gulp.src(sources)
	  .pipe(debug({title: 'debug:'}))
	.pipe(FragmentIndentation.TransformToFragmentKeys())
	.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
	
	// Inline CSS
	.pipe(gulpif(/\.css$/, cssSlam()))
	
	// Inline JAVASCRIPT
	.pipe(gulpif(/\.js$/, 
		babel({
			"presets": [
				path.join(babelPath, `/node_modules/babel-preset-es2015`),
				// `${__dirname}/../node_modules/babel-minify`,
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

export const polymer = ({sources, destination, babelPath}) => () => {
	const sourcesHtmlSplitter = new HtmlSplitter()
  return gulp.src(sources)
	  .pipe(debug({title: 'debug:'}))
  
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
					// `${__dirname}/../node_modules/babel-minify`,
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
	// .pipe(FragmentIndentation.TransformBackToFragment())

	// .pipe(plugins.plumber())
	// .pipe(plugins.minifyInline())

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
	}))
}