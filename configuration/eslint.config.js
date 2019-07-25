const { initialize, eslintJSLinterFunc } = require('@dependency/javascriptStaticAnalysis')
initialize()

module.exports = eslintJSLinterFunc()
