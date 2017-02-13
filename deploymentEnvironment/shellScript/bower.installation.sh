#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ Install Bower:
    npm install bower -g
elif [ $1 == "uninstall" ]; then
    npm uninstall bower -g
fi;

