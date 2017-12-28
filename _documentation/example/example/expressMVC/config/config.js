var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.DEPLOYMENT || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'expressmvc'
    },
    port: process.env.PORT || 3000,
  },

  test: {
    root: rootPath,
    app: {
      name: 'expressmvc'
    },
    port: process.env.PORT || 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'expressmvc'
    },
    port: process.env.PORT || 3000,
  }
};

module.exports = config[env];
