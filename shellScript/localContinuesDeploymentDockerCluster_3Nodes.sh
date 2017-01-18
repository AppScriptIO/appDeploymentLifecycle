#!/usr/bin/env bash
# Create 3 nodes: 1 as jenkins agent, 2 as production-like simulation.

for i in 1 2 3; do
    docker-machine create -d virtualbox localContinuesDeploymentNode-$i
    # --virtualbox-memory 512
done

eval $(docker-machine env localContinuesDeploymentNode-1)

docker swarm init --advertise-addr $(docker-machine ip localContinuesDeploymentNode-1)

docker node update --label-add deploymentEnvironment=jenkinsAgent localContinuesDeploymentNode-1

TOKEN=$(docker swarm join-token -q manager)
for i in 2 3; do
    eval $(docker-machine env localContinuesDeploymentNode-$i)

    docker swarm join --token $TOKEN --advertise-addr $(docker-machine ip localContinuesDeploymentNode-$i) $(docker-machine ip localContinuesDeploymentNode-1):2377

    docker node update --label-add deploymentEnvironment=productionLike localContinuesDeploymentNode-$i
done

echo "☕ The swarm test cluster is up and running"