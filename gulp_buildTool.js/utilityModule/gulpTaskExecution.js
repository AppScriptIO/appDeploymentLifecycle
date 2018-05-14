function gulpTaskExecution(executionType, childTask = [], gulp) {
    let childTaskExecuted = []
    childTask.map((task) => {
        if(typeof(task.childTask) != 'undefined') {
            childTaskExecuted.push(gulpTaskExecution(task.executionType, task.childTask))
        } else {
            childTaskExecuted.push(task.label)
        }
    })
    let callback;
    switch(executionType) {
        case 'parallel':
            callback = gulp.parallel(...childTaskExecuted)
        break;
        case 'series':
            callback = gulp.series(...childTaskExecuted)
        break;
    }
    return callback
}

export default (gulp) => ({taskSetting, taskAggregationSetting}) => {
        // create node tasks
        taskSetting.map(node => {
            let func;
            try {
                if(node.data.module) { // load as import module
                    func = require(node.data.path)[node.data.module]
                } else { // load as default export
                    func = require(node.data.path)
                    if(func.default) func = func.default
                }
            } catch (error) {
                handleError(error, node, func)
            }

            let scopedFunction; 
            try {
                // execute function with argument of type object or type array
                if(Array.isArray(node.data.argument)) {
                    scopedFunction = func(...node.data.argument)
                } else {
                    scopedFunction = func(node.data.argument)
                }
            } catch (error) {
                handleError(error, node, func)
            }

            gulp.task(node.key, scopedFunction)
        })
        // let taskName = `${node.gulpTaskDependency}:${node.key}`

        // define gulpTaskDependency tasks
        taskAggregationSetting.map(gulpTaskDependency => {
            gulp.task(gulpTaskDependency.name, gulpTaskExecution(gulpTaskDependency.executionType, gulpTaskDependency.childTask, gulp) )
        })

}

function handleError(error, node, func) {
    console.group('File setting error: ')
    console.log(func)
    console.log(node)
    console.groupEnd()
    throw error
} 