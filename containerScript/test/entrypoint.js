/**
 * This script requires that the container 
 */

import path from 'path'
const { execSync, spawn, spawnSync } = require('child_process')
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '@dependency/parseKeyValuePairSeparatedBySymbol'
import configuration from '../../../../../../setup/configuration/configuration.js'
const applicationPath = path.join(configuration.directory.projectPath, 'application'),
      appDeploymentLifecyclePath = path.dirname(require.resolve('@dependency/appDeploymentLifecycle/package.json')),
      javascriptTestRunnerPath = path.dirname(require.resolve('@dependency/javascriptTestRunner/package.json'))

console.group('• Running entrypoint application in Manager Container:')    
console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`)
const namedArgs = parseKeyValuePairSeparatedBySymbolFromArray({ array: process.argv }) // ['x=y'] --> { x: y }

/*
 * Usage:
 * • ./entrypoint.sh test unitTest
 * • ./entrypoint.sh test unitTest debug
 * • ./entrypoint.sh test unitTest path=<pathToFile>/entrypoint.test.js // single test file execution.
 */
function unitTest({
    container = {
        imageName: namedArgs.imageName || process.env.imageName || configuration.dockerImageName,
        ymlFile: `${appDeploymentLifecyclePath}/deploymentContainer/deployment.dockerCompose.yml`,
    },
    nodeFlag = {
        debug: process.argv.includes('debug'),
        break: process.argv.includes('break')
    },
    testRunnerModulePath = javascriptTestRunnerPath, // path of the module that includes the test framework.
    testPath = namedArgs['path'] || '/project/application/source', // path to test directory.
    applicationPathOnHostMachine = process.env.applicationPathOnHostMachine || applicationPath // this path should be already resolved to Unix path from Windows path including the drive letter, which will be used in MobyLinuxVM.
} = {
    // When running inside container, docker client communicates with MobeyLinuxVM on Windows host machine, and the volume paths will be related or referencing to the hyper-v MobyLinuxVM vm. In it here is a folder /host_mount/c that corresponds to the Widnows host filesystem drive.
    // when variable names are similar declaring the variable and assigning it in the first object causes not defined ReferenceError.
}) {
    let serviceName = 'nodejs',
        containerPrefix = 'app_test'

    console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Running Container:`, `NodeJS App`)
    let debugCommand = (nodeFlag.debug) ? `--inspect${ nodeFlag ? '-brk' : '' }=0.0.0.0:9229`: '';
    let appEntrypointPath = testRunnerModulePath
    let firstNodeCommand = testPath // command passed to node module environment
    // Print container title
    // let printMessageNodeCommand = `node --eval "console.log(String(/${containerStartupMessage}/).substring(1).slice(0,-1))"` // String(/Allows to write string without qoutes/).substring(1).slice(0,-1) // qoutes are being stripped for some reason, probably by docker-compose.
    let containerCommand = `node ${debugCommand} ${appEntrypointPath} ${firstNodeCommand}`
    
    let environmentVariable = {
        DEPLOYMENT: "development",
        SZN_DEBUG: false,
        applicationPathOnHostMachine,
        imageName: container.imageName 
    }
    let processCommand = 'docker-compose',
        processCommandArgs = [
            `-f ${container.ymlFile}`,
            `--project-name ${containerPrefix}`,
            `run --service-ports --use-aliases`,
            `--entrypoint "${containerCommand}"`,
            `${serviceName}`
        ],
        processOption = {
            // cwd: `${applicationPath}`, 
            shell: true, 
            stdio: [0,1,2], 
            env: Object.assign(
                process.env, // PATH environment variable is required for docker-composer to run.  PATH - specifies the directories in which executable programs
                environmentVariable
            )
        }
    console.log(`%s %s`, processCommand, processCommandArgs.join(' '))
    spawnSync(processCommand, processCommandArgs, processOption)

}


// TODO: pass CLI arguments & environment variables using the 'cliAdapter' function rather than default destructioring parameters above.
/**
 * USAGE:
 * ./setup/entrypoint.js containerManager entrypointConfigurationKey=test testType=unitTest
 */
function cliAdapter({
    testType = namedArgs['testType'] || null,
} = {}) {
    switch (testType) {
        default: 
            case 'undefined': 
            console.error('• No `testType` passed. Test type should be the passed - e.g. `testType=unitTest`.')
        break;
        case 'unitTest': {
            unitTest()
        } break;
    }

}

cliAdapter()