process.env.SZN_DEBUG = true
import path from 'path'
const { spawn, spawnSync } = require('child_process')
import rethinkDB from 'rethinkdb'
import configuration from '../../../setup/configuration.js'
const instructionConfiguration = require('../configuration/configuration.export.js')
let createStaticInstanceClasses = require('appscript/module/reusableNestedUnit')
import initializeDatabaseData from '../databaseData/initializeDatabaseData.js'

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
        dockerImageTag: process.env.dockerImageTag,
        dockerImageName: process.env.dockerImageName
    })
    await shellscriptController.initializeNestedUnit({ nestedUnitKey: '0676d0b7-aa35-47fa-ac63-59fc594356eb' })

    connection.close()
})()

