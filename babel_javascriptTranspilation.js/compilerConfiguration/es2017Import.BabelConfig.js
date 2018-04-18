
const path = require('path')

module.exports = {
  "presets": [ // a collection of plugins.
    // `${__dirname}/../node_modules/babel-preset-es2015`,
    // `${__dirname}/../node_modules/babel-preset-stage-2`
  ],
  "plugins": [
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-runtime`), // transform during initialization, on first entrypoint nodejs file.
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-es2015-modules-commonjs`), // transform import and export to commonjs modules.
    path.normalize(`${__dirname}/../node_modules/babel-plugin-dynamic-import-node`), // transform import() function which is still not supported in nodejs v8
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-decorators-legacy`), // Support decorators for extending class and class properties using @ syntax. This is legacy because the new standard is underimplementation.
    // `${__dirname}/../node_modules/babel-plugin-syntax-dynamic-import` // NOT SURE IF NEEDED - allow babel to parse import() function.
  ],
  "ignore": /node_modules\/(?!appscript)/ // ignore everythng in node_modules except internal modules.
}

