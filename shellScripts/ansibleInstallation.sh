#!/bin/bash
echo "SZN - Installing Ansible..."
echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"
# include shell script
source $(dirname "$0")/commonCommands.sh
# apt-add-repository depends on software-properties-common.
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y --force-yes ansible
