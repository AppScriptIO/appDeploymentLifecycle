#!/usr/bin/env bash
# Create 3 nodes: 1 as jenkins agent, 2 as production-like simulation.
VM=localContinuousDeploymentNode
VMCD=localContinuousDeploymentNode

for i in 1 2 3; do
    docker-machine create -d virtualbox $VM-$i
    # --virtualbox-memory 512
done

eval $(docker-machine env $VM-1)

docker swarm init --advertise-addr $(docker-machine ip $VM-1)

docker node update --label-add deploymentEnvironment=jenkinsAgent $VM-1

TOKEN=$(docker swarm join-token -q manager)
for i in 2 3; do
    eval $(docker-machine env $VM-$i)

    docker swarm join --token $TOKEN --advertise-addr $(docker-machine ip $VM-$i) $(docker-machine ip $VM-1):2377

    docker node update --label-add deploymentEnvironment=productionLike $VM-$i
done

echo "☕ The swarm test cluster is up and running"