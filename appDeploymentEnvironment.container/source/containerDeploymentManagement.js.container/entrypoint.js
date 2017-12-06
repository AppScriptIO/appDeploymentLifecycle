const moduleSystem = require('module')
const filesystem = require('fs')
const { spawn, spawnSync } = require('child_process')
const path = require('path')
const configuration = require('./configuration/configuration.export.js')
const babelJSCompiler = require(`${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js/entrypoint.js`)
const nodeModuleFolderPath = __dirname + "/node_modules" 

// Install nodejs packages before  
function installModule({ currentDirectory }) {
  let yarnInstall = spawnSync('yarn', ["install"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] });
  // yarnInstall.on('close', (code) => {
  // console.log(`Yarn Install - child process exited with code ${code}`);
  // })
}

const appRootPath = path.normalize(__dirname)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}`.replace(/(^\:+)/, '')
moduleSystem._initPaths()

let isNodeModuleExist = filesystem.existsSync(nodeModuleFolderPath)
if (!isNodeModuleExist) installModule({ currentDirectory: __dirname })

installModule({ currentDirectory: `${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js` })

// install babel transpilation
babelJSCompiler({
  babelConfigurationFile: 'es2017Import.BabelConfig.js'
})

// Run app
require('./app.js')
