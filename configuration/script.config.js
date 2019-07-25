const path = require('path')
const resolvedModule = {
  get deploymentScript() {
    return path.dirname(require.resolve(`@dependency/deploymentScript/package.json`))
  },
}

module.exports = {
  script: [
    {
      type: 'directory',
      path: `${resolvedModule.deploymentScript}/script`,
    },
    {
      type: 'directory',
      path: './script',
    },
  ],
}
