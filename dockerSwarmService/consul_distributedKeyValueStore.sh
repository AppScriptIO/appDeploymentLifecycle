#!/usr/bin/env bash
# "Consul" key-value store used for service discovery and configuration synchronization between containers.

curl -o docker-compose-proxy.yml https://raw.githubusercontent.com/vfarcic/docker-flow-proxy/master/docker-compose.yml

export DOCKER_IP=$(docker-machine ip swarm-1)

docker-compose -f docker-compose-proxy.yml up -d consul-server

export CONSUL_SERVER_IP=$(docker-machine ip swarm-1)

for i in 2 3; do
    eval $(docker-machine env swarm-$i)

    export DOCKER_IP=$(docker-machine ip swarm-$i)

    docker-compose -f docker-compose-proxy.yml up -d consul-agent
done

rm docker-compose-proxy.yml

