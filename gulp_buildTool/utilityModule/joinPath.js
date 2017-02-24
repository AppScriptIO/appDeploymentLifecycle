'use strict';

let checktype = require('type-of-is');
let path = require("path");

let joinPath = (mainpath, subpath) => {

  if (typeof(subpath)==='undefined') subpath = null;

  if (subpath == null) {
    return mainpath;
  } else {
    if(checktype(subpath, String)) {
      return path.join(mainpath, subpath);
    } else {
      let combined = subpath.map(value => {
        return path.join(mainpath, value);
      });
      return combined;
    }
  }

};

module.exports = joinPath;