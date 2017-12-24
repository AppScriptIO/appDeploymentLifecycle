// 'use strict'; // Strict enforces specific conditions and imported scripts may have problems.
// 😄 This file is used to define Gulp tasks with source path and destination path. While gulp_includeNodeModules.js is used to save the functions for the build.

import gulp from 'gulp'
import path from 'path'
import config from 'configuration/configuration.js' // configuration

// livereloading
require('gulpfile.taskLivereload.js')

const passedCommandArray /* Array */ = process.argv.slice(2) // this returns array of the passed tasks names.
gulp.parallel(passedCommandArray)() // execute tasks.
