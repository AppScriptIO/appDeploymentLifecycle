import rethinkDB from 'rethinkdb' 
import {default as getTableDocumentDefault} from "appscript/utilityFunction/database/query/getTableDocument.query.js";

function initializeDatabaseData() {
    return () => {
        const connection = Application.rethinkdbConnection

        async function createTableAndInsertData(databaseName, databaseData) {
            for (let tableData of databaseData) {
                await rethinkDB.db(databaseName).tableCreate(tableData.databaseTableName).run(connection)
                    .then(async tableCreationResponse => {
                        if(tableCreationResponse.tables_created > 0) console.log(`📢 ${tableData.databaseTableName} table created.`)
                        await rethinkDB.db(databaseName).table(tableData.databaseTableName).insert(tableData.data).run(connection)
                            .then(response => {
                                console.log(`📢📥 ${response.inserted} documents inserted to ${tableData.databaseTableName}.`)
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(`📢 ${tableData.databaseTableName} table already exists.`))
            }
        }

        let databaseData = require('databaseDefaultData/databaseData.js')
        
        createDatabase('webappSetting')
            .then(async () => {
                await createTableAndInsertData('webappSetting', databaseData.webappSetting)
            })
    }
}

export default initializeDatabaseData