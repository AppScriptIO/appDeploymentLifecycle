// execute through `setupWSL.sh` shell file.

const childProcess = require('child_process')
const childProcessOption = { cwd: __dirname, shell: true, stdio: [0, 1, 2] }
const filesystem = require('fs'), path = require('path'), operatingSystem = require('os')
const userFolder = operatingSystem.homedir()
const assert = require('assert')
const readline = require('readline');
const { sync: binaryExist } = require('command-exists')
const isRootPermission = () => process.getuid && process.getuid() === 0 // check if process running with root permissions.
const readInput = (question) => {
  const readlineInstance = readline.createInterface({ input: process.stdin, output: process.stdout })
  readlineInstance.setPrompt(question)
  readlineInstance.prompt()
  return new Promise((resolve, reject) => {
  let response;
  readlineInstance.on('line', (userInput) => {
    response = userInput
    readlineInstance.close()
  })
  readlineInstance.on('close', () => { resolve(response) })
})}
function createSymlink(targetArray){
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
  }}

assert(operatingSystem.platform().toLowerCase().includes('linux'), `• This script must be run in WSL, not Windows OS.`)
console.log(`• Executing on unix user "${operatingSystem.userInfo().username}"`)

if(isRootPermission()) {
  assert(process.argv[2], `• Script must be directly initialized as non root (non-elevated) process.`)
  // NOTE: requires root permission for copying the file through js script.
  createSymlink([
    { 
      source: path.resolve(__dirname, '../resource/localOSEnvironment/WSL/wsl.conf'),
      get destination() { return path.join('/etc/', path.basename(this.source)) }
    }, 
  ])
} else {
  
/*
   ___           _        _ _   ____            _                         
  |_ _|_ __  ___| |_ __ _| | | |  _ \ __ _  ___| | ____ _  __ _  ___  ___ 
   | || '_ \/ __| __/ _` | | | | |_) / _` |/ __| |/ / _` |/ _` |/ _ \/ __|
   | || | | \__ \ || (_| | | | |  __/ (_| | (__|   < (_| | (_| |  __/\__ \
  |___|_| |_|___/\__\__,_|_|_| |_|   \__,_|\___|_|\_\__,_|\__, |\___||___/
                                                          |___/           
*/
if(binaryExist('git')) console.log( '✔ git is installed.')
else childProcess.execSync('sudo apt install git', childProcessOption)

if(binaryExist('docker')) console.log( '✔ docker is installed.')
else childProcess.execSync(`
  sudo apt-get update -y && sudo apt-get upgrade -y \\
  sudo apt-get install -y \\
  apt-transport-https \\
  ca-certificates \\
  curl \\
  gnupg2 \\
  software-properties-common && \\
  curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add - && \\
  sudo add-apt-repository \\
  "deb [arch=amd64] https://download.docker.com/linux/debian \\
  $(lsb_release -cs) \\
  stable nightly" && \\
  sudo apt-get update -y && \\
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io && \\
  export DOCKER_HOST=tcp://127.0.0.1:2375
`, childProcessOption)

if(binaryExist('yarn')) console.log( '✔ yarn is installed.')
else childProcess.execSync(`
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \\
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \\
  sudo apt-get -y update && sudo apt-get install -y yarn
`, childProcessOption)

if(binaryExist('zsh')) console.log( '✔ zsh is installed.')
else {
  childProcess.execSync(`sudo apt-get install -y zsh`, childProcessOption)
  // oh-my-zsh
  childProcess.execSync(`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`, childProcessOption)
  // plugins
  childProcess.execSync(`git clone https://github.com/zsh-users/zsh-autosuggestions \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`, childProcessOption)
  childProcess.execSync(`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`, childProcessOption)
  childProcess.execSync(`git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions`, childProcessOption)
  childProcess.execSync(`git clone https://github.com/zsh-users/zsh-history-substring-search \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search`, childProcessOption)
  // powerlevel10k theme
  childProcess.execSync(`git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k`, childProcessOption)
  // set default shell - make zsh default shell.
  childProcess.execSync(`sudo chsh --shell $(which zsh)`, childProcessOption) 
  childProcess.execSync(`echo "Current shell: $SHELL"`, childProcessOption) 
}

// set git profile information:
let email = childProcess.execSync('git config --system user.email', { silent: true, encoding: 'utf8' })
if(!email) readInput().then(email => childProcess.execSync(`sudo git config --system user.email ${email}`, { silent: true, encoding: 'utf8' }))
let name = childProcess.execSync('git config --system user.name', { silent: true, encoding: 'utf8' })
if(!name) readInput().then(name => childProcess.execSync(`sudo git config --system user.name ${name}`, { silent: true, encoding: 'utf8' }))

/*
    ____             __ _                       _   _               _____ _ _           
   / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_(_) ___  _ __   |  ___(_) | ___  ___ 
  | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \  | |_  | | |/ _ \/ __|
  | |__| (_) | | | |  _| | (_| | |_| | | | (_| | |_| | (_) | | | | |  _| | | |  __/\__ \
   \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_| |_|   |_|_|\___||___/
                          |___/                                                         
  copy configuration files to WSL filesystem
*/
createSymlink([
  {
    source: path.resolve(__dirname, '../resource/localOSEnvironment/WSL/.gitconfig'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../resource/localOSEnvironment/WSL/shell/bash/.bashrc'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../resource/localOSEnvironment/WSL/shell/zsh/.zshrc'),
    get destination() { return path.join(userFolder, path.basename(this.source)) }
  }, 
  {
    source: path.resolve(__dirname, '../resource/localOSEnvironment/WSL/shell/zsh/powerlevel9k.zsh-theme'),
    get destination() { return path.join(userFolder, '.oh-my-zsh/custom/themes/powerlevel10k/', path.basename(this.source)) }
  }, 
])

  // re-run script with eleveated permissions (root) to allow the sections requiring permissions to be executed separately as well (non eleveated code section relies on the non-root username to run successfully.). 
  console.log('• Elevating permissions for running sections requiring root...')
  childProcess.spawnSync(`sudo`, [`node ${__filename}`, true /** indicates that this is a child process */], childProcessOption)
}