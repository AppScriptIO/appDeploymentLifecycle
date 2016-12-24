#!/bin/bash 
printf '%s - Installing Ansible...' "$(source $1/$2/printScriptPath.sh $1 $2 $BASH_SOURCE)"

# exits on error - not exactly recommended to use specifically "set -e" for the way it works. read: 
# http://stackoverflow.com/questions/19622198/what-does-set-e-mean-in-a-bash-script
set -e

# include shell scripts with arguments in case it needs to include sub scripts.
source $1/$2/commonCommands.sh $1 $2

# apt-add-repository depends on software-properties-common.
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y --force-yes ansible
