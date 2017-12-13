import { spawn, exec } from 'child_process'
import shell from 'shelljs'
import rethinkDB from 'rethinkdb'
let createStaticInstanceClasses = require(__dirname + '/node_modules/appscript/module/reusableNestedUnit')
import { applyImplementationOnShellCommand } from '../containerDeploymentManagement.js.container/utilityFunction/spawnShellSquence.js'


async function connect() {
    let connection
    try {
        connection = await rethinkDB // Create connection
            .connect({
                host: 'rethinkdb', 
                port: 28015, 
                db: 'webapp' 
            })
    } catch (e) {
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
        console.info(`☕Connection failed to RethinkDB, retrying.`)
        connection = await connect()
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
        return connection
    }
    console.info(`☕Connected to RethinkDB.`)
    return connection
}

(async function() {
    let connection = await connect()
    
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
        
})()