const path = require('path')

let presets = {
  "presets": [
  ],
}

// babel-runtime transform plugin is not needed for production/published code.

let plugins = {
  "plugins": [
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-transform-modules-commonjs`),  // transform static import
    path.normalize(`${__dirname}/../node_modules/babel-plugin-dynamic-import-node`), // transform dynamic import
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-decorators`), { "legacy": true } ], // https://github.com/babel/babel/issues/7786
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-class-properties`), { "loose" : true } ], // static class parameter
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