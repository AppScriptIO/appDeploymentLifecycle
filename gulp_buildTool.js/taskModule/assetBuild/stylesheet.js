

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let cleanCSS = require('gulp-clean-css');

// Other browesers configuration :
// var AUTOPREFIXER_BROWSERS = ['last 2 versions', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];
let AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

export default ({ sources, destination }) => () => {
  return gulp.src(sources)
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS,
      cascade: false
    }))
    .pipe(plugins.if('*.css', cleanCSS()))
    .pipe(gulp.dest(destination))
    .pipe(plugins.size({
      title: 'styleTask'
    }))
}
