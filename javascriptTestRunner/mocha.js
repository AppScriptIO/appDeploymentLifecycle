/**
 * Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
 */ 
const Mocha = require('mocha'),
    filesystem = require('fs'),
    path = require('path')
const mocha = new Mocha(); // Instantiate a Mocha instance.
let testPath = process.argv.slice(2)[0] // get first argument variable (either file path or directory path) 
const extensionName = '.test.js'    


/* List all files in a directory recursively */
console.log(`• Searching for ${extensionName} extension files.`)
let listFileRecursively = ({directory}) => {
    let results = []
    let list = filesystem.readdirSync(directory)
    list.forEach(filename => {
        let filepath = path.join(directory, filename)
        let stat = filesystem.statSync(filepath)
        if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({directory: filepath}))
        else results.push({ name: filename, path: filepath })
    })
    return results
}

// Add each .js file to the mocha instance
if(testPath.endsWith(extensionName)) { // single test file path
    mocha.addFile(testPath)
} else { // treat path as directory
    listFileRecursively({directory: testPath})
        .filter(file => {
            // Only keep the .test.js files
            return file.name.substr(-extensionName.length) === extensionName;
        })
        .forEach((file) => {
            console.group('List of paths:')
            console.log(file)
            console.groupEnd()
            mocha.addFile(file.path)
        })

}

// Run tests.
try {
    mocha.run(error => {
            // exit with non-zero status if there were failures
            if(error) { 
                throw error
            }
            process.on('exit', () => {
                process.exit(error)
            })
            process.exit()
        })
        // .on('test', function(test) {
        //     console.log('Test started: '+test.title);
        // })
        // .on('test end', function(test) {
        //     console.log('Test done: '+test.title);
        // })
        // .on('pass', function(test) {
        //     console.log('Test passed');
        //     console.log(test);
        // })
        // .on('fail', function(test, err) {
        //     console.log('Test fail');
        //     console.log(test);
        //     console.log(err);
        // })
        // .on('end', function() {
        //     console.log('All done');
        // })

    
} catch (error) {    
    throw error
}
