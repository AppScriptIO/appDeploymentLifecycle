process.env.SZN_DEBUG = true

import path from 'path'
import rethinkDB from 'rethinkdb'
const configuration = require('../configuration/configuration.export.js')
import { spawnNext } from '../utilityFunction/spawnShellSquence.js'
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import initializeDatabaseData from '../databaseData/initializeDatabaseData.js'

const instructionConfiguration = require(path.join(
    configuration.directory.projectContainerRootFolder,
    process.env.instructionConfigurationFilePath
))[process.env.instructionOption]

function connect() {
    let connection = null;
    rethinkDB // Create connection
        .connect({
            host: 'rethinkdb', 
            port: 28015, 
            // db: 'webapp' 
        }, function(err, conn) {
            // if(err) {
            //     console.log(err)
            //     connection = connect()
            // } else {
                connection = conn
            // }
        })
    console.info(`☕Connected to RethinkDB.`)
    connection.close()
    return connection
}

(async function() {
    let connection = await rethinkDB.connect({
        host: 'rethinkdb',
        port: 28015,
    })

    await initializeDatabaseData(connection)

    let ShellscriptController = await createStaticInstanceClasses({ 
        implementationType: 'Shellscript',
        cacheName: true, 
        rethinkdbConnection: connection
    })

    // Initialize database data from files.
    let shellscriptController = await ShellscriptController.createContext()
   
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '25f4a639-3fcf-4378-9c04-60cf245cd916' })
    
    // Run linux commands on container image OS.
    console.log('Installing all necessary files.')
    // Run commands - array pattern.
    // let shellSequence = [
        //     { 
            //     },
            //     { 
                //     }, 
                // ]
                // applyImplementationOnShellCommand({ commandSetting: shellSequence })
                
    connection.close()
})()

let shellSequence = [
    // Install Docker Compose
    { // Run this command to download the latest version of Docker Compose:
        command: 'curl',
        argument: ['-L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    }, 
    { // Apply executable permissions to the binary:
        command: 'chmod',
        argument: ['+x /usr/local/bin/docker-compose;'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    },
    {
        command: 'docker-compose',
        argument: ['--version'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    },
    { // run rethinkdb for using in temporary build container
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `up --force-recreate rethinkdb`
        ],
        option: {
            // cwd: '/',
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        executionType: 'asynchronous'
    },

    // run dockerfile build
    {
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `build dockerfileBuild`
        ],
        option: {
            // cwd: '/',
            shell: true,
            stdio: [0, 1, 2],
            env: {
                dockerImage: process.env.dockerImage,
                DEPLOYMENT: 'imageBuild',
                instructionConfigurationFilePath: process.env.instructionConfigurationFilePath,
                instructionOption: 'install'
            }
        }, 
    },
]
// spawnNext(shellSequence)
