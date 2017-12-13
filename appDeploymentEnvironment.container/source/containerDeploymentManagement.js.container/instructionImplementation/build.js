process.env.SZN_DEBUG = true

import path from 'path'
import rethinkDB from 'rethinkdb'
const configuration = require('../configuration/configuration.export.js')
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import initializeDatabaseData from '../databaseData/initializeDatabaseData.js'

(async function() {
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
    let shellscriptController = await ShellscriptController.createContext()
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '0676d0b7-aa35-47fa-ac63-59fc594356eb' })
    
    connection.close()
})()

