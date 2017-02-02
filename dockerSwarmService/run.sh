# Proxy - "docker flow proxy"
docker network create --driver overlay proxy
docker stack deploy --compose-file ./dockerSwarmService/dockerFlowProxy.dockerComposeService.yml proxy



