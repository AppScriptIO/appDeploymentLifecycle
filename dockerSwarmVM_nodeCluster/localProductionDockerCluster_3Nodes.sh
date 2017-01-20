#!/usr/bin/env bash
# Simulating production cluster.
# Creates 3 Nodes and joins them to docker swarm as managers (localProductionNode-<1/2/3>). Labels them with "Production".
VM=localProductionNode
VMPROD=localProductionNode

# Create 3 nodes.
for i in 1 2 3; do
    docker-machine create -d virtualbox $VM-$i
done

# Initialize swarm with one of the nodes.
eval $(docker-machine env $VM-1)
docker swarm init --advertise-addr $(docker-machine ip $VM-1)

# Join other nodes as manager to the swarm.
TOKEN=$(docker swarm join-token -q manager)
for i in 2 3; do
    eval $(docker-machine env $VM-$i)
    # join swarm on default port set by Docker.
    docker swarm join --token $TOKEN --advertise-addr $(docker-machine ip $VM-$i) $(docker-machine ip $VM-1):2377
done

# add label to he nodes.
for i in 1 2 3; do
    eval $(docker-machine env $VM-$i)
    docker node update --label-add deploymentEnvironment=production $VM-$i
done

echo "☕ The swarm cluster is up and running"
