#!/usr/bin/env bash
# ./setup/run.sh <functionName>

deployment() { # Run container that will handle generator manipulations.
    
    docker-compose -f ./setup/container/deployment.dockerCompose.yml up -d
    
    docker-machine ssh machine 
    docker exec -it <container> bash
    cd /tmp/volume/
    yo
}

createGenerator() {
    # 1. ./setup/run.sh

    # 2. (inside conctainer) 
    mkdir <name> && cd $_
    yo generator   
    # make it global so can be used using `yo` command.
    cd generator-<name>; npm link
    yo 

}