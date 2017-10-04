import { spawn, exec } from 'child_process'
import shell from 'shelljs'
import spawnNext from '../containerDeploymentManagement.js.container/spawnShellSquence.js'

console.log('Installing all necessary files.')

let shellSequence = [
    { 
        command: 'apt-get',
        argument: ['upgrade -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    }, 
    { 
        command: 'apt-get',
        argument: ['update -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    }, 
    { 
        command: 'apt-get',
        argument: ['update -y --fix-missing'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }
    }, 
]

spawnNext(shellSequence)
    