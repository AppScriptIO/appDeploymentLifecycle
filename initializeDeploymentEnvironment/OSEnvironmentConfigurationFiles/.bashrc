# This configuration file is for GitBash, fixing common issues and settings defaults. This file should be symlinked to user's folder.
export MSYS_NO_PATH=1
# export MSYS_NO_PATHCONV=1 // fixes issue with docker, but sets the setting for all other commands
# cd ~/Projects
alias gcloud="gcloud.cmd"
export COMPOSE_CONVERT_WINDOWS_PATHS=1 # fix issue with windows error when mounting docker socket (/var/run/docker.sock:/var/run/docker.sock)  - https://github.com/docker/for-win/issues/1829

# FIx issues with docker but prevent MSYS_NO_PATHCONV from affecting other script - https://github.com/docker/toolbox/issues/456
docker () {
  MSYS_NO_PATHCONV=1 docker.exe "$@"
}
export -f docker

# Add Nodejs Flags/Environmebt variables for host machine Nodejs scripts - (This could be changed to a js script with module for controlling Windows OS)
# • NODE_PRESERVE_SYMLINKS should be turned on for host machine scripts, as symlinks are used for node_modules for quicker development.
export NODE_PRESERVE_SYMLINKS=1

# For LCOW (Windows containers mode) - Set default platform for Docker (Windows containers mode), to allow LCOW (Linux Containers On Windows) to run without the `--platform=linux` flag for `docker` command. https://medium.com/@joni2nja/lcow-docker-compose-vs-2017-net-core-2-1-178946b36acb
# LCOW requires to turn docker experimental features on. 
# export DOCKER_DEFAULT_PLATFORM=linux
# OPTIONS 2 - To change the default platform to Linux:
# export LCOW_API_PLATFORM_IF_OMITTED=linux
