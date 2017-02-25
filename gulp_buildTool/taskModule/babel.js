'use strict';

import gulp from 'gulp'
import babel from 'gulp-babel'
 
export default (sources, destination) => {
    return gulp.src(sources)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(destination));
};
