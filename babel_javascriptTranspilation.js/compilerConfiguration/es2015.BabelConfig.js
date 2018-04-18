const path = require('path')

let presets = {
  "presets": [
    path.normalize(`${__dirname}/../node_modules/@babel/preset-es2015`), 
    path.normalize(`${__dirname}/../node_modules/@babel/preset-stage-0`)
  ],
}

let plugins = {
  "plugins": [
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-transform-runtime`), 
    path.normalize(`${__dirname}/../node_modules/babel-plugin-dynamic-import-node`),
    path.normalize(`${__dirname}/../node_modules/babel-plugin-add-module-exports`),
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-decorators-legacy`),
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-function-parameter-decorators`),
    [path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-class-properties`), { "spec": false }],
    // path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-decorators-legacy`), // Support decorators for extending class and class properties using @ syntax. This is legacy because the new standard is underimplementation.
  ],
}

module.exports = Object.assign({
    // When a file path matches this regex then it is **not** compiled
    "ignore": [/node_modules\/(?!appscript)/] // ignore everythng in node_modules except internal modules.
  },
  presets,
  plugins
)