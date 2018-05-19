const path = require('path')

let presets = {
  "presets": [
  ],
}

// TODO: cannot use "plugin-syntax-decorators" with "plugin-transform-function-parameter-decorators" - in compatible with babel 7 beta 47
let plugins = {
  "plugins": [
    /* Syntax */
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    // path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-decorators`),
    /* Runtime */
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-transform-runtime`), // runtime required
    /* Transform */
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-transform-modules-commonjs`),  // transform static import
    path.normalize(`${__dirname}/../node_modules/babel-plugin-dynamic-import-node`), // transform dynamic import
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-decorators`), { "legacy": true } ], // transform decorators - // https://github.com/babel/babel/issues/7786
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-class-properties`), { "loose" : true } ], // transform static class parameter
    path.normalize(`${__dirname}/../node_modules/babel-plugin-transform-function-parameter-decorators`), // function parameter decorator
  ],
}

module.exports = Object.assign({
    // When a file path matches this regex then it is **not** compiled
    "ignore": [/node_modules\/(?!appscript)/] // ignore everythng in node_modules except internal modules.
  },
  presets,
  plugins
)