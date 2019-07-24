// execute through `setupWSL.sh` shell file.

const filesystem = require('fs'), path = require('path'), operatingSystem = require('os')
const userFolder = operatingSystem.homedir()
const assert = require('assert')

assert(operatingSystem.platform().toLowerCase().includes('linux'), `• This script must be run in WSL, not Windows OS.`)

const targetArray = [
  {
    source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/.gitconfig'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/.bashrc'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/.zshrc'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/powerlevel9k.zsh-theme'),
    get destination() { return path.join(userFolder, '.oh-my-zsh/custom/themes/powerlevel10k/', path.basename(this.source)) }
  }, 
  // { //! Couldn't seem to get root permission for copying the file through js script.
  //   source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/wsl.conf'),
  //   get destination() { return path.join('/etc/', path.basename(this.source)) }
  // }, 
]

for (const target of targetArray) {
  // keep original file
  if(filesystem.existsSync(target.destination)) {
    let originalPath = `${target.destination}.original`
    if(!filesystem.existsSync(originalPath))
      filesystem.renameSync(target.destination, originalPath)
  }

  try {
    filesystem.copyFileSync(target.source, target.destination)
    console.log(`• Copied ✔  ${target.source} --> ${target.destination}`)
  } catch(error) {
    throw error
  }
}