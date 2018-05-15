const path = require('path')
const ConfigPath = __dirname,
    TaskModulePath = path.normalize(path.join(__dirname, '../../', 'gulp_buildTool.js' , 'taskModule/')),
    UtilityModulePath = path.normalize(path.join(__dirname, '../../', 'gulp_buildTool.js', 'utilityModule/'))
const confJson = require('../../../../setup/configuration/configuration.js')


module.exports = Object.assign ({}, {
    // TODO: create object of constants http://stackoverflow.com/questions/10843572/how-to-create-javascript-constants-as-properties-of-objects-using-const-keyword
    ConfigPath,
    TaskModulePath,
    UtilityModulePath,
}, 
confJson)