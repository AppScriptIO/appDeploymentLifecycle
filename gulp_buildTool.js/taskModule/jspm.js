'use strict';

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
	source = subpath => { return joinPath(config.SourceCodePath, subpath) },
	destination = subpath => { return joinPath(config.DestinationPath, subpath) }

module.exports = (nodejsVersion, jspmLocation)=> {
	return async ()=> {
		// In gulp 4, you can return a child process to signal task completion
		// var process = childProcess.execSync('n stable; jspm install; n ' + nodejsVersion, { cwd: jspmLocation, shell: true, stdio:[0,1,2] });
		var process = childProcess.execSync('jspm install', { cwd: jspmLocation, shell: true, stdio:[0,1,2] });
		return await process;
	}
}