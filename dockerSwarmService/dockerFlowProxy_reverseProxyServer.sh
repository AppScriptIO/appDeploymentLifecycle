#!/usr/bin/env bash
# "vfarcic/docker-flow-proxy" - create proxy service for docker cluster.

# create proxy network. whcih will be used by proxy and all services that have open ports to the internet.
docker network create --driver overlay proxy

docker service create --name proxy -p 80:80 -p 443:443 -p 8090:8080 --network proxy -e MODE=swarm --replicas 3 \
    --constraint 'node.labels.deploymentEnvironment == productionLike' \
    -e CONSUL_ADDRESS="$(docker-machine ip swarm-1):8500,$(docker-machine ip swarm-2):8500,$(docker-machine ip swarm-3):8500" \
    vfarcic/docker-flow-proxy
    # --reserve-memory 50m

while true; do
    REPLICAS=$(docker service ls | grep proxy | awk '{print $3}')
    REPLICAS_NEW=$(docker service ls | grep proxy | awk '{print $4}')
    if [[ $REPLICAS == "3/3" || $REPLICAS_NEW == "3/3" ]]; then
        break
    else
        echo "Waiting for the proxy service..."
        sleep 10
    fi
done

# Configure through http request: (example)
curl "$(docker-machine ip swarm-1):8090/v1/docker-flow-proxy/reconfigure?serviceName=go-demo&servicePath=/demo&port=8080&distribute=true"
