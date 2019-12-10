const childProcess = require('child_process')
import path from 'path'
import filesystem from 'fs'
import operatingSystem from 'os'
import assert from 'assert'
import * as provision from '@dependency/deploymentProvisioning'
import { getRootDirectory } from '../utility/getRootUserFolder.js'
const childProcessOption = { cwd: __dirname, shell: true, stdio: [0, 1, 2] }

assert(
  operatingSystem
    .platform()
    .toLowerCase()
    .includes('linux'),
  `• This script must be run in WSL (wsl.exe), not Windows OS.`,
)
console.log(`• Executing on unix user "${operatingSystem.userInfo().username}"`)

export const nonElevatedCallback = async () => {
  assert(!provision.permission.isElevatedPermissionCheck(), `• Must run as non-root, in which it will be eleveated in a separate process.`)
  /*
    ___           _        _ _   ____            _                         
   |_ _|_ __  ___| |_ __ _| | | |  _ \ __ _  ___| | ____ _  __ _  ___  ___ 
    | || '_ \/ __| __/ _` | | | | |_) / _` |/ __| |/ / _` |/ _` |/ _ \/ __|
    | || | | \__ \ || (_| | | | |  __/ (_| | (__|   < (_| | (_| |  __/\__ \
    |_|_| |_|___/\__\__,_|_|_| |_|   \__,_|\___|_|\_\__,_|\__, |\___||___/
                                                          |___/           
  */
  provision.updateLinux.updateAndUpgrade()
  provision.docker.install()
  provision.git.install()
  provision.zshShell.install()
  provision.yarn.install()
  provision.jspm.install()
  provision.nodeVersionManagement.install()
  // Installing globally didn't fix the issue // // TODO: Install `nodegit` 0.25.* as global dependency, because sometimes after yarn upgrade the nodegit module is for some reason cannot be found.

  /*
      ____             __ _                       _   _               _____ _ _           
    / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_(_) ___  _ __   |  ___(_) | ___  ___ 
    | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \  | |_  | | |/ _ \/ __|
    | |__| (_) | | | |  _| | (_| | |_| | | | (_| | |_| | (_) | | | | |  _| | | |  __/\__ \
    \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_| |_|   |_|_|\___||___/
                            |___/                                                         
    copy configuration files to WSL filesystem
  */
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
  if (!email)
    await provision.shellInput.readInput('• Provide git email address:  ').then(email => childProcess.execSync(`sudo git config --system user.email ${email}`, { silent: true, encoding: 'utf8' }))
  if (!name) await provision.shellInput.readInput('• Provide git name:  ').then(name => childProcess.execSync(`sudo git config --system user.name ${name}`, { silent: true, encoding: 'utf8' }))

  // Note: permission error may be caused by non existant destination paths.
  const userFolder = operatingSystem.homedir()
  provision.copy.copyFile([
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/.gitconfig'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/shell/bash/.bashrc'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/shell/zsh/.zshrc'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
    {
      // controls exact theme and sections - NOTE: seems not to work as expected with the .p10k.zsh file.
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/shell/zsh/powerlevel9k.zsh-theme'),
      get destination() {
        return path.join(userFolder, '.oh-my-zsh/custom/themes/powerlevel10k/', path.basename(this.source))
      },
    },
    {
      // controls configuration of p10k general rules.
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/shell/zsh/.p10k.zsh'),
      get destination() {
        return path.join(userFolder, path.basename(this.source))
      },
    },
  ])

  runElevatedSection()
}

export const elevatedCallback = () => {
  // 2nd argument passed to indicate trigger by child process.
  assert(process.argv[2], `• Script must be directly initialized as non root (non-elevated) process.`)
  assert(provision.permission.isElevatedPermissionCheck(), `• Must run with root permissions.`)

  /*
      ____             __ _                       _   _               _____ _ _           
    / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_(_) ___  _ __   |  ___(_) | ___  ___ 
    | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \  | |_  | | |/ _ \/ __|
    | |__| (_) | | | |  _| | (_| | |_| | | | (_| | |_| | (_) | | | | |  _| | | |  __/\__ \
    \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_| |_|   |_|_|\___||___/
                            |___/                                                         
    copy files that require root permission.
  */
  const userFolder = operatingSystem.homedir()
  provision.copy.copyFile([
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/wsl.conf'),
      get destination() {
        return path.join('/etc/', path.basename(this.source))
      },
    },
    {
      source: path.resolve(__dirname, '../../resource/localDevelopmentEnvironment/WindowsSubSystemForLinux/shell/bash/.bashrc'),
      get destination() {
        // root userfolder
        return path.join(getRootDirectory(), path.basename(this.source))
      },
    },
  ])

  /*
     ____       _   _   _                                       _ _  __ _           _   _                 
    / ___|  ___| |_| |_(_)_ __   __ _ ___   _ __ ___   ___   __| (_)/ _(_) ___ __ _| |_(_) ___  _ __  ___ 
    \___ \ / _ \ __| __| | '_ \ / _` / __| | '_ ` _ \ / _ \ / _` | | |_| |/ __/ _` | __| |/ _ \| '_ \/ __|
     ___) |  __/ |_| |_| | | | | (_| \__ \ | | | | | | (_) | (_| | |  _| | (_| (_| | |_| | (_) | | | \__ \
    |____/ \___|\__|\__|_|_| |_|\__, |___/ |_| |_| |_|\___/ \__,_|_|_| |_|\___\__,_|\__|_|\___/|_| |_|___/
                                |___/                                                                     
  */

  childProcess.execSync('sudo chsh root --shell /bin/bash', childProcessOption)
}

function runElevatedSection() {
  // re-run script with eleveated permissions (root) to allow the sections requiring permissions to be executed separately as well (non eleveated code section relies on the non-root username to run successfully.).
  // Allows to run an elevated section of code in the same file, through spinning a new process that has elevated permission and conditionally choosing the section to run.
  console.log('• Elevating permissions for running sections requiring root...')
  console.log('- runElevatedSection')
  let targetScriptPath = process.argv[1] || __filename // target script in this case is the this current file.
  childProcess.spawnSync(
    // Note: if error occures with yarn - it probably is a global path issue with yarn installation. (the usage of spawn with sudo works with no issue whatsoever)
    'sudo',
    ['yarn', `run scriptManager shouldCompileScript=true`, targetScriptPath, '".elevatedCallback()"', '-', true /** indicates that this is a child process */],
    { cwd: path.normalize(path.join(__dirname, '..')), shell: true, stdio: [0, 1, 2] },
  )
}
