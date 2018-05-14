const path = require('path')
const moduleSystem = require('module')
const { execSync, spawn, spawnSync } = require('child_process')
const filesystem = require('fs')

const appRootPath = path.normalize(`${__dirname}`)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

// Run babel runtime compiler
//TODO: change volumes to point to /project/application/dependency instead of /project/dependency
const babelJSCompilerPath = path.normalize(`../babel_javascriptTranspilation.js/`)
function installModule({ currentDirectory }) { spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] }) }
{
    let directory = babelJSCompilerPath
    let isNodeModuleExist = filesystem.existsSync(`${directory}/node_modules`)
    if (!isNodeModuleExist) {
      installModule({ currentDirectory: directory })
      // spawnSync('yarn', ["upgrade appscript"], { cwd: directory, shell: true, stdio:[0,1,2] });
    }
}
const babelJSCompiler = require(babelJSCompilerPath)
babelJSCompiler({
    babelConfigurationFile: 'serverRuntime.BabelConfig.js'
})

//TODO: Work with JSDom module for frontend testing using nodejs.

// run app code
require('./mocha.js')