#!/bin/bash
echo "SZN $(source $1/$2/printScriptPath.sh $1 $2 $BASH_SOURCE) - Installing commonly used packages."

# software-properties-common allows to add repositories using apt-add-repository.
apt-get install -y software-properties-common
