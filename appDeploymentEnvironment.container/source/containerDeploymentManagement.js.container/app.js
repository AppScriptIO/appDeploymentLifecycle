import path from 'path'
import Docker from 'dockerode'
import { exec, spawn } from 'child-process-promise'
const configuration = require('./configuration/configuration.export.js')
import spawnNext from './spawnShellSquence.js'

console.log('• instructionConfigurationFilePath:' + process.env.instructionConfigurationFilePath)
console.log('• instructionOption:' + process.env.instructionOption)
console.log(configuration)

switch (process.env.instructionOption) {
    case 'build': {
        const instructionConfiguration = require(path.join(configuration.directory.projectContainerRootFolder, process.env.instructionConfigurationFilePath))[process.env.instructionOption]
        
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

            // run dockerfile build
            {
                command: 'docker-compose',
                argument: [`-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml build dockerfile`],
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
                }
            },
        ]

        spawnNext(shellSequence)
    } break;
    case 'install': {
        let instructionConfigurationPath = path.join(configuration.directory.projectContainerRootFolder, process.env.instructionConfigurationFilePath)
        const instructionConfiguration = require(instructionConfigurationPath)[process.env.instructionOption]
        let installationModulePath = path.join(configuration.directory.projectContainerRootFolder, instructionConfiguration.installationModulePath)
        require(installationModulePath)
    } break;
    case 'run':
        // (function endlessProcess() { process.nextTick(endlessProcess) })() // Readable solution but it utilizes all available CPU. https://stackoverflow.com/questions/39082527/how-to-prevent-the-nodejs-event-loop-from-exiting
        setInterval(() => {  console.log('setTimeout/setInterval (sleep) command ended. The process will exit now.'); }, 10000 * 60 * 60);
    break;
    default:
        console.log('default')
        // var docker = new Docker({socketPath: '/var/run/docker.sock'})
        // var container = docker.getContainer('4ba04235356e8f07d16f2bd2d4aa351a97d50eb3775d7043b63a29861412735a');
        // container.inspect(function (err, data) {
        //     console.log(data);
        // });
    break;
}
