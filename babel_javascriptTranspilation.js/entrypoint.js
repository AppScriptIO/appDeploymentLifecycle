// babel JS Compiler
// .babelrc doesn't have a way to specify path. 

const path = require('path')
const filesystem = require('fs')
const moduleSystem = require('module')
// const babelDefaultConfig = requireJSON(`${__dirname}/.babelrc`) // load babelrc json.
// babelDefaultConfig.babelrc = false; // don't search for babelrc in transpiled file location.

// load non json extension as json.
function requireJSON(filePath) { return JSON.parse(filesystem.readFileSync(filePath, "utf8")) }; 

/**
 * Used to initialize nodejs app with transpiled code using Babel.
 */
function babelJSCompiler({
    babelConfigurationFile // {string} file containing bable configurations to be used.
}) {
    // Add babel node_modules to module resolving paths - Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
    const babelModulesPath = path.normalize(`${__dirname}/node_modules`)
    process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${babelModulesPath}`.replace(/(^\:+)/, '') // add another path by separating with ":"
    console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)   
    moduleSystem._initPaths()
    
    const babelRegister = require(`${__dirname}/node_modules/@babel/register`)
    babelConfiguration = require(`${__dirname}/compilerConfiguration/${babelConfigurationFile}`)
    
    // Compile code on runtime.
    babelRegister(babelConfiguration)
}

module.exports = babelJSCompiler