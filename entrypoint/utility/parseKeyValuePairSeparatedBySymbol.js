// 'x=y' --> { x: y }
export function parseKeyValuePairSeparatedBySymbolConcatenatedString({ string, delimiter = ' ', separatingSymbol = '=' }) {
    
    return parseKeyValuePairSeparatedBySymbolFromArray({ 
        array: string.split(separatingSymbol)
    })
}

// ['x=y'] --> { x: y }
export function parseKeyValuePairSeparatedBySymbolFromArray({ array, separatingSymbol = '=' }) {
    let parsedObject = {}
    array.forEach( pair => {
        let array = pair.split(separatingSymbol);
        array[1] && (parsedObject[array[0]] = array[1]);
    })
    return parsedObject
}


export function combineKeyValueObjectIntoString({ object, delimiter = ' ', separatingSymbol='=' }) {
    return Object.keys(object)
        .reduce((previous, key) => {
            previous.push(`${key}${separatingSymbol}${object[key]}`)
            return previous;
        }, [])
        .join(delimiter)
} 