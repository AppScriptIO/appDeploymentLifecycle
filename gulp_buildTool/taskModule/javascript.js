'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
const babel = require(`${__dirname}/../node_modules/gulp-babel`),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      UglifyJS = require("uglify-js");

function pureJavascript(sources, destination) {
    return gulp.src(sources)
      .pipe(plugins.plumber())
      .pipe(sourcemaps.init())
      .pipe(babel({
        "presets": [
          `${__dirname}/../node_modules/babel-preset-es2015`,
					`${__dirname}/../node_modules/babel-preset-babili`
				],
				"plugins": [
					`${__dirname}/../node_modules/babel-plugin-transform-custom-element-classes`
				// 	`${__dirname}/../node_modules/babel-plugin-transform-es2015-classes`,
				],        
        // "plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"],
        "babelrc": false
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(plugins.if('*.js', plugins.uglify({
        // preserveComments: 'license'
      })))
      .pipe(gulp.dest(destination));
}

function babelTranspile(sources, destination, gulpPath) {
    return gulp.src(sources, { cwd: gulpPath }) // Apparently process.cwd is changed in gulp pipeline and babel uses it for node_modules search.
    // return gulp.src(sources) 
        // NOTE: if babel settings aren't specified. babelrc in the source path would be used, and throw an error because node_modules aren't yet installed.
        // Therefore, babel settings need to be configured here.
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": [`${__dirname}/../node_modules/babel-preset-es2015`, `${__dirname}/../node_modules/babel-preset-stage-0`],
            "plugins": [`${__dirname}/../node_modules/babel-plugin-transform-runtime`, `${__dirname}/../node_modules/babel-plugin-add-module-exports`],
            "babelrc": false
        }))
        .pipe(sourcemaps.write('.'))
        // .pipe(babel())
        .pipe(gulp.dest(destination));
}

module.exports = (sources, destination, type = null, gulpPath = null) => {
  return () => {
    let result;
    switch (type) {
      case 'babelTranspile':
        result = babelTranspile(sources, destination, gulpPath)
        break;
      case 'pureJavascript':
      default:
        result = pureJavascript(sources, destination)
        break;
    }
    return result
  }
};