// babel JS Compiler
// .babelrc doesn't have a way to specify path. 

const   path = require('path'),
        filesystem = require('fs'),
        moduleSystem = require('module'),
        appDeploymentLifecycle = `${__dirname}/../`,
        { addModuleResolutionPath } = require(`${appDeploymentLifecycle}/utilityModule/addModuleResolutionPath.js`)
  
// const babelDefaultConfig = requireJSON(`${__dirname}/.babelrc`) // load babelrc json.
// babelDefaultConfig.babelrc = false; // don't search for babelrc in transpiled file location.
function requireJSON(filePath) { return JSON.parse(filesystem.readFileSync(filePath, "utf8")) }// load non json extension as json.

/**
 * Used to initialize nodejs app with transpiled code using Babel, through an entrypoint.js which loads the app.js
 */
function babelJSCompiler({
    babelConfigurationFile // {string} file containing bable configurations to be used.
}) {
    const babelModulesPath = path.normalize(`${__dirname}/node_modules`)
    addModuleResolutionPath({ pathArray: [ babelModulesPath ] }) // Add babel node_modules to module resolving paths
        
    const babelRegister = require(`${__dirname}/node_modules/@babel/register`)
    babelConfiguration = require(`${__dirname}/compilerConfiguration/${babelConfigurationFile}`)
    console.log(`\x1b[2m\x1b[3m• Babel:\x1b[0m Compiling code at runtime.`)
    babelRegister(babelConfiguration) // Compile code on runtime.
}

module.exports = babelJSCompiler