import filesystem from 'fs';

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')).default,
	source = subpath => { return joinPath(config.directory.SourceCodePath, subpath) },
	destination = subpath => { return joinPath(config.directory.DestinationPath, subpath) };

export default ({ nodejsVersion, jspmLocation }) => async () => {

	// In gulp 4, you can return a child process to signal task completion
	// var process = childProcess.execSync('n stable; jspm install; n ' + nodejsVersion, { cwd: jspmLocation, shell: true, stdio:[0,1,2] });
	let packageJson = require(path.join(jspmLocation, 'package.json'))
	let packageFolder;
	if(packageJson.jspm.directories.packages) {
		packageFolder = path.join(jspmLocation, packageJson.jspm.directories.packages)
	} else {
		packageFolder = path.join(jspmLocation, 'jspm_packages')
	}
	
	if(! filesystem.existsSync(packageFolder)) {
		var process = childProcess.execSync('jspm install', { cwd: jspmLocation, shell: true, stdio:[0,1,2] });
		return await process;
	} else {
		console.log('Skipping JSPM, as package folder already exist.')
		return
	}

}