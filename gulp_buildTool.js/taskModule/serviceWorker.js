'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let swPrecache = require('sw-precache');
let path = require('path');

module.exports = (rootDir, callback) => {
  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [
      rootDir + 'app/**/*.{js,html,css}',
      rootDir + 'routing/**/*.{html,css}',

      // rootDir + 'content/mu-plugins/SZN_bower_components/**/*.{js,html,css}',


      // rootDir + 'content/mu-plugins/SZN_scripts_styles/css/**/*.{js,html,css,png,jpg,gif}',
      // rootDir + 'content/mu-plugins/SZN_scripts_styles/img/**/*.{js,html,css,png,jpg,gif}',
      // rootDir + 'content/mu-plugins/SZN_scripts_styles/js/**/*.{js,html,css,png,jpg,gif}',
      // rootDir + 'content/mu-plugins/SZN_web_components/elements/**/*.{js,html,css,png,jpg,gif}',
      // rootDir + 'content/themes/Dentrist/**/*.{js,html,css,png,jpg,gif}*',

      // rootDir + 'content/uploads/**/*.{js,html,css,png,jpg,gif}',
      // rootDir + 'content/mu-plugins/**/*.{js,html,css,png,jpg,gif}*',
    ],
    importScripts: ['app/javascripts/additional-service-worker.js'],
    stripPrefix: rootDir
  }, callback);
};