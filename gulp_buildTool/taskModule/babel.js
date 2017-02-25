'use strict';

let gulp = require('gulp'), 
    babel = require('gulp-babel')
 
module.exports = (sources, destination) => {
    return gulp.src(sources)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(destination));
};
