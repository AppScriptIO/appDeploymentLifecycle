'use strict';

let gulp = require('gulp'), 
    babel = require('gulp-babel')
 
module.exports = (sources, destination, gulpPath) => {
    return () => {
        return gulp.src(sources, { cwd: gulpPath })
        // return gulp.src(sources)
            // NOTE: if babel settings aren't specified. babelrc in the source path would be used, and throw an error because node_modules aren't yet installed.
            // Therefore, babel settings need to be configured here.
            // Apparently process.cwd is changed in gulp pipeline and babel uses it for node_modules search.
            .pipe(babel({
                "presets": [`${__dirname}/../node_modules/es2015`, `${__dirname}/../node_modules/stage-0`],
                "plugins": [`${__dirname}/../node_modules/babel-plugin-transform-runtime`, `${__dirname}/../node_modules/babel-plugin-add-module-exports`],
                "babelrc": false
            }))
            // .pipe(babel())
            .pipe(gulp.dest(destination));
    }
};
