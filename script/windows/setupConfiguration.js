#!/usr/bin/env node

// Create configuration symlinks to OS local user.
import filesystem from 'fs'
import path from 'path'
const childProcess = require('child_process')
import operatingSystem from 'os'
import assert from 'assert'
import * as provision from '@deployment/deploymentProvisioning'
const userFolder = operatingSystem.homedir(),
  publicUserFolder = path.join(userFolder, '../Public')

assert(
  operatingSystem
    .platform()
    .toLowerCase()
    .includes('win'),
  `• This script must be run in the Windows OS (powershell.exe, bash.exe, cmd.exe, mintty.exe), not WSL.`,
)

export const installPackage = () => {
  // ESlint is used insread of jshint. // provision.jshint.install() // Installed globally for usage with VSCode extension
}

export const setupGitConfig = async () => {
  // set git profile information:
  let email, name
  try {
    email = childProcess.execSync('git config --system user.email', { silent: true, encoding: 'utf8' })
  } catch (error) {
    /* ignore - usually throws if no username is set or config file exist */
  }
  try {
    name = childProcess.execSync('git config --system user.name', { silent: true, encoding: 'utf8' })
  } catch (error) {
    /* ignore - usually throws if no username is set or config file exist */
  }
  if (!email) await provision.shellInput.readInput('• Provide git email address:  ').then(email => childProcess.execSync(`git config --system user.email ${email}`, { silent: true, encoding: 'utf8' }))
  if (!name) await provision.shellInput.readInput('• Provide git name:  ').then(name => childProcess.execSync(`git config --system user.name ${name}`, { silent: true, encoding: 'utf8' }))
}

export const symlinkFileConfig = () => {
  provision.symlink.createSymlink([
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
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/autoHotKey-switchDesktopUsingScroll.ahk'),
      get destination() {
        // symlink to `%appdata%\Microsoft\Windows\Start Menu\Programs\Startup`
        return path.join(userFolder, 'AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup', path.basename(this.source))
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

  provision.copy.copyFile([
    {
      // vscode settings.json `custom CSS & JS` extension doesn't seem to recognized symlink files.
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsOS/vscode/vscodeCustomStyle.css'),
      get destination() {
        return path.join(publicUserFolder, path.basename(this.source))
      },
    },
  ])
}
