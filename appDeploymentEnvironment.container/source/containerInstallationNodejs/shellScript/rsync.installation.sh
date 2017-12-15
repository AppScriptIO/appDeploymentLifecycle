#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ rsync global installation - required by gulp-rsync
    apt-get install rsync -y
elif [ $1 == "uninstall" ]; then
    apt-get remove rsync -y
fi;
