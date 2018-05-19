import path from 'path'
import { transformNamedModuleToPath, minifyHtmlTemplateLiterals } from '../utility/transformPlugin.babel.js'

// TODO: fix polyfill - add polyfill for native import, es2015 currently causes errors, etc.

let presets = {
  "presets": [
    path.normalize(`${__dirname}/../node_modules/@babel/preset-es2015`),  
    path.normalize(`${__dirname}/../node_modules/babel-preset-minify`),
    // path.normalize(`${__dirname}/../node_modules/@babel/preset-stage-0`),
  ],
}

let plugins = {
  "plugins": [
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-import-meta`),
    // path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-decorators`),
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-decorators`), { "legacy": true } ], // https://github.com/babel/babel/issues/7786
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-class-properties`) ,{ "loose" : true } ],
    transformNamedModuleToPath,
    // minifyHtmlTemplateLiterals // TODO: transform tagged template literals in js files (minify).
  ],
}

module.exports = Object.assign({
    // When a file path matches this regex then it is **not** compiled
    "ignore": [/node_modules\/(?!appscript)/] // ignore everythng in node_modules except internal modules.
  },
  presets,
  plugins
)