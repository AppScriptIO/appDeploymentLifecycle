#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ JSPM
    # install JSPM using npm: works only with beta version 0.17.0-beta.25 https://github.com/jspm/jspm-cli/releases/tag/0.17.0-beta.4
    # npm install -g jspm@beta
    # npm install -g jspm@0.17.0-beta.35
    npm install jspm@beta -g
    # Bower Endpoint to allow installation from Bower sources - for beta version there is no need for bower endpoint
    npm install jspm-bower-endpoint -g
    jspm registry create bower jspm-bower-endpoint
elif [ $1 == "uninstall" ]; then
    npm uninstall jspm@beta -g
    npm uninstall jspm-bower-endpoint -g
fi;

# Print Horizontal Line
source $(dirname -- "$0")/printHorizontalLine.sh