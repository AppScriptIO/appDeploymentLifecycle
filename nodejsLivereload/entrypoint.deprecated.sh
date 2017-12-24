#!/usr/bin/env bash
set -ex; 
 
# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

watch() { # ⌚ Gulp watch
    set -ex; 
    node --harmony $currentFileDirectory/entrypoint.js watch:source
}

# watch.livereload() {
#     set -ex; 
#     # out put what gulp livereload state 
#     # export DEBUG=*;
#     # --inspect --debug-brk allows for debugging node with chrome.
#     node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
# }

watch.livereload() {
    set -ex; 
    # out put what gulp livereload state 
    # export DEBUG=*;
    # --inspect --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=false
    node $currentFileDirectory/entrypoint.js watch:livereload
}

watch.livereload.chrome() {
    set -ex;
    # out put what gulp livereload state 
    # export DEBUG=*;
    #  --inspect=localhost:9229 --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=true
    node $currentFileDirectory/entrypoint.js watch:livereload
}

watch.livereload.chrome.noBreak() {
    set -ex;
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=false
    # node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
    node $currentFileDirectory/entrypoint.js watch:livereload
}

development() {
    export DEPLOYMENT=development
    (cd /project/application/setup/livereload/; $currentFileDirectory/entrypoint.sh watch.livereload.chrome)
}

distribution() {
    # TODO: Add option for watch base directory
    export DEPLOYMENT=development
    export SZN_OPTION_ENTRYPOINT_NAME="entrypoint.js"
    export SZN_OPTION_ENTRYPOINT_PATH="/project/application/distribution/serverSide/"
    (cd /project/application/setup/livereload/; $currentFileDirectory/entrypoint.sh watch.livereload.chrome)
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
