const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import filesystem from 'fs'
import configuration from '../../../../setup/configuration/configuration.js'
const applicationPath = path.join(configuration.directory.projectPath, 'application')
const appDeploymentLifecycle = path.join(applicationPath, 'dependency/appDeploymentLifecycle')
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '../utility/parseKeyValuePairSeparatedBySymbol.js'

console.group('• Running entrypoint application in Manager Container:')    
console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`)
const namedArgs = parseKeyValuePairSeparatedBySymbolFromArray({ array: process.argv }) // ['x=y'] --> { x: y }

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
 * • ./entrypoint.sh build dockerImage imageName=<application image name>
 * • ./entrypoint.sh build debug
 * • ./entrypoint.sh build task=<a gulpTask> // e.g. ./setup/entrypoint.sh build task=nativeClientSide:html:metadata
 */
let ymlFile = `${appDeploymentLifecycle}/deploymentContainer/deployment.dockerCompose.yml`
let containerPrefix = 'app_build'
switch (process.argv[0]) {
    // TODO: separate buildSourceCode from buildContainerImage
    // TODO: implement image build - example implementation in appDeploymentEnvironment -> entrypoint "buildEnvironmentImage.js"
    case 'containerImage': {
        let serviceName = 'buildImage'
        let environmentVariable = {
            SZN_DEBUG: false,
            hostPath: process.env.hostPath,
            imageName: namedArgs.imageName || process.env.imageName || configuration.dockerImageName 
        }

        let processCommand = 'docker-compose',
            processCommandArgs = [
                `-f ${ymlFile}`,
                `--project-name ${containerPrefix}`,
                `build --no-cache ${serviceName}`
            ],
            processOption = {
                // cwd: `${applicationPath}`, 
                shell: true, 
                stdio: [0,1,2], 
                env: environmentVariable
            }
        spawnSync(processCommand, processCommandArgs, processOption)
    } break;

    case 'sourceCode':
    default: {
        let serviceName = 'nodejs'
        let debugCommand = (process.argv.includes('debug')) ? 
        `--inspect${ process.argv.includes('break')?'-brk':'' }=0.0.0.0:9229`: 
        '';
        let gulpTask = namedArgs.task || 'build'
        let appEntrypointPath = `${appDeploymentLifecycle}/entrypoint/build/`
        let containerCommand = `node ${debugCommand} ${appEntrypointPath} ${gulpTask}`
        let environmentVariable = {
            DEPLOYMENT: "development",
            SZN_DEBUG: false,
            hostPath: process.env.hostPath,
            imageName: namedArgs.imageName || process.env.imageName || configuration.dockerImageName 
        }

        let processCommand = 'docker-compose',
            processCommandArgs = [
                `-f ${ymlFile}`,
                `--project-name ${containerPrefix}`,
                `run --service-ports`,
                `--entrypoint '${containerCommand}'`,
                `${serviceName}`
            ],
            processOption = {
                // cwd: `${applicationPath}`, 
                shell: true, 
                stdio: [0,1,2], 
                env: environmentVariable
            }
        spawnSync(processCommand, processCommandArgs, processOption)
    } break;
}
