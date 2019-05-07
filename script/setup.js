// Create configuration symlinks to OS local user.
const filesystem = require('fs'), path = require('path'), operatingSystem = require('os')
const userFolder = operatingSystem.homedir()

const symlinkTarget = [
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/.bashrc'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/.bash_profile'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/.gitconfig'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/.hyper.js'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/ConEmu.xml'),
        get destination() { return path.join(userFolder, 'AppData/Roaming', path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Visual studio code settings/keybindings.json'),
        get destination() { return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Visual studio code settings/settings.json'),
        get destination() { return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source)) }
    }, 
    
]

for (const target of symlinkTarget) {
    try {
        let destinationStat = filesystem.existsSync(target.destination) && filesystem.lstatSync(target.destination)
        if(destinationStat && destinationStat.isSymbolicLink()) filesystem.unlinkSync(target.destination) // delete existing symlink
        filesystem.symlinkSync(target.source, target.destination) // create symlink
        console.log(`• Symlink ✔  ${target.source} --> ${target.destination}`)
    } catch(error) {
        console.log(`• Symlink ❌  ${target.source} --> ${target.destination}`)
        console.log(error)
    }
}



