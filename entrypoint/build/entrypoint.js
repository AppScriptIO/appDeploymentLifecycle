const path = require('path')
const confJson = require('./configuration/configuration.js')
const moduleSystem = require('module')
const filesystem = require('fs')
const { execSync, spawn, spawnSync } = require('child_process')

const appRootPath = path.normalize(`${__dirname}`)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

// Run babel runtime compiler
const gulpBuildToolFolder = path.normalize(`${confJson.directory.appDeploymentLifecyclePath}/gulp_buildTool.js/`)
function installModule({ currentDirectory }) { spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] }) }
{
    let directory = gulpBuildToolFolder
    let isNodeModuleExist = filesystem.existsSync(`${directory}/node_modules`)
    if (!isNodeModuleExist) {
        installModule({ currentDirectory: directory })
        // spawnSync('yarn', ["upgrade appscript"], { cwd: directory, shell: true, stdio:[0,1,2] });
    }
}
const babelJSCompilerPath = path.normalize(`${confJson.directory.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js/entrypoint.js`)
const babelJSCompiler = require(babelJSCompilerPath)
babelJSCompiler({
    babelConfigurationFile: 'serverRuntime.BabelConfig.js'
})

// run app code
require('./gulpfile.js')