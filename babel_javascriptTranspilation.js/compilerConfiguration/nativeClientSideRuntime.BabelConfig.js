import path from 'path'
import { transformNamedModuleToPath, minifyHtmlTemplateLiterals } from '../utility/transformPlugin.babel.js'
import babelPresetMinifyConfig from './babelPresetMinifyModuleConfig.js'

let presets = {
  "presets": [
    babelPresetMinifyConfig    
  ],
}

let plugins = {
  "plugins": [
    /* Syntax */
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-dynamic-import`),
    path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-import-meta`),
    // path.normalize(`${__dirname}/../node_modules/@babel/plugin-syntax-decorators`),
    /* Transform */
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-decorators`), { "legacy": true } ], // https://github.com/babel/babel/issues/7786
    [ path.normalize(`${__dirname}/../node_modules/@babel/plugin-proposal-class-properties`), { "loose" : true } ],
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