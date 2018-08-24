console.log(`\x1b[33m\x1b[1m\x1b[7m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Host machine JS Script:`, `- for starting up the containers on the OS of the local host machine.`)
const scriptFilePath = process.env['_']
console.log(`\x1b[2m\x1b[3m\tFile path (relative to execution):\x1b[0m \x1b[33m${scriptFilePath}\x1b[0m`)

/* Entrypoint chain */
    // Transpilation - babelJSCompiler
    require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js' })
    // Run
    export const hostCLIAdapter = require('./script.js').script