// .babelrc doesn't have a way to specify path. 

const path = require('path')
const filesystem = require('fs')
const mainModule = require('module')
function requireJSON(filePath) { return JSON.parse(filesystem.readFileSync(filePath, "utf8")) }; // load non json extension as json.
// const babelDefaultConfig = requireJSON(`${__dirname}/.babelrc`) // load babelrc json.
const babelDefaultConfig = require(`${__dirname}/babelConfig.js`) // load babelrc json.
// babelDefaultConfig.babelrc = false; // don't search for babelrc in transpiled file location.

module.exports = function(nodePath, appFilePath, babelConfig = babelDefaultConfig) {
    // Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
    process.env.NODE_PATH = path.normalize(`${nodePath}/`)
    mainModule.Module._initPaths()
    // Allow unreleased nodejs features
    require('babel-register')(babelConfig)
    require(appFilePath)
}

