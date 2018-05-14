import gulp from 'gulp'
import path from 'path'
import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
const config = require('configuration/configuration.js') // configuration
const gulpTaskExecution = require(path.join(config.UtilityModulePath, 'gulpTaskExecution.js')).default(gulp)

import { taskSetting as clientSideTaskSetting, taskAggregationSetting as clientsideTaskAggregationSetting } from './buildStepDefinition/clientSide.taskSetting.js'
import { taskSetting as nativeTaskSetting, taskAggregationSetting as nativeTaskAggregationSetting } from './buildStepDefinition/native.taskSetting.js'
import { taskSetting as polyfillTaskSetting, taskAggregationSetting as polyfillTaskAggregationSetting } from './buildStepDefinition/polyfill.taskSetting.js'
import { taskSetting as serverSideTaskSetting, taskAggregationSetting as serverSideTaskAggregationSetting } from './buildStepDefinition/serverSide.taskSetting.js'

// for registring Task functions
let taskSetting = Array.prototype.concat(
	clientSideTaskSetting,
	nativeTaskSetting,
	polyfillTaskSetting,
	serverSideTaskSetting
)
// for executing task chain/aggregation
let taskAggregationSetting = Array.prototype.concat(
	clientsideTaskAggregationSetting,
	nativeTaskAggregationSetting,
	polyfillTaskAggregationSetting,
	serverSideTaskAggregationSetting,
	[{
		name: 'build',
		executionType: 'series',
		childTask: [
			{
				label: 'serverSide:build'
			},
			{
				label: 'clientSide:build'
			},
			{
				label: 'nativeClientSide:build'
			}, 
			// {
			// 	label: 'polyfillClientSide:build'
			// },
		]
	}]
)

gulpTaskExecution({ taskSetting, taskAggregationSetting }) // register tasks.

// ⌚ Watch file changes from sources to destination folder.
gulp.task('watch:source', ()=> {

	// assets
	gulp.watch(
		[
			source('**/*'),
			source('**/*')
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			gulp.parallel(
				// 'build:css'
			)
		)
	);

});
