#!/usr/bin/env bash

deployment.build() {
    # 1. Build image
    docker-compose -f ./deployment.dockerCompose.yml build --no-cache deploymentEnvironment
    
    # 2. tag image to docker hub.
    # docker tag deployment-environment myuserindocker/deployment-environment:latest
    docker push myuserindocker/deployment-environment
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
