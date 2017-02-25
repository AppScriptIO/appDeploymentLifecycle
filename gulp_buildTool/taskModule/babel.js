'use strict';

let gulp = require('gulp'), 
    babel = require('gulp-babel')
 
module.exports = (sources, destination) => {
    return gulp.src(sources)
        .pipe(babel())
        .pipe(gulp.dest(destination));
};
