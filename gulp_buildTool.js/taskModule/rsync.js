let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let Rsync = require('rsync');
let path = require('path');
let mkdirp = require('mkdirp');

// using gulp-rsync
function x(baseSource, source, destination) {
  return gulp.src(source)
    .pipe(plugins.rsync({
      // paths outside of root cannot be specified.
      root: baseSource,
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
export default ({ source, destination, algorithm = null, copyContentOnly = false, extraOptions } = {}) => {

  if(copyContentOnly) source = `${source}/` // add trailing slash - as rsync will copy only contants when trailing slash is present.

  switch (algorithm) {
    case 'sourceToSame':
      return () => {
        let options = {
          'a': true, // archive
          // 'v': true, // verbose
          'z': true, // compress
          'R': false, // relative - will create a nested path inside the destination using the full path of the source folder.
          'r': true // recursive
        };
        if(typeof extraOptions !== 'undefined') options = Object.assign(options, extraOptions)
        let rsync = new Rsync()
          .flags(options)
          // .exclude('+ */')
          // .include('/tmp/source/**/*')
          .source(source)
          .destination(destination)
        
        // Create directory.
        return new Promise(resolve => {
          mkdirp(destination, function(err) {     
            // Execute the command 
            rsync.execute(function(error, code, cmd) {
              console.log(`• RSync ${source} to ${destination}`)
              resolve()
            }, function(data) {
              console.log(' ' + data)
            })
          })
        })
      }
    break;
    default:
      return () => {
        let options = {
          'a': true, // archive
          // 'v': true, // verbose
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
        .source(source)
        .destination(destination);
        
        // Create directory.
        return new Promise(resolve => {
          mkdirp(destination, function(err) {     
            // Execute the command 
            rsync.execute(function(error, code, cmd) {
              resolve();
            }, function(data) {
              console.log(' ' + data);
            });
          });
        });
      }
    break;
  }
};