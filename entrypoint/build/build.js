const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import filesystem from 'fs'
import configuration from '../../../../setup/configuration/configuration.js'
const applicationPath = path.join(configuration.projectPath, 'application')
const appDeploymentLifecycle = path.join(applicationPath, 'dependency/appDeploymentLifecycle')
console.log(process.argv)

// ../utility/parseKeyValuePairSeparatedBySymbol.js is needed for 'imageName' argument.

let nodeModuleFolder = `${appDeploymentLifecycle}/entrypoint/build`
if(!filesystem.existsSync(`${nodeModuleFolder}/node_modules`)) {
    spawnSync('yarn', [ `install` ], {
        cwd: nodeModuleFolder, 
        shell: true, 
        stdio: [0,1,2],
    })
}

/*
 * Usage:
 * • ./entrypoint.sh build imageName=<application image name>
 * • ./entrypoint.sh build debug
 */
let ymlFile = `${appDeploymentLifecycle}/deploymentContainer/development.dockerCompose.yml`
let serviceName = 'nodejs'
let containerPrefix = 'app_build'
let debug, command, environmentVariable
switch (process.argv[0]) {
    default:
        debug = (process.argv[1] == 'debug' || process.argv[2] == 'debug') ? '--inspect=localhost:9229 --debug-brk' : '';
        let appEntrypointPath = `${appDeploymentLifecycle}/entrypoint/build/`
        command = `node ${debug} ${appEntrypointPath} build`
        environmentVariable = {
            DEPLOYMENT: "development",
            SZN_DEBUG: false,
            hostPath: process.env.hostPath,
            imageName: process.env.imageName || configuration.dockerImageName 
        }
        spawnSync('docker-compose', [
                `-f ${ymlFile} --project-name ${containerPrefix} run --service-ports --entrypoint '${command}' ${serviceName}`
            ], {
                // cwd: `${applicationPath}`, 
                shell: true, 
                stdio: [0,1,2], 
                env: environmentVariable
            })
    break;
}
