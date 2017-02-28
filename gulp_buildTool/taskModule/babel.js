'use strict';

let gulp = require('gulp'), 
    babel = require('gulp-babel')
 
module.exports = (sources, destination) => {
    return gulp.src(sources)
        // NOTE: if babel settings aren't specified. babelrc in the source path would be used, and throw an error because node_modules aren't yet installed.
        // Therefore, babel settings need to be configured here.
        .pipe(babel({
            "presets": ["es2015", "stage-0"],
            "plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"],
            "babelrc": false
        }))
        .pipe(gulp.dest(destination));
};
