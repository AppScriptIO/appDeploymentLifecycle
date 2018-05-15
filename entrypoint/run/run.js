console.log('• Running entrypoint application in Manager Container in default mode.')    
console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`)

const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import filesystem from 'fs'
import configuration from '../../../../setup/configuration/configuration.js'
import sleep from './sleep.run.js'
const applicationPath = path.join(configuration.directory.projectPath, 'application')
const appDeploymentLifecycle = path.join(applicationPath, 'dependency/appDeploymentLifecycle')
const distributionServerSide = configuration.distribution.serverSide
const serverSidePath = configuration.directory.serverSidePath

// Install modules for the app to be run in the spawn app container 
let nodeModuleFolder = `${applicationPath}/source/serverSide/node_modules`
let packageManagerFolder = `${applicationPath}/source/packageManager/server.yarn/`
if(!filesystem.existsSync(nodeModuleFolder)) {
    spawnSync('yarn', [ `install` ], {
        cwd: packageManagerFolder, 
        shell: true, 
        stdio: [0,1,2],
    })
}

/*
 * Usage:
 * • ./entrypoint.sh run
 * • ./entrypoint.sh run sleep // run app with no containerCommand, but sleep to keep the container running
 * • ./entrypoint.sh run debug
 * • ./entrypoint.sh run distribution
 * • ./entrypoint.sh run distribution debug
 * • ./entrypoint.sh run livereload
 * • ./entrypoint.sh run livereload debug
 * • ./entrypoint.sh run livereload distribution
 * • ./entrypoint.sh run livereload distribution debug
 */
let ymlFile = `${appDeploymentLifecycle}/deploymentContainer/development.dockerCompose.yml`
let serviceName = 'nodejs'
let containerPrefix = 'app'
switch (process.argv[0]) {
    case 'sleep': 
            sleep({ymlFile, serviceName, containerPrefix})
    break;
    default:

        /***
         *  TODO: Implement: 
         * • livereload + distribution
         * • distribution
         * • livereload
         * • & default normal mode.
         * As livereaload + distribution != distribution alone
         */
        let appEntrypointPath = (process.argv.includes('distribution') && false/* disable loading built serverSide entrypoint */) ? 
            `${distributionServerSide}/entrypoint.js` : 
            `${serverSidePath}/entrypoint.js`;
        console.log(`App enrypoint path: ${appEntrypointPath}`)
        
        // when using `localhost` chrome shows the files in folders, while using `0.0.0.0` files appear as separated.
        // `0.0.0.0` allows access from any port (could be usful in containers as external connections not always referred to localhost it seems.)
        let debugCommand = (process.argv.includes('debug')) ? 
            `--inspect${ process.argv.includes('break')?'-brk':'' }=0.0.0.0:9229`: 
            '';
        
        let containerCommand = (process.argv.includes('livereload')) ? 
            `node ${debugCommand} ${appDeploymentLifecycle}/nodejsLivereload/ watch:livereload` :
            `node ${debugCommand} ${appEntrypointPath}`;
        console.log(`• nodejs containerCommand = ${containerCommand}`)
        
        let environmentVariable = {
            DEPLOYMENT: "development",
            SZN_DEBUG: (debugCommand) ? true : false,
            SZN_DEBUG_COMMAND: debugCommand,
            hostPath: process.env.hostPath
        }
        if(process.argv.includes('distribution')) environmentVariable['DISTRIBUTION'] = true
        if(process.argv.includes('distribution')) 
            Object.assign( // shallow merge
                environmentVariable,
                {
                    SZN_OPTION_ENTRYPOINT_NAME: "entrypoint.js",
                    SZN_OPTION_ENTRYPOINT_PATH: "/project/application/distribution/serverSide/"
                }
            );

        // Run docker application container using yml configuration file.
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
    break;
}

