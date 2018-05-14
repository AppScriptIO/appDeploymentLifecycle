import path from 'path'
import { transformNamedModuleToPath } from '../utility/transformPlugin.babel.js'

let presets = {
  "presets": [
    path.normalize(`${__dirname}/../node_modules/babel-preset-minify`),    
  ],
}

let plugins = {
  "plugins": [
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-import-meta`),
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-decorators`), { "legacy": true } ], // https://github.com/babel/babel/issues/7786
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-class-properties`), { "loose" : true } ],
    transformNamedModuleToPath,
  ],
}

module.exports = Object.assign({
    // When a file path matches this regex then it is **not** compiled
    "ignore": [/node_modules\/(?!appscript)/] // ignore everythng in node_modules except internal modules.
  },
  presets,
  plugins
)