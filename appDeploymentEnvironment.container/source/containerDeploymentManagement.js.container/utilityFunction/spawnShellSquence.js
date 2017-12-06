import { exec, spawn } from 'child-process-promise'

/**
 * Execute several shell scripts in sequence.
 * @param {array of objects} shellSequence 
 * - {string} command
 * - {array of strings} argument
 * - {object} option
 */
export async function spawnNext(shellSequence) {
    if(shellSequence.length > 0) {
        let currentShell = shellSequence.shift()
        console.log(`• EXECUTING: ${currentShell.command} ${currentShell.argument} \n USING: ${JSON.stringify(currentShell.option)}`)
        spawn(currentShell.command, currentShell.argument, currentShell.option)
            .then(buffer => {
                spawnNext(shellSequence)
            })
            .catch(error => {
                console.error('[spawn] ERROR: ', error);
            })            
    }
}              

export async function applyImplementationOnShellCommand({ commandSetting = [] }) {
    for (let document of commandSetting) {
        switch (document.implementation) {
            case 'spawn':
            default:
            await spawnNext([document])
            console.log('synchronous ?')
            break;
        }
    }
}