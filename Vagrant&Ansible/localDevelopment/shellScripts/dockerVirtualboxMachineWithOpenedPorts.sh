#!/bin/bash 
# Usage 
# $1 = docker machine name is first argument passed.
if [ -z $1 ]; then VM=machine; else VM=$1; fi

docker-machine create -d virtualbox $VM
docker-machine stop $VM
VBoxManage modifyvm "$VM" --natpf1 ",tcp,,80,,80"
VBoxManage modifyvm "$VM" --natpf1 ",tcp,,81,,81"
VBoxManage modifyvm "$VM" --natpf1 ",tcp,,82,,82"
VBoxManage modifyvm "$VM" --natpf1 ",tcp,,443,,443"
docker-machine start $VM
eval $(docker-machine env $VM)