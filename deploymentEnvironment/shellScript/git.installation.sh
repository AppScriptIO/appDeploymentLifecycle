#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ Git - install git:
    apt-get update --fix-missing;
    while true; do 
        apt-get update;
        apt-get install git-core -y;
        if [ $? -eq 0 ]; then
            break
        fi
        ((c++)) && ((c==10)) && break
        sleep 1;
    done

    # apt-get install git-all -y;
elif [ $1 == "uninstall" ]; then
    apt-get remove git-all -y
fi;

