#!/usr/bin/env node

// Create configuration symlinks to OS local user.
const filesystem = require('fs'), path = require('path'), operatingSystem = require('os')
const userFolder = operatingSystem.homedir()
const assert = require('assert')

assert(operatingSystem.platform().toLowerCase().includes('win'), `• This script must be run in the Windows OS, not WSL.`)

const symlinkTarget = [
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/shell/.bashrc'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/shell/.bash_profile'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/Git/.gitconfig'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/terminal/.hyper.js'),
        get destination() { return path.join(userFolder, path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/terminal/ConEmu.xml'),
        get destination() { return path.join(userFolder, 'AppData/Roaming', path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/VSCode/keybindings.json'),
        get destination() { return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source)) }
    }, 
    {
        source: path.resolve(__dirname, '../resource/localOSEnvironment/VSCode/settings.json'),
        get destination() { return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source)) }
    }, 
    { // TODO: install windows-docker-volume from script
        source: path.resolve(__dirname, '../resource/localOSEnvironment/DockerWindowsVolumeWatcher'),
        get destination() { return path.join(userFolder, 'Desktop', 'DockerWindowsVolumeWatcher') }
    }, 
    { 
        source: path.resolve(__dirname, '../resource/localOSEnvironment/AutoHotkey/switchDesktopUsingScroll.ahk'),
        get destination() { return path.join(userFolder, 'Desktop', path.basename(this.source)) }
    }, 
    { 
        source: path.resolve(__dirname, '../resource/localOSEnvironment/MicrosoftVisioStencils.vssx'),
        get destination() { return path.join(userFolder, 'Documents/My Shapes', path.basename(this.source)) }
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



