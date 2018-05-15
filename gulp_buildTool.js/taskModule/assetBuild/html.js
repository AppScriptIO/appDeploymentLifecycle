import path from 'path'
import gulp from 'gulp'
import merge from 'merge-stream'
const plugins = require('gulp-load-plugins')({ 
	pattern: ['*'],
	camelize: false, 
	replaceString: /(?!)/ /* regex that never matches, i.e. don't replace "gulp-" */ 
})
const HtmlSplitter = plugins['polymer-build'].HtmlSplitter
const FragmentIndentation = require('../../utilityModule/fragmentIndentation.gulp.js').FragmentIndentation
const regex = {
	js: /\.js$/,
	css: /\.css$/,
	html: /\.html$/,
	ignoreCustomFragments: [ /{%[\s\S]*?%}/, /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ],
	hbAttrWrap: {
		open: /\{\{(#|\^)[^}]+\}\}/,
		close: /\{\{\/[^}]+\}\}/
	}
}

export const html = ({ sources, destination, babelPath, babelConfigFileName }) => () => {
	const babelConfig = require(path.join(babelPath, `/compilerConfiguration/${babelConfigFileName}`))
	const sourcesHtmlSplitter = new HtmlSplitter()
	
	return gulp.src(sources)
		// .pipe(plugins['gulp-debug']({ title: 'file:' }))
		.pipe(FragmentIndentation.TransformToFragmentKeys())
		.pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
		
		/* JAVASCRIPT */
		.pipe(plugins['gulp-if']( regex.js, 
			plugins['gulp-babel']({
				"presets": babelConfig.presets,
				"plugins": babelConfig.plugins
			})
		))

		/* HTML (also minimize any left or non detected sections - css, js, html tags that were not separated), e.g. css's transform property  */
		.pipe(plugins['gulp-if']( regex.html, 
			plugins['gulp-htmlmin']({
				collapseWhitespace: true,
				removeComments: true,
				removeCommentsFromCDATA: true,
				minifyURLs: true,
				minifyJS: true,
				minifyCSS: true, 
				ignoreCustomFragments: regex.ignoreCustomFragments
			})
		))

		/* CSS */
		.pipe(plugins['gulp-if']( regex.css, 
			plugins['css-slam'].gulp()
		))
		.pipe(plugins['gulp-if']( regex.css, 
			plugins['gulp-clean-css']()
		))

		.pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
		.pipe(FragmentIndentation.TransformBackToFragment())
		.pipe(gulp.dest(destination))
		.pipe(plugins['gulp-size']({
			title: `HTML - ${babelConfigFileName}`
		}))
	  
}
