#!/usr/bin/env bash
##
 # USAGE: 
 # ./entrypoint.sh [build|run] instructionConfigurationFilePath=./instructionConfiguration.js instructionOption=[install|build|...]
##

# : ${DEPLOYMENT:=containerManagement}; export DEPLOYMENT # set variable only if if is unset or empty string.

dockerComposeFilePath="../setup/container/containerDeployment.dockerCompose.yml"

### DOESN'T WORK ANYMORE - as the dockerfile used to build the image, relies on a specific directory structure, which in the "containerManagement" is reorganized.
### Now builds are made only through nodejs app, not directly through docker-compose build.
# # Initial build - used for building the container through calling docker-compose tool directly, rather than interacting with the docker nodejs management tool (docker API). As the manager nodejs container relies on this docker image to run.
# # USAGE: ./entrypoint.sh build instructionConfigurationFilePath=./instructionConfiguration.js instructionOption=install
# build() {
#     # --no-cache can be used.
#     DEPLOYMENT=imageBuild; export DEPLOYMENT;    
#     docker-compose -f $dockerComposeFilePath build --no-cache dockerfile
# }

# For managing the the development, build, & testing of this project.
# USAGE: ./entrypoint.sh run instructionConfigurationFilePath=./instructionConfiguration.js instructionOption=build
# USAGE: ./entrypoint.sh run instructionConfigurationFilePath=./instructionConfiguration.js instructionOption=run
run() {
    # docker-compose -f $dockerComposeFilePath pull containerDeploymentManagement
    DEPLOYMENT=containerManagement; export DEPLOYMENT;
    
    # Check if docker image exists
    dockerImage=myuserindocker/deployment-environment:latest;
    if [[ "$(docker images -q $dockerImage 2> /dev/null)" == "" ]]; then 
        dockerImage=node:latest
    fi
    echo "• dockerImage=$dockerImage"
    export dockerImage

    docker-compose -f $dockerComposeFilePath up --force-recreate --no-build containerDeploymentManagement;
}

if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default
    echo 'Shell Script • No arguments passed.'
    run
else

    # Export arguments  
    for ARGUMENT in "${@:2}"; do # iterate over arguments, skipping the first.
        KEY=$(echo $ARGUMENT | cut -f1 -d=); VALUE=$(echo $ARGUMENT | cut -f2 -d=);
        case "$KEY" in
                instructionConfigurationFilePath)     instructionConfigurationFilePath=${VALUE}; export instructionConfigurationFilePath ;;
                instructionOption)         instructionOption=${VALUE}; export instructionOption ;;
                *)
        esac
    done

    if [[ $1 != *"="* ]]; then # if first argument is a command, rather than a key-value pair.
        echo 'Shell Script • Command as argument passed.'
        # run first argument as function.
        $@ # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
    else
        echo 'Shell Script • Key-Value arguments passed.'
        run
    fi

fi




