const path = require('path')
const { script } = require('./script.config.js')

const ownConfiguration = {
  directory: {
    root: path.resolve(`${__dirname}/..`),
  },
  script,
  transpilation: {
    babelConfigKey: 'serverRuntime.BabelConfig.js',
    get babelConfig() {
      const { getBabelConfig } = require('@dependency/javascriptTranspilation')
      return getBabelConfig(ownConfiguration.transpilation.babelConfigKey, { configType: 'json' })
    },
  },
}

module.exports = ownConfiguration
