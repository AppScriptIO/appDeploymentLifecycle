const path = require('path')
const { script } = require('./script.config.js')

const ownConfig = {
  directory: {
    root: path.resolve(`${__dirname}/..`),
    get source() {
      return path.join(ownConfig.directory.root, './source')
    },
    get distribution() {
      return path.join(ownConfig.directory.root, './distribution')
    },
    get test() {
      return path.join(ownConfig.directory.root, './test')
    },
    get script() {
      return path.join(ownConfig.directory.root, './script')
    },
    get resource() {
      return path.join(ownConfig.directory.root, './resource')
    },
  },
  get script() {
    return [...script, ...[{ type: 'directory', path: ownConfig.directory.script }]]
  },
  entrypoint: {
    programmaticAPI: './script.js',
  },
  transpilation: {
    babelConfigKey: 'serverRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@deployment/javascriptTranspilation')
      return getBabelConfig(ownConfig.transpilation.babelConfigKey, { configType: 'json' })
    },
  },
}

module.exports = Object.assign({}, ownConfig)
