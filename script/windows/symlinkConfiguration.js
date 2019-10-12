#!/usr/bin/env node

// Create configuration symlinks to OS local user.
import filesystem from 'fs'
import path from 'path'
import operatingSystem from 'os'
import assert from 'assert'
import { createSymlink } from '@dependency/deploymentScript/source/utility/filesystemOperation/createSymlink.js'
const userFolder = operatingSystem.homedir()

assert(
  operatingSystem
    .platform()
    .toLowerCase()
    .includes('win'),
  `• This script must be run in the Windows OS (powershell.exe, bash.exe, cmd.exe, mintty.exe), not WSL.`,
)

export const symlinkFileConfig = () => {
  createSymlink([
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/shell/bash/.bashrc'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/shell/bash/.bash_profile'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/git/.gitconfig'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/terminal/.hyper.js'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/terminal/ConEmu.xml'),
      get destination() {
        return path.join(userFolder, 'AppData/Roaming', path.basename(this.source))
      },
    },
    // vscode settngs are synced with gist using "Settings Sync" extension
    // {
    //   source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/vscode/keybindings.json'),
    //   get destination() {
    //     return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source))
    //   },
    // },
    // {
    //   source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/vscode/settings.json'),
    //   get destination() {
    //     return path.join(userFolder, 'AppData/Roaming/Code - Insiders/User', path.basename(this.source))
    //   },
    // },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/autoHotKey-switchDesktopUsingScroll.ahk'),
      get destination() {
        return path.join(userFolder, 'Desktop', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/MicrosoftVisioStencils.vssx'),
      get destination() {
        return path.join(userFolder, 'Documents/My Shapes', path.basename(this.source))
      },
    },
    // {
    //   // TODO: install windows-docker-volume from script
    //   source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/virtualization/DockerWindowsVolumeWatcher'),
    //   get destination() {
    //     return path.join(userFolder, 'Desktop', 'DockerWindowsVolumeWatcher')
    //   },
    // },
  ])
}
