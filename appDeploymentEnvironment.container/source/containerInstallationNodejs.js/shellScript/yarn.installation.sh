#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ Install Yarn:
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    apt-get update && apt-get install yarn
elif [ $1 == "uninstall" ]; then
    apt-get remove yarn && apt-get purge yarn
fi;

# Print Horizontal Line
source $(dirname -- "$0")/printHorizontalLine.sh