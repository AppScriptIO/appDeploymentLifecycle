import { spawn, exec } from 'child_process'
import shell from 'shelljs'
import { applyImplementationOnShellCommand } from '../containerDeploymentManagement.js.container/utilityFunction/spawnShellSquence.js'

console.log('Installing all necessary files.')

let shellSequence = [
    { 
        command: 'apt-get',
        argument: ['update -y --fix-missing'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    }, 
    // { 
    //     command: 'apt-get',
    //     argument: ['upgrade -y'],
    //     option: {
    //         shell: true,
    //         stdio: [0, 1, 2]
    //     },
    //     implementation: 'spawn'
    // }, 
    // { 
    //     command: 'apt-get',
    //     argument: ['update -y'],
    //     option: {
    //         shell: true,
    //         stdio: [0, 1, 2]
    //     },
    //     implementation: 'spawn'        
    // }, 
]

applyImplementationOnShellCommand({ commandSetting: shellSequence })
    