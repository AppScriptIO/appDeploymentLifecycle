const { execSync, spawn, spawnSync } = require('child_process')
import path from 'path'
import filesystem from 'fs'
import sshModule from 'node-ssh'
import configuration from '../../../../setup/configuration/configuration.js'
const applicationPath = path.join(configuration.directory.projectPath, 'application')
const appDeploymentLifecycle = path.join(applicationPath, 'dependency/appDeploymentLifecycle')
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '../utility/parseKeyValuePairSeparatedBySymbol.js'

console.group('• Running entrypoint application in Manager Container:')    
console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`)
const namedArgs = parseKeyValuePairSeparatedBySymbolFromArray({ array: process.argv }) // ['x=y'] --> { x: y }

/*
 * Usage:
 * • ./entrypoint.sh production remoteIP=<remote prod vm> [imageTag=<version saved in dockerhub >]
 */
let ymlFile = `${appDeploymentLifecycle}/deploymentContainer/production.dockerStack.yml`
let serviceName = 'nodejs'
let containerPrefix = 'app'
switch (process.argv[0]) {
    default: 
        deployProjectionStack({})
    break;
}

// use ssh to connect to remote server and send production.dockerStack.yml file then execute stack deployment
async function deployProjectionStack({}) {
    let remoteWorkingDirectory = '/tmp/sshUploadedFile'

    // connect to remote vm
    const ssh = new sshModule()
    await ssh.connect({
        host: namedArgs.remoteIP,
        port: '22',
        username: process.env.sshUsername,
        privateKey: path.join(configuration.directory.projectPath, '.ssh/google_compute_engine'),
        readyTimeout: 120000
    }).catch(error => { throw error }).then(() => { console.log('SSH Connection successful') })
    
    // upload yml file
    await ssh.putFile(ymlFile, path.join(remoteWorkingDirectory, 'production.dockerStack.yml')).then(function() {
        console.log(`production.dockerStack.yml uploaded to ${remoteWorkingDirectory}/production.dockerStack.yml`)
    }, function(error) {
        console.log("Failed to upload production.dockerStack.yml file.")
        console.log(error)
    })

    // TODO: before deploying the stack, make sure the required folders for docker container mount are present if not create them.

    // deploy stack 
    let stackName = configuration.stackName
    let environmentVariable = {
        imageName: configuration.dockerImageName, 
        imageTag: namedArgs.imageTag || 'latest', 
        domain: configuration.domain,
        hostStorageFolderName:  configuration.hostStorageFolderName
    }
    let inlineArgument = combineKeyValueObjectIntoString({ object: environmentVariable }) // pass variables by prefixing argumnets before docker stack command
    await ssh.execCommand(
        // env $(cat .env | grep ^[A-Z] | xargs) // create from env varibales inline command arguments, just like below
        `sudo ${inlineArgument} docker stack deploy -c ./production.dockerStack.yml ${stackName}`, 
        { 
            cwd: remoteWorkingDirectory, 
            stream: 'stdout', 
            options: { 
                // env: environmentVariable // doesn't work, issue with ssh2 module & another issue with docker stack not passing environment variables.
            },
        }
    ).then(function(output) {
        console.log('stdout:')
        console.log(output.stdout)
    })
    

    console.log('• Closing connection.')
    ssh.dispose() // close connection    
}
