'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let Rsync = require('rsync');
let path = require('path');
let mkdirp = require('mkdirp');

// using gulp-rsync
function x(rootSource, source, destination) {
  return gulp.src(source)
    .pipe(plugins.rsync({
      // paths outside of root cannot be specified.
      root: rootSource,
      destination: destination,
      incremental: true,
      compress: true,
      // recursive: true,
      // clean: true, // --delete - deletes files on target. Files which are not present on source.
      // dryrun: true, // for tests use dryrun which will not change files only mimic the run.
      // progress: true,
      // skip files which are newer on target/reciever path.
      update: true
      // args this way doesn't work ! should use the equevalent options in API
      // args: ['--verbose', '--compress', '--update', '--dry-run']
      // DOESN'T WORK FOR MULTIPLE PATHS - error "outside of root" When relatice is off rsync can recieve multiple paths through gulp.src.
      // relative: false
    }));
};

// NOTE: joinPath.js module was used instead of path.join module. If any problems appear, rollback.
module.exports = (rootSource, source, destination, extraOptions) => {
    let options = {
      'a': true, // archive
      'v': true, // verbose
      'z': true, // compress
      'R': false, // relative
      'r': true // recursive
    };
    if(typeof extraOptions !== 'undefined') {
      options = Object.assign(options, extraOptions);
    } 
    var rsync = new Rsync()
    .flags(options)
    // .exclude('+ */')
    // .include('/tmp/source/**/*')
    .source(path.join(rootSource, source))
    .destination(path.join(destination, source));
    
    // Create directory.
    return new Promise(resolve => {
      mkdirp(path.join(destination, source), function(err) {     
        // Execute the command 
        rsync.execute(function(error, code, cmd) {
          resolve();
        }, function(data) {
          console.log(' ' + data);
        });
      });
    });
};