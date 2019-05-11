if grep -q Microsoft /proc/version; then
  echo "Running in WSL: Name of user must be matching the zsh configuration 'unixuser'"

  if hash git 2>/dev/null; then
    echo '✔ git is installed.'
  else
      sudo apt install git
      echo 'not installed'
  fi

  # sudo apt-get update -y && sudo apt-get upgrade -y

  if hash node 2>/dev/null; then
    echo '✔ node is installed.'
  else
      sudo apt-get install -y curl software-properties-common
      curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
      sudo apt-get install -y nodejs

  fi

  if hash yarn 2>/dev/null; then
    echo '✔ yarn is installed.'
  else
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get install -y yarn
  fi

  if hash zsh 2>/dev/null; then
    echo '✔ zsh is installed.'
  else 
    sudo apt-get install -y zsh
    # oh-my-zsh
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    # plugins
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
    git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
    # powerlevel10k theme
    git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
    # set default shell
    sudo chsh --shell $(which zsh) # make zsh default shell.
    echo "Current shell: $SHELL"
  fi

  dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P) # absolute path to shell file path.
  node $dir/setupWSL.js # copy configuration files to WSL filesystem
  # copy that requires root permission: 
  sudo cp "./initializeDeploymentEnvironment/OSEnvironmentConfigurationFiles/Windows subsystem for Linux/wsl.conf" /etc/wsl.conf

  email=$(git config --system user.email)
  if test -z "$email"; then
    read -p "git email: "  email
    sudo git config --system user.email $email
  fi
  name=$(git config --system user.name)
  if test -z "$name"; then
    read -p "git name: "  name
    sudo git config --system user.name $name
  fi

else
  echo "Not a WSL environment."
  exit 1
fi
