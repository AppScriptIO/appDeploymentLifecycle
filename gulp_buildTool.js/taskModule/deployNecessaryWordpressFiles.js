'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let vfs = require('vinyl-fs'); // allows to copy symlinks as symlinks and not follow down the tree of files.

// Note: working but symlinked folders throw errors.
module.exports = (sources, destination) => {
  // using vfs to allow symlinks to be copied. Gulp V4 which is no released yet, has it native.
  return vfs.src(sources, {followSymlinks: false})
    .pipe(plugins.plumber())
    .pipe(vfs.dest(destination, {overwrite: true}))
    .pipe(plugins.size({
      title: 'DeployNecessaryWordpressFiles'
    }));
};