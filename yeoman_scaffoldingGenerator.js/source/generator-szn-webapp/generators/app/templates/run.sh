#!/usr/bin/env bash

production() {

}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sj <functionName>".
$@
