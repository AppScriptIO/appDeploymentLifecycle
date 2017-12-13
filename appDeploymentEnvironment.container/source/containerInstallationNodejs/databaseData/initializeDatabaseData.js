import { createDatabase, createTableAndInsertData } from "appscript/utilityFunction/database/initializeDatabase.query.js";
import databaseData from './data.entrypoint.js'

function initializeDatabaseData(connection) {
    return createDatabase('webappSetting', connection)
        .then(async () => {
            await createTableAndInsertData('webappSetting', databaseData.webappSetting, connection)
        })
}

export default initializeDatabaseData