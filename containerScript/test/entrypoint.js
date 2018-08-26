import path from 'path'
const { execSync, spawn, spawnSync } = require('child_process')
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '@dependency/parseKeyValuePairSeparatedBySymbol'
import configuration from '../../../../setup/configuration/configuration.js'
const applicationPath = path.join(configuration.directory.projectPath, 'application')
const appDeploymentLifecyclePath = require.resolve('@dependency/appDeploymentLifecycle/package.json')

// console.group('• Running entrypoint application in Manager Container:')    
// console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`)
// const namedArgs = parseKeyValuePairSeparatedBySymbolFromArray({ array: process.argv }) // ['x=y'] --> { x: y }

// /*
//  * Usage:
//  * • ./entrypoint.sh test unitTest
//  * • ./entrypoint.sh test unitTest debug
//  * • ./entrypoint.sh test unitTest path=<pathToFile>/entrypoint.test.js // single test file execution.
//  */
// let ymlFile = `${appDeploymentLifecycle}/deploymentContainer/deployment.dockerCompose.yml`,
//     serviceName = 'nodejs',
//     containerPrefix = 'app_test',
//     sourceCodePath = path.join(configuration.directory.SourceCodePath, 'serverSide')

// switch (process.argv[0]) {
//     case 'unitTest':
//     default:
//         console.log('Running unit tests.')
//         let debugCommand = (process.argv.includes('debug')) ? 
//             `--inspect${ process.argv.includes('break')?'-brk':'' }=0.0.0.0:9229`: 
//             '';
//         let appEntrypointPath = `${appDeploymentLifecycle}/javascriptTestRunner/`
//         let firstNodeCommand = namedArgs['path'] || sourceCodePath // command passed to node module environment
//         let containerCommand = `node ${debugCommand} ${appEntrypointPath} ${firstNodeCommand}`
//         let environmentVariable = {
//             DEPLOYMENT: "development",
//             SZN_DEBUG: false,
//             hostPath: process.env.hostPath,
//             imageName: namedArgs.imageName || process.env.imageName || configuration.dockerImageName 
//         }

//         let processCommand = 'docker-compose',
//             processCommandArgs = [
//                 `-f ${ymlFile}`,
//                 `--project-name ${containerPrefix}`,
//                 `run --service-ports --use-aliases`,
//                 `--entrypoint '${containerCommand}'`,
//                 `${serviceName}`
//             ],
//             processOption = {
//                 // cwd: `${applicationPath}`, 
//                 shell: true, 
//                 stdio: [0,1,2], 
//                 env: environmentVariable
//             }
//         spawnSync(processCommand, processCommandArgs, processOption)
//     break;
// }
