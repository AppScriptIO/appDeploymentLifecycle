#!/bin/bash
echo "SZN $(source $1/$2/printScriptPath.sh $1 $2 ${0##*/}) - Installing Ansible..."
# include shell scripts with arguments in case it needs to include sub scripts.
source $1/$2/commonCommands.sh $1 $2

apt-add-repository depends on software-properties-common.
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y --force-yes ansible
