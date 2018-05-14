const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ 
	pattern: ['*'],
	camelize: false, 
	replaceString: /(?!)/ /* regex that never matches, i.e. don't replace "gulp-" */ 
})

export default ({ src, dest }) => () => {
  return gulp.src(src)
  .pipe(plugins.imagemin({
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(dest))
  .pipe(plugins['gulp-size']({
    title: 'imageOptimizeTask'
  }))

}
