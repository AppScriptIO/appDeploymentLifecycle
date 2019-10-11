#!/usr/bin/env node

// Create configuration symlinks to OS local user.
import filesystem from 'fs'
import path from 'path'
import operatingSystem from 'os'
import assert from 'assert'
import { createSymlink } from '@dependency/deploymentScript/source/utility/filesystemOperation/createSymlink.js'
const userFolder = operatingSystem.homedir()

assert(operatingSystem.platform().toLowerCase().includes('win'),  `• This script must be run in the Windows OS (powershell.exe, bash.exe, cmd.exe, mintty.exe), not WSL.`,)

export const symlinkFileConfig = () => {

  createSymlink([
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/shell/.bashrc'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/shell/.bash_profile'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/Git/.gitconfig'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/terminal/.hyper.js'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/terminal/ConEmu.xml'),
      get destination() {
        return path.join(userFolder, 'AppData/Roaming', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/VSCode/keybindings.json'),
      get destination() {
        return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/VSCode/settings.json'),
      get destination() {
        return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/AutoHotkey/switchDesktopUsingScroll.ahk'),
      get destination() {
        return path.join(userFolder, 'Desktop', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../resource/localOSEnvironment/MicrosoftVisioStencils.vssx'),
      get destination() {
        return path.join(userFolder, 'Documents/My Shapes', path.basename(this.source))
      },
    },
    {
      // TODO: install windows-docker-volume from script
      source: path.resolve(__dirname, '../resource/localOSEnvironment/virtualization/DockerWindowsVolumeWatcher'),
      get destination() {
        return path.join(userFolder, 'Desktop', 'DockerWindowsVolumeWatcher')
      },
    },
  ])
  
}
