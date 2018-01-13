const path = require('path')
const confJson = require('../../../../../setup/configuration/configuration.js')
const ConfigPath = __dirname,
    TaskModulePath = path.join(confJson.appDeploymentLifecyclePath, 'gulp_buildTool.js' , 'taskModule/'),
    UtilityModulePath = path.join(confJson.appDeploymentLifecyclePath, 'gulp_buildTool.js', 'utilityModule/'),
    TaskImplementationPath = path.join(confJson.GulpPath, 'taskImplementation/')

module.exports = Object.assign({}, 
    confJson, 
    {
        // TODO: create object of constants http://stackoverflow.com/questions/10843572/how-to-create-javascript-constants-as-properties-of-objects-using-const-keyword
        ConfigPath,
        TaskModulePath,
        UtilityModulePath,
        TaskImplementationPath,
    }
)