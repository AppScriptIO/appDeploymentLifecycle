const { initialize, eslintJSLinterFunc } = require('@deployment/javascriptStaticAnalysis')
initialize()

module.exports = eslintJSLinterFunc()
