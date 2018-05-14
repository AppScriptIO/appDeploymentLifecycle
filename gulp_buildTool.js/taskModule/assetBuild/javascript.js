

import path from 'path'
const gulp = require('gulp'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      babel = require(`${__dirname}/../../node_modules/gulp-babel`),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      UglifyJS = require("uglify-js"),
      FragmentIndentation = require('../../utilityModule/fragmentIndentation.js').FragmentIndentation

export const clientJS = ({ sources, destination, babelPath }) => () => {
  const babelConfig = require(path.join(babelPath, `/compilerConfiguration/nativeClientSide.BabelConfig.js`))
  return gulp.src(sources)
    .pipe(plugins.plumber())
    .pipe(FragmentIndentation.TransformToFragmentKeys())
    .pipe(sourcemaps.init())
    .pipe(babel({
      "presets": babelConfig.presets,
      "plugins": babelConfig.plugins,
      "babelrc": false
    }))
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      // emit here
      this.emit('end');
    })
    .pipe(sourcemaps.write('.'))
    // .pipe(plugins.if('*.js', plugins.uglify({
    //   // preserveComments: 'license'
    // })))
    .pipe(FragmentIndentation.TransformBackToFragment())
    .pipe(gulp.dest(destination))

}

export const serverJS = ({ sources, destination, babelPath }) => () => {
    const babelConfig = require(path.join(babelPath, `/compilerConfiguration/server.BabelConfig.js`))
    return gulp.src(sources /*, { cwd: babelPath }*/) // Apparently process.cwd is changed in gulp pipeline and babel uses it for node_modules search.
        // NOTE: if babel settings aren't specified. babelrc in the source path would be used, and throw an error because node_modules aren't yet installed.
        // Therefore, babel settings need to be configured here.
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": babelConfig.presets,
            "plugins": babelConfig.plugins,
            "babelrc": false
        }))
        .on('error', console.error.bind(console))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
    
}