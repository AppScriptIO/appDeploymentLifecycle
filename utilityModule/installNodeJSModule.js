const { execSync, spawn, spawnSync } = require('child_process')

function installModule({ currentDirectory }) { // Install nodejs packages before  
    console.log(`\x1b[2m%s\x1b[0m'`, `• yarn install for folder: ${currentDirectory}`)
    spawnSync('yarn', ["install --pure-lockfile --production=false"], { cwd: currentDirectory, shell: true, stdio:[0,1,2] }) 
}

module.exports = {
    installModule
}