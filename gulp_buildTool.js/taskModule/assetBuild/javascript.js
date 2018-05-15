

import path from 'path'
const plugins = require('gulp-load-plugins')({ 
	pattern: ['*'],
	camelize: false, 
	replaceString: /(?!)/ /* regex that never matches, i.e. don't replace "gulp-" */ 
})
const gulp = require('gulp'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      FragmentIndentation = require('../../utilityModule/fragmentIndentation.gulp.js').FragmentIndentation

export const clientJS = ({ sources, destination, babelPath, includeSourceMap = true, babelConfigFileName }) => () => {
  const babelConfig = require(path.join(babelPath, `/compilerConfiguration/${babelConfigFileName}`))
  let stream;
  stream = gulp.src(sources)
    .pipe(plugins['gulp-debug']({title: 'clientJS:'}))
    .pipe(FragmentIndentation.TransformToFragmentKeys())
  if(includeSourceMap) stream = stream
    .pipe(sourcemaps.init())
  stream = stream
    .pipe(plugins['gulp-babel']({
      "presets": babelConfig.presets,
      "plugins": babelConfig.plugins,
      "babelrc": false
    })).on('error', function(e) { console.log('>>> ERROR', e); this.emit('end'); })
  if(includeSourceMap) stream = stream
    .pipe(sourcemaps.write('.'))
  return stream // IMPORTANT: return must be appended here, as later addition will not work for some reason.
    .pipe(FragmentIndentation.TransformBackToFragment())
    .pipe(gulp.dest(destination))
    .pipe(plugins['gulp-size']({ // doesn't work in this case for some reason
      title: `JAVASCRIPT - clientJS using ${babelConfigFileName}`
    }))
}

export const serverJS = ({ sources, destination, babelPath }) => () => {
    const babelConfig = require(path.join(babelPath, `/compilerConfiguration/serverBuild.BabelConfig.js`))
    return gulp.src(sources /*, { cwd: babelPath }*/) // Apparently process.cwd is changed in gulp pipeline and babel uses it for node_modules search.
        // NOTE: if babel settings aren't specified. babelrc in the source path would be used, and throw an error because node_modules aren't yet installed.
        // Therefore, babel settings need to be configured here.
        .pipe(sourcemaps.init())
        .pipe(plugins['gulp-babel']({
            "presets": babelConfig.presets,
            "plugins": babelConfig.plugins,
            "babelrc": false
        }))
        .on('error', console.error.bind(console))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
        .pipe(plugins['gulp-size']({
          title: 'Javascript - serverJS'
        }))
    
}