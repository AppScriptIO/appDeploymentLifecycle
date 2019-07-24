#!/usr/bin/env bash
# "Consul" key-value store used for service discovery and configuration synchronization between containers.
# run on both production & local. 
VM=localContinuousDeploymentNode
VM=localProductionNode
eval $(docker-machine env $VM-1)

curl -o docker-compose-proxy.yml https://raw.githubusercontent.com/vfarcic/docker-flow-proxy/master/docker-compose.yml

export DOCKER_IP=$(docker-machine ip $VM-1)

docker-compose -f docker-compose-proxy.yml up -d consul-server

export CONSUL_SERVER_IP=$(docker-machine ip $VM-1)

for i in 2 3; do
    eval $(docker-machine env $VM-$i)

    export DOCKER_IP=$(docker-machine ip $VM-$i)

    docker-compose -f docker-compose-proxy.yml up -d consul-agent
done

rm docker-compose-proxy.yml

