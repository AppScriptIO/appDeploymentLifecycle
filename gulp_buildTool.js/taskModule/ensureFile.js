

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let filesystem = require('fs');

/** Ensure Files
 * @param {Array<string>} files
 * @param {Function} cb
 */
export default (files, cb) => {
  var missingFiles = files.reduce(function(prev, filePath) {
    var fileFound = false;

    try {
      fileFound = filesystem.statSync(filePath).isFile();
    } catch (e) { }

    if (!fileFound) {
      prev.push(filePath + ' Not Found');
    }

    return prev;
  }, []);

  if (missingFiles.length) {
    var err = new Error('Missing Required Files\n' + missingFiles.join('\n'));
  }

  if (cb) {
    cb(err);
  } else if (err) {
    throw err;
  }
};