const configuration = require('./'),
  { getBabelConfig } = require('@dependency/javascriptTranspilation')

module.exports = getBabelConfig(configuration.transpilation.babelConfigKey, { configType: 'functionApi' })
