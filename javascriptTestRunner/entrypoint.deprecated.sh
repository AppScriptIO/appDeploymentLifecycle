#!/usr/bin/env bash
set -ex; 

# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

test() { # ⭐ Gulp - run bulid tasks
    set -ex; 
    node --harmony $currentFileDirectory/entrypoint.js
}

test.debug() { # ⭐ Gulp - run bulid tasks
    set -ex; 
    node --harmony --inspect=0.0.0.0:9229 --debug-brk $currentFileDirectory/entrypoint.js
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
    
    echo -n "Enter command: "
    read command
    echo "• Executing: $command. Passing arguments ${@:2}"
    $command
else
    # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
    $@
fi

