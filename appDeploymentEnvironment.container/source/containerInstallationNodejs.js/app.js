import { spawn, exec } from 'child_process'
import shell from 'shelljs'
import createStaticInstanceClasses from 'appscript/module/reusableNestedUnit'
import { applyImplementationOnShellCommand } from '../containerDeploymentManagement.js.container/utilityFunction/spawnShellSquence.js'

let ShellscriptController = createStaticInstanceClasses({ 
    implementationType: 'Shellscript',
    cacheName: true
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
    