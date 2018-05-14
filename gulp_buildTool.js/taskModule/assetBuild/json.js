import gulp from 'gulp'
const plugins = require('gulp-load-plugins')({ 
	pattern: ['*'],
	camelize: false, 
	replaceString: /(?!)/ /* regex that never matches, i.e. don't replace "gulp-" */ 
})

export default ({ sources, destination }) => () => {
    return gulp.src(sources)
        .pipe(plugins['gulp-jsonminify']())
        .pipe(gulp.dest(destination))
        .pipe(plugins['gulp-size']({
            title: 'json'
        }))
}