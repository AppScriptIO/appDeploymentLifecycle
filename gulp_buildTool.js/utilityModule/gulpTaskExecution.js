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

module.exports = (gulp) => {
    return (FileSource, GulpTaskDependency) => {
        // create FileSource tasks
        FileSource.map(fileSource => {
            gulp.task(fileSource.key, require(fileSource.gulpTaskFunction.path)(...fileSource.gulpTaskFunction.argument))
        })
        // let taskName = `${fileSource.gulpTaskDependency}:${fileSource.key}`

        // define gulpTaskDependency tasks
        GulpTaskDependency.map(gulpTaskDependency => {
            gulp.task(gulpTaskDependency.name, gulpTaskExecution(gulpTaskDependency.executionType, gulpTaskDependency.childTask, gulp) )
        })

    }
}