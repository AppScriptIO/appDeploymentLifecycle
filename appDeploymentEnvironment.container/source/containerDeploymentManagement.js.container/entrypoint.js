const moduleSystem = require('module')
const filesystem = require('fs')
const { spawn } = require('child_process')
const path = require('path')
const configuration = require('./configuration/configuration.export.js')
const babelJSCompiler = require(`${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js/entrypoint.js`)
const nodeModuleFolderPath = __dirname + "/node_modules" 

// Install nodejs packages before  
async function installModule({ currentDirectory }) {
  let yarnInstall = spawn('yarn', ["install"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] });
  yarnInstall.on('close', (code) => {
    console.log(`Yarn Install - child process exited with code ${code}`);
  })
}

process.env.NODE_PATH = nodeModuleFolderPath
moduleSystem.Module._initPaths()

let isNodeModuleExist = filesystem.existsSync(nodeModuleFolderPath)
if (!isNodeModuleExist) installModule({ currentDirectory: __dirname })

// install babel transpilation
installModule({ currentDirectory: `${configuration.directory.projectContainerRootFolder}/dependency/babel_javascriptTranspilation.js` })

babelJSCompiler({
  appRootPath: __dirname, 
  babelConfigurationFile: 'es2017Import.BabelConfig.js'
})

require('./app.js')
