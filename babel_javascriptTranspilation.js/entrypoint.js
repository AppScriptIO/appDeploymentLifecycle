// babel JS Compiler
// .babelrc doesn't have a way to specify path. 

const path = require('path')
const filesystem = require('fs')
const moduleSystem = require('module')
const babelRegister = require('babel-register')
// const babelDefaultConfig = requireJSON(`${__dirname}/.babelrc`) // load babelrc json.
// babelDefaultConfig.babelrc = false; // don't search for babelrc in transpiled file location.

// load non json extension as json.
function requireJSON(filePath) { return JSON.parse(filesystem.readFileSync(filePath, "utf8")) }; 

/**
 * Used to initialize nodejs app with transpiled code using Babel.
 */
function babelJSCompiler({
    appRootPath, // {string} node app root path.
    babelConfigurationFile // {string} file containing bable configurations to be used.
}) {
    babelConfiguration = require(`${__dirname}/compilerConfiguration/${babelConfigurationFile}`)
    
    // Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
    process.env.NODE_PATH = path.normalize(`${appRootPath}`)
    moduleSystem.Module._initPaths()

    // Compile code on runtime.
    babelRegister(babelConfiguration)
}

module.exports = babelJSCompiler