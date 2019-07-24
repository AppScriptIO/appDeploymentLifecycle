#!/usr/bin/env bash

VM=localProductionNode
VM=localContinuousDeploymentNode

docker network create --driver overlay go-demo

docker service create --name go-demo-db --network go-demo \
    --constraint 'node.labels.deploymentEnvironment == productionLike' \
    mongo:3.2.10
# --reserve-memory 150m


while true; do
    REPLICAS=$(docker service ls | grep go-demo-db | awk '{print $3}')
    REPLICAS_NEW=$(docker service ls | grep go-demo-db | awk '{print $4}')
    if [[ $REPLICAS == "1/1" || $REPLICAS_NEW == "1/1" ]]; then
        break
    else
        echo "Waiting for the go-demo-db service..."
        sleep 10
    fi
done

docker service create --name go-demo -e DB=go-demo-db --network go-demo --network proxy --replicas 3 --update-delay 5s \
    --constraint 'node.labels.deploymentEnvironment == productionLike' \    
    vfarcic/go-demo:1.0
#--reserve-memory 50m

while true; do
    REPLICAS=$(docker service ls | grep vfarcic/go-demo | awk '{print $3}')
    REPLICAS_NEW=$(docker service ls | grep vfarcic/go-demo | awk '{print $4}')
    if [[ $REPLICAS == "3/3" || $REPLICAS_NEW == "3/3" ]]; then
        break
    else
        echo "Waiting for the go-demo service..."
        sleep 10
    fi
done

# Configure through http request: (example)
curl "$(docker-machine ip $VM-1):8090/v1/docker-flow-proxy/reconfigure?serviceName=go-demo&servicePath=/demo&port=8080&distribute=true"
