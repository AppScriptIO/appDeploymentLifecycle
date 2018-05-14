const gulp = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })

export default ({ src, dest }) => () => {
  return gulp.src(src)
  .pipe(plugins.imagemin({
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(dest))
  .pipe(plugins.size({
    title: 'imageOptimizeTask'
  }))
}
