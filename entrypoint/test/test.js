const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import configuration from '../configuration/configuration.js'
const applicationPath = path.join(configuration.projectPath, 'application')
const appDeploymentLifecycle = path.join(configuration.projectPath, 'dependency/appDeploymentLifecycle')
console.log(process.argv)

/*
 * Usage:
 * • ./entrypoint.sh test unitTest
 * • ./entrypoint.sh test unitTest debug
 */
switch (process.argv.shift()) {
    case 'unitTest':
        console.log('Running unit tests.')
        let ymlFile = `${applicationPath}/setup/container/development.dockerCompose.yml`
        let serviceName = 'nodejs'
        let containerPrefix = 'talebwebapp'
        let sourceCodePath = path.join(configuration.SourceCodePath, 'serverSide')
        let debug = (process.argv.shift() == 'debug') ? '--harmony --inspect=0.0.0.0:9229 --debug-brk' : '';
        let command = `node ${debug} ${appDeploymentLifecycle}/javascriptTestRunner/ ${sourceCodePath}`
        spawnSync('docker-compose', [
                `-f ${ymlFile} --project-name ${containerPrefix} run --service-ports --entrypoint '${command}' ${serviceName}`
            ], {
                // cwd: `${applicationPath}`, 
                shell: true, 
                stdio: [0,1,2], 
                env: {
                    DEPLOYMENT: "development",
                    SZN_DEBUG: false,
                    hostPath: process.env.hostPath
                }
            })
    break;
    default:
    break;
}    


