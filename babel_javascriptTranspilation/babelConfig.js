module.exports = {
  "presets": [`${__dirname}/node_modules/babel-preset-es2015`, `${__dirname}/node_modules/babel-preset-stage-0`],
  "plugins": [`${__dirname}/node_modules/babel-plugin-transform-runtime`, `${__dirname}/node_modules/babel-plugin-add-module-exports`]
}