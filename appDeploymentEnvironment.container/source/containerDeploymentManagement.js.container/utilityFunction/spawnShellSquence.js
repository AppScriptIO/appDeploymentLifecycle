import { exec, spawn, spawnSync } from 'child-process-promise'

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
                process.exit(1)
                // console.error('[spawn] ERROR: ', error);
            })         
    }
}              

async function awaitSpawn(shellSequence) {
    console.log(`• EXECUTING: ${shellSequence.command} ${shellSequence.argument} \n USING: ${JSON.stringify(shellSequence.option)}`)
    try {
        await spawn(shellSequence.command, shellSequence.argument, shellSequence.option)        
    } catch (error) {
        // console.log(error)
        process.exit(1);
    }
}
    
export async function applyImplementationOnShellCommand({ commandSetting = [] }) {
    for (let document of commandSetting) {
        switch (document.implementation) {
            case 'spawn':
            default:
                await awaitSpawn(document)
            break;
        }
    }
}