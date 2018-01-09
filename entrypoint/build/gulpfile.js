// 'use strict'; // Strict enforces specific conditions and imported scripts may have problems.
// 😄 This file is used to define Gulp tasks with source path and destination path. While gulp_includeNodeModules.js is used to save the functions for the build.

import gulp from 'gulp'
import path from 'path'
import merge from 'merge-stream' // A method to dynamically add more sources to the stream.
import filesystem from 'fs'
import config from 'configuration/configuration.js' // configuration
export const include = (file)=> { eval(filesystem.readFileSync(file) + '') }, // Execute file code as if written locally.
    joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
    source = subpath => { return joinPath(config.SourceCodePath, subpath) },
    destination = subpath => { return joinPath(config.DestinationPath, subpath) },
    plugins = require('gulp-load-plugins')({ camelize: true })

// Deployment container - tasks responsible for builds that happen through temporary container (from one volume to another).
require('gulpfile.taskThroughContainer.js')

const passedCommandArray /* Array */ = process.argv.slice(2) // this returns array of the passed tasks names.
gulp.parallel(passedCommandArray)() // execute tasks.
