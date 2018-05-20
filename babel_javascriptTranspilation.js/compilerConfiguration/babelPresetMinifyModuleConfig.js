const path = require('path')
module.exports = [ path.normalize(`${__dirname}/../node_modules/babel-preset-minify`), {
    // options - https://github.com/babel/minify/tree/master/packages/babel-preset-minify
    booleans: true, 
    builtIns: true, 
    consecutiveAdds: true, 
    deadcode: true, 
    evaluate: true, 
    flipComparisons: true, 
    guards: true, 
    infinity: true, 
    mangle: true, 
    memberExpressions: true, 
    mergeVars: true, 
    numericLiterals: true, 
    propertyLiterals: true, 
    regexpConstructors: true, 
    removeConsole: true, 
    removeDebugger: true, 
    removeUndefined: true, 
    replace: true, 
    simplify: false, // turn off because "babel-plugin-minify-simplify" adds a comma after nad before server side rendered fragments "{% %}" which causes syntax errors.
    simplifyComparisons: true, 
    typeConstructors: true, 
    undefinedToVoid: true, 
} ]