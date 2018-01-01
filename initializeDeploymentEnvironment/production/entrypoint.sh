#!/usr/bin/env bash

OSUsername=$(whoami)
keyPath="/c/Users/$OSUsername/.ssh"
currentRelativeFilePath=$(dirname "$0")
# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
# hostPath - will be used when calling docker-compose from inside 'manager' container to point to the host VM path rather than trying to mount from manager container. as mounting volumes from other container causes issues.
applicationHostPath="`pwd`/$currentRelativeFilePath"
echo host path: $applicationHostPath

docker run \
    --volume $applicationHostPath:/project/application \
    --volume $keyPath:/project/key \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --env "hostPath=$applicationHostPath" \
    --env "sshUsername=$OSUsername" \
    --env "entrypointConfigurationPath=/project/application/entrypoint/configuration.js" \
    --env "entrypointOption=createNodeCluster" \
    myuserindocker/deployment-environment:latest \
    containerCommand "$@"