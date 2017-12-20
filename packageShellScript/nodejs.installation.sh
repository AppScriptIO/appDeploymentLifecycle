#!/bin/bash

# Previous execution in dockerfile
# # ARG NODEJS_VERSION=v8.0.0-nightly201702124cafa60c99
# ARG NODEJS_VERSION=v8.5.0
# ENV NODEJS_VERSION ${NODEJS_VERSION}
# # RUN /tmp/shellScript/nodejs.installation.sh; sleep 1;


. $(dirname -- "$0")/isInstalled.sh
. $(dirname -- "$0")/repeatCommandTillSucceed.sh

if [ -z "$1" ]; then 
    if [ $(programIsInstalled node) == "false" ]; then
        # Install Nodejs
        echo 'SZN - Node not installed. Installing NodeJS...';
        cd ~ ;
        repeatCommandTillSucceed "curl -sL https://deb.node..com/setup_7.x | bash - && apt-get install -y nodejs";
        # importatnt ! without problems are caused.
        sleep 5; 
    fi;

    #⭐ Nodejs installation: Already installed from image.
    # installer - https://github.com/tj/n .
    npm install n -g
    # curl -sL https://deb.node..com/setup_7.x | bash -
    # apt-get install -y nodejs
    # Or using n installer:
    # n stable
    # Nodejs Nightly - latest nightly release
    # build releases - https://nodejs.org/download/nightly/
    # IMPORTANT: CHANGE version also in jspm task of dentrist if this version is changed.
    NODE_MIRROR=https://nodejs.org/download/nightly/ n $NODEJS_VERSION
    # Choose nightly as active node version.
    n $NODEJS_VERSION
    node -v
    node -p process.versions # evaluates argument as javascript and prints result.
    # "--harmony" flag should be used to run latest unstable features.
    # node --harmony `which gulp` <task>
    # node --harmony gulpfile.js
elif [ $1 == "uninstall" ]; then
    apt-get purge --auto-remove nodejs npm; 
    npm rm -g n;
    rm -rf /usr/local/n;
    rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
fi;
