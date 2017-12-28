#!/usr/bin/env bash

util() {
    docker service create --name util --network go-demo --mode global alpine sleep 1000000000
    docker run --name alpine -d alpine sleep 1000000000
}

# IMPORTANT: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
$@
