const directoryPathConfig = require('./directoryPath.config.js')

function mergeConfiguration({ 
    configurationArray // {array} array of configuration objects.
}) {
    let mergedArray = []
    for( let index in configurationArray ) {
        let relatedConfigurationArray = configurationArray[index]
        relatedConfigurationArray.forEach( specificConfiguration => {
            // get array key of objects that contain deploymentType similar to the specificConfigiuration
            let filteredKeyArray = Object.keys(mergedArray).filter( key => {
                return mergedArray[key].deploymentType == specificConfiguration.deploymentType
            })
            // check if deploymentType exists in the combined array.
            if (filteredKeyArray.length > 0) {
                // NOTE: repetitive loop
                // change value of object in the array.
                mergedArray = mergedArray.map( currentValue => {
                    if(currentValue.deploymentType == specificConfiguration.deploymentType) {
                        return Object.assign(currentValue, specificConfiguration)
                    }
                })
            } else {
                // add to array
                mergedArray.push(specificConfiguration)
            }
        })
    }
    return mergedArray
}

let configurationTypeArray = mergeConfiguration({ configurationArray: [ directoryPathConfig ] })
let configuration = configurationTypeArray.filter( object => { // get the specific set of configuration values for the current DEPOLYMENT type.
    return object.deploymentType == process.env.DEPLOYMENT
})[0]

module.exports = configuration