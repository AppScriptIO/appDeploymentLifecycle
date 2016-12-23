#!/bin/bash
printf '%s - Installing commonly used packages...' "$(source $1/$2/printScriptPath.sh $1 $2 $BASH_SOURCE)"

# software-properties-common allows to add repositories using apt-add-repository.
apt-get install -y software-properties-common
