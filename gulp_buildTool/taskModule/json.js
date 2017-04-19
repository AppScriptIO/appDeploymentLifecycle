const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const jsonminify = require('gulp-jsonminify');

module.exports = (sources, destination) => {
	return () => {
        return gulp.src(sources)
            .pipe(jsonminify())
            .pipe(gulp.dest(destination))
	}
};