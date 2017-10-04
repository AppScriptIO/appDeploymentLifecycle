require('module').Module._initPaths()
const { spawn } = require('child_process')
const filesystem = require('fs');

if (!filesystem.existsSync(__dirname + '/node_modules')) {
  // Install nodejs packages before  
  let yarnInstall = spawn('yarn', ["install"], { cwd: __dirname, shell: true, stdio:[0,1,2] })
  yarnInstall.on('close', (code) => {
    console.log(`Yarn Install - child process exited with code ${code}`)
    run()
  })
} else {
  run()
}

// Run app
async function run() {
  require('./app.js')
}


