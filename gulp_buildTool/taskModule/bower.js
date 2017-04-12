'use strict';

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
	source = subpath => { return joinPath(config.SourceCodePath, subpath) },
	destination = subpath => { return joinPath(config.DestinationPath, subpath) }

export default (bowerLocation) => {
	return async ()=> {
		// In gulp 4, you can return a child process to signal task completion
		return childProcess.execSync('bower install --allow-root;', { cwd: bowerLocation, shell: true, stdio:[0,1,2] });
	};
}