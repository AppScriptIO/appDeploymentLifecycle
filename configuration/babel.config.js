const configuration = require('./'),
  { getBabelConfig } = require('@deployment/javascriptTranspilation')

module.exports = getBabelConfig(configuration.transpilation.babelConfigKey, { configType: 'functionApi' })
