'use strict';

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
	source = subpath => { return joinPath(config.SourceCodePath, subpath) },
	destination = subpath => { return joinPath(config.DestinationPath, subpath) }

module.exports = (npmLocation) => {
	return async ()=> {
		// In gulp 4, you can return a child process to signal task completion
		try {
			childProcess.spawnSync('yarn',
			['install --pure-lockfile --production=false;'], { cwd: npmLocation, shell: true, stdio:[0,1,2] });
		} catch (error) {
			console.log('• ERROR - childprocess error.')
			console.log(error)
			process.exit(1)
		}
	};
}