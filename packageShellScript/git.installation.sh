#!/bin/bash

# `|| true` to ignore error (because git installation gets debian connection error - apparently servers are temporarly down)
. $(dirname -- "$0")/repeatCommandTillSucceed.sh

if [ -z "$1" ]; then 
    #⭐ Git - install git:
    # apt-get update --fix-missing;
    repeatCommandTillSucceed "apt-get update; apt-get install git-core -y;";
    # apt-get install git-all -y;
elif [ $1 == "uninstall" ]; then
    apt-get remove git-all -y
fi;
