const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const jsonminify = require('gulp-jsonminify')

export default ({ sources, destination }) => () => {
    return gulp.src(sources)
        .pipe(jsonminify())
        .pipe(gulp.dest(destination))
        .pipe(plugins.size({
            title: 'json'
        }))
}