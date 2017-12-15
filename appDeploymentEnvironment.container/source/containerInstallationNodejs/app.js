import { spawn, exec } from 'child_process'
import path from 'path'
import shell from 'shelljs'
import rethinkDB from 'rethinkdb'
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import initializeDatabaseData from './databaseData/initializeDatabaseData.js'
import configuration from '../../setup/configuration.js'

;(async function() {
    let connection = await rethinkDB.connect({ host: 'rethinkdb', port: 28015 })

    await initializeDatabaseData(connection)
    
    // Run linux commands on container image OS.
    console.log('Installing all necessary files.')
    let ShellscriptController = await createStaticInstanceClasses({
        implementationType: 'Shellscript',
        cacheName: true, 
        rethinkdbConnection: connection
    })
    // Initialize database data from files.
    let shellscriptController = await ShellscriptController.createContext({ 
        appBasePath: configuration.appBasePath,
        shellscriptPath: path.join(configuration.appBasePath, 'source/containerInstallationNodejs/shellScript')
    })
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '8762516e-26fe-444b-b72f-dce374a33266' })
    
    connection.close()
})()
