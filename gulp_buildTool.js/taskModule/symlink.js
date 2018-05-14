

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')).default,
	vfs = require('vinyl-fs'); // allows to copy symlinks as symlinks and not follow down the tree of files.
	
// DOESN'T WORK !!!!
export default (destination) => {
	return ()=> {
		// In gulp 4, you can return a child process to signal task completion
		return childProcess.spawn('ln', [`-s ${config.directory.gulpPath} /`], { cwd: destination, shell: true, stdio:[0,1,2] });
	};
}

// Note: working but symlinked folders throw errors.
export function DeployNecessaryWordpressFiles(sources, destination) {
	// using vfs to allow symlinks to be copied. Gulp V4 which is no released yet, has it native.
	return vfs.src(sources, {followSymlinks: false})
	  .pipe(plugins.plumber())
	  .pipe(vfs.dest(destination, {overwrite: true}))
	  .pipe(plugins.size({
			title: 'DeployNecessaryWordpressFiles'
	  }))
}