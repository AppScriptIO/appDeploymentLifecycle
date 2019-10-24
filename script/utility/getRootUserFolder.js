const childProcess = require('child_process')

export function getRootDirectory() {
  return childProcess
    .execSync(`echo ~root`, { cwd: __dirname, encoding: 'utf8' } /** to allow catching returned result */)
    .replace(/\n$/, '')
    .trim() // remove new line and white space to prevent comparison issues
}
