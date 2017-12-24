/**
 * Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
 */ 
const Mocha = require('mocha'),
    filesystem = require('fs'),
    path = require('path')
var mocha = new Mocha(); // Instantiate a Mocha instance.
var testDirectory = process.argv.slice(2)[0] // get first argument variable
const extensionName = '.test.js'    


/* List all files in a directory recursively */
console.log(`• Searching for ${extensionName} extension files.`)
var listFileRecursively = ({directory}) => {
    var results = []
    var list = filesystem.readdirSync(directory)
    list.forEach(filename => {
        let filepath = path.join(directory, filename)
        let stat = filesystem.statSync(filepath)
        if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({directory: filepath}))
        else results.push({ name: filename, path: filepath })
    })
    return results
}

// Add each .js file to the mocha instance
listFileRecursively({directory: testDirectory})
    .filter(file => {
        // Only keep the .test.js files
        return file.name.substr(-extensionName.length) === extensionName;
    })
    .forEach((file) => {
        mocha.addFile(file.path)
    })

// Run tests.
mocha.run(error => {
        // exit with non-zero status if there were failures
        process.on('exit', () => {
            throw error
            process.exit(error)
        })
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

