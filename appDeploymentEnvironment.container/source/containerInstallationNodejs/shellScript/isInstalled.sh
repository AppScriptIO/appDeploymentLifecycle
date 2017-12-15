#!/bin/bash
# https://gist.github.com/JamieMason/4761049
# USAGE: if [$(programIsInstalled node) == false ]

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
programIsInstalled() {
  # set to 1 initially
  local return_="true"
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_="false"; }
  # return value
  echo "$return_"
}
