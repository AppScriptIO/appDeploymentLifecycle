#!/usr/bin/env bash

echo 'entrypoint command'; 

# install yo & generator (which should be already installed after pushing `deploymentEnvironment` new docker hub release)
npm install -g yo generator-generator; 
chmod -R 775 /root;

# Link generator to global scope, which will be used using `yo` command.
cd /app/generator-szn-webapp; 
npm link;
chmod -R 775 /root;

sleep 100000