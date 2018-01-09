#!/usr/bin/env bash
## Entrypoints & commands portal/interface

# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

projectPath="/project"
dependencyPath="$projectPath/dependency"
applicationPath="$projectPath/application"

container.production.stack() { # ⭐
    # 1.
    docker-machine ssh $VM-1
    VolumeBasePath=/mnt/datadisk-1/taleb
    sudo mkdir -p $VolumeBasePath/rethinkdbData
    
    # 2. Add raw Github reverse proxy file to Redbird proxy.

    # 3.
    docker stack deploy -c ./setup/container/production.dockerStack.yml talebwebapp
}

container.development() { # ⭐
    # DOESN'T WORK
    # fix issue caused by virtualbox & Windows apparently that don't support sync directory - https://forums.docker.com/t/issues-with-rethinkdb-example-using-volumes/13720/4
    # Download exe and run exe - https://www.rethinkdb.com/docs/install/windows/
    # grab the files created in new directory to the volume that will be mounted to the container.

    # 1. Hosts local development environment
    # http://serverfault.com/questions/115282/can-i-configure-the-windows-hosts-file-to-use-ip-address-plus-port
    # map 'cdn.localhost' & 'api.localhost' to localhost:8081 & localhost:8082 respectively
    # Using Fiddler (because hosts file doesn't support mapping to ports.) in Tool -> HOSTS:
    # localhost:8081      cdn.localhost
    # localhost:8082      api.localhost

    # 2. connect to VM
    VM=machine
    eval $(docker-machine env $VM)

    # 3. 
    export DEPLOYMENT=development # development also for distribution. as the environment run is development and doesn't have global variables like HOST which is used for production server.
    docker-compose \
        -f ./setup/container/development.dockerCompose.yml \
        --project-name talebwebapp \
        up -d --force-recreate

    # 4. Run services using gulp inside container
    VM=machine
    docker-machine ssh $VM
    dockerContainerID=""
    docker exec -it $dockerContainerID bash
    (cd $applicationPath/setup/build/; ./entrypoint.sh development)
}

container.deployment.buildDistribution() { # ⭐
    # development / production
    export DEPLOYMENT=production
    docker-compose \
        -f ./setup/container/deployment.dockerCompose.yml \
        --project-name talebwebapp_distribution \
        up buildDistributionCode
}

container.deployment.buildImage() { # ⭐
    # 1. development / production
    export DEPLOYMENT=production
    # export DEPLOYMENT=development
    # export COMPOSE_PROJECT_NAME= # Not needed as name is taken from image field.

    # 2. Build Source Code:
    ./setup/entrypoint.sh container.deployment.buildDistribution

    # 3.
    # Problem cannot pass arguments to dockerfile
    docker-compose \
        -f ./setup/container/deployment.dockerCompose.yml \
        --project-name talebwebapp_build \
        build --no-cache buildImage

    # 4. tag image and 
    docker tag <image>:latest <image>:1.0.0
    docker-machine ssh machine
    docker login
    docker push <image>:1.0.0
}

if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default
    # List function names:
    # compgen -A function 
    # typeset -f | awk '/ \(\) $/ && !/^main / {print $1}'
    function script.functions () { # https://stackoverflow.com/questions/2630812/get-a-list-of-function-names-in-a-shell-script
        local fncs=`declare -F -p | cut -d " " -f 3`; # Get function list
        echo $fncs; # not quoted here to create shell "argument list" of funcs.
    }
    declare functionList=($(script.functions));
    # declare -rx functionList=($(script.functions));
    printf "• %s " "${functionList[@]}"; echo "\n"
    
    # input command
    echo -n "Enter command: "
    read command
    echo "• Executing: $command. Passing arguments ${@:2}"
    $command
else
    # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
    $@ ${@:2} # execute first command as function and pass it 2nd and all following arguments.
fi
