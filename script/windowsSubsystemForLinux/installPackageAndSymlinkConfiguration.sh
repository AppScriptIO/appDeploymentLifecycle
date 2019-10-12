# WSL environment:
if grep -q Microsoft /proc/version && grep -q Linux /proc/version; then

  if hash node 2>/dev/null; then
    echo '✔ node is installed.'
  else
      sudo apt update && sudo upgrade
      sudo apt-get install -y curl software-properties-common 
      curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
      sudo apt-get install -y nodejs
  fi

  if hash git 2>/dev/null; then
    echo '✔ git is installed.'
  else
    sudo apt install -y git
  fi

else
  echo "Not a WSL environment."
  exit 1
fi