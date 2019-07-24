if grep -q Microsoft /proc/version; then
  if hash node 2>/dev/null; then
    echo '✔ node is installed.'
  else
      sudo apt-get install -y curl software-properties-common
      curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
      sudo apt-get install -y nodejs
  fi
else
  echo "Not a WSL environment."
  exit 1
fi
