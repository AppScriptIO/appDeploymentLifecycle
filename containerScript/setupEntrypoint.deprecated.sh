#!/usr/bin/env bash
## Entrypoints & commands portal/interface

# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

projectPath="/project"
dependencyPath="$projectPath/dependency"
applicationPath="$projectPath/application"

# • Run in live reload: ./setup/build/entrypoint.sh
# • Run containers & build source code: ./setup/etnrypoint.sh
# • Run in different modes: ./source/serverSide/entrypoint.sh

run() {
    ../source/serverSide/entrypoint.sh $@
}
run.livereload() {
    ./livereload/entrypoint.sh $@
}
run.test() {
    ./testRunner/entrypoint.sh $@
}
run.build() {
    ./build/entrypoint.sh $@
}
container() {
    ./container/entrypoint.sh $@
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
