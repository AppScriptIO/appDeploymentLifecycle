let tablePrefix = 'shellscript_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./unit.js'),
    require('./nestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})