#!/bin/bash
# USAGE: repeatCommandTillSucceed "<command>"

function repeatCommandTillSucceed {
    while true; do 
        eval "$1";
        if [ $? -eq 0 ]; then
            break
        fi
        # c = maximum number of tries.
        ((c++)) && ((c==5)) && break
        sleep 1;
    done
}
