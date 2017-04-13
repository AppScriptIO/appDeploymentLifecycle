'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
const babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      UglifyJS = require("uglify-js");

module.exports = (sources, destination) => {
  return () => {
    return gulp.src(sources)
      .pipe(plugins.plumber())
      // .pipe(sourcemaps.init())
      // // .pipe(babel({
      // //   "presets": ["es2015"],
      // //   // "plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"],
      // //   "babelrc": false
      // // }))
      // .pipe(sourcemaps.write('.'))
      // .pipe(plugins.if('*.js', plugins.uglify({
      //   // preserveComments: 'license'
      // })))
      .pipe(gulp.dest(destination));
  }
};