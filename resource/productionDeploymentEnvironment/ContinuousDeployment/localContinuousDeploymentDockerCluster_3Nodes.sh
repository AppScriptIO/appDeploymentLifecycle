#!/usr/bin/env bash
# Create 3 nodes: 1 as jenkins agent, 2 as production-like simulation.

# localContinuousDeploymentNode
VMCD=CD
VM=$VMCD

for i in 1 2 3; do
    docker-machine create -d virtualbox $VM-$i
done

eval $(docker-machine env $VM-1)
docker swarm init --advertise-addr $(docker-machine ip $VM-1)

TOKEN=$(docker swarm join-token -q manager)
for i in 2 3; do
    eval $(docker-machine env $VM-$i)
    docker swarm join --token $TOKEN --advertise-addr $(docker-machine ip $VM-$i) $(docker-machine ip $VM-1):2377
done

# Add labels:
docker node update --label-add deploymentEnvironment=jenkinsAgent $VM-1
docker node update --label-add deploymentEnvironment=productionLike $VM-2
docker node update --label-add deploymentEnvironment=productionLike $VM-3

echo "☕ The swarm test cluster is up and running"