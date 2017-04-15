const stream = require('stream');

const self = class FragmentIndentation extends stream.Transform {
    static indentation = {
        openning: {
            regex: /{%/g,
            symbol: '{%',
            length: 2
        },
        closing: {
            regex: /%}/g,
            symbol: '%}',                
            length: 2
        }
    }
    static fragmentKey = 'FRAGMENT'
    static fragmentArray = []

    constructor() {
        super({objectMode: true})
    }

    static TransformToFragmentKeys() {
        return new (class extends self {
            _transform(file, encoding, callback){
                if (file.isStream()) return callback(new Error('☕ SZN - fragmentIndentation does not support streams'));
                let contents = file.contents.toString()
                file.contents = new Buffer(self.replaceIndentationWithFragmentKey(contents))
                callback(null, file);
            }
        })()
    }

    static TransformBackToFragment() {
        return new  (class extends self {
            _transform(file, encoding, callback){
                if (file.isStream()) return callback(new Error('☕ SZN - fragmentIndentation does not support streams'));
                let contents = file.contents.toString()
                file.contents = new Buffer(self.replaceOriginalFragment(contents))
                callback(null, file);
            }
        })()
    }

    static replaceOriginalFragment(string) {
        for (var fragmentKey in self.fragmentArray) {
            string = string.replace(fragmentKey, self.fragmentArray[fragmentKey])            
        }
        self.fragmentArray = []
        return string
    }

    static replaceIndentationWithFragmentKey(string) {
        let fragmentArray = []
        let match = null
        while(string.lastIndexOf(self.indentation.openning.symbol) >= 0) {
            let startIndex = string.lastIndexOf(self.indentation.openning.symbol)
            let endIndex = string.lastIndexOf(self.indentation.closing.symbol) + self.indentation.closing.length
            let generatedKey = self.generateKey(7, fragmentArray)
            let insertedString = self.fragmentKey + generatedKey
            self.fragmentArray[`${insertedString}`] = string.substring(startIndex, endIndex)
            string = self.replaceBetweenIndexes(string, startIndex, endIndex, insertedString)
        }
        // let occurenceArray = self.indexRangeOfFragmentOccurence(string, self.indentation.openning, self.indentation.closing)
        return string
    }
    
    static generateKey(length, notInArray) {
        let key;
        do {
            key = Math.random().toString().slice(2, length + 2)
        } while (typeof(notInArray[key]) != "undefined")
        return key
    }

    static replaceBetweenIndexes(string, startIndex, endIndex, insertedString) {
        return string.substring(0, startIndex) + insertedString + string.substring(endIndex);
    };

    static indexRangeOfFragmentOccurence(string, indentationOpenning, indentationClosing) {
        let arrayOpenning = self.indexOfOccurence(string, indentationOpenning)
        let arrayClosing = self.indexOfOccurence(string, indentationClosing)
        let combinedIndexArray = self.mergeArraysToArrayObjectOfSameSize(arrayOpenning, arrayClosing)
    }

    static indexOfOccurence(string, indentation) {
        let match, matches = [];
        while ((match = indentation.regex.exec(string)) != null) {
            matches.push(match.index);
        }
        return matches
    }

    static mergeArraysToArrayObjectOfSameSize(arrayOpenning, arrayClosing) {
        let length = arrayOpenning.length
        let combined = []
        for (var index = 0; index < length; index++) {
            combined.push({ openning: arrayOpenning[index], closing: arrayClosing[index] })
        }
        return combined
    }
    

}


module.exports = { 
    FragmentIndentation: self
}