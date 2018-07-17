const   path = require('path'),
        moduleSystem = require('module'),
        jsEntrypointPath = path.dirname(require.main.filename) // entrypoint directory path (current nodejs process root path)

// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
// '${appRootPath}' allows for folders/modules inside the main folder to be called with out using relative paths.
// '${appRootPath}/node_modules' allows for modules from upper herarchies to call modules from sibling folders. e.g. source/x calls source/y/node_modules/module
function addModuleResolutionPath({
    pathArray = [] // paths to add to the node module resolution paths
} = {}) {
    // add nodejs default path to NODE_PATH, i.e. "node_modules"
    if(!process.env.NODE_PATH) process.env.NODE_PATH = `${jsEntrypointPath}/node_modules`
    // add paths to the NODE_PATH string
    for(let nodeModulePath of pathArray) {
        process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${nodeModulePath}`
        process.env.NODE_PATH = process.env.NODE_PATH.replace(/(^\:+)/, '') // ":<path>:<path>" -> "<path>:<path>" remove empty section in the beginning in case NODE_PATH was undefined.
    }
    
    let nodePathArray = process.env.NODE_PATH.split(':') // default NODE_PATH is composed of paths separated by semicolon (one complete string of paths).
    let nodePathFormatted = '\t'.concat(nodePathArray.join('\n\t')) // add a tab and linebreak between paths
    console.log(`\x1b[2m\x1b[3m%s \n%s\x1b[0m'`, `• Node\'s module resolution paths:`, `${nodePathFormatted}`)
    moduleSystem._initPaths() // reflect change on the running app.
}

module.exports = {
    addModuleResolutionPath
}