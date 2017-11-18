#!/usr/bin/env bash

# run on local host machine.
cp -p ./.bashrc ~/

# setup VM name
if [[ -v VM ]]; then echo $VM; else VM=machine; fi

# create machine
docker-machine create -d virtualbox --virtualbox-memory=4096 --virtualbox-cpu-count=2 --virtualbox-disk-size=50000 $VM

# connect to docker engine
docker-machine regenerate-certs --force $VM
eval $(docker-machine env $VM)

# Open ports
    if [[ -v VM ]]; then echo $VM; else VM=machine; fi

    forwardPort() {
    port=$1
    echo "Forwarding port \"${port}\" in VM - \"${VM}\"."
    VBoxManage modifyvm "$VM" --natpf1 ",tcp,,${port},,${port}"
    }

    docker-machine create -d virtualbox $VM
    docker-machine stop $VM

    forwardPort 443

    # Node NIM - inspector manager - allows for chrome debuding of node.
    forwardPort 9229

    for i in {80..90}
    do 
    forwardPort $i
    done

    for i in {8080..8090}
    do 
    forwardPort $i
    done

    # BrowserSync ports
    forwardPort 9901
    forwardPort 9902
    forwardPort 9903

    docker-machine start $VM
    VBoxManage showvminfo "${VM}"
    eval $(docker-machine env $VM)

# setup project directory
cd ~/Projects/talebWebapp/

# run container
export DEPLOYMENT=development
docker-compose -f ./setup/container/development.dockerCompose.yml up -d --force-recreate
