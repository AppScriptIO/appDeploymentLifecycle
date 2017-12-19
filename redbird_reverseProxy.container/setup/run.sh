
deployment.build() {
    export EMAIL=<...>
    export LETSENCRYPT_PORT=3000 

    # 1. install node_modules.

    # Build image
    docker-compose -f ./setup/container/deployment.dockerCompose.yml build --no-cache proxy
}

development() {
    docker-compose -f ./setup/container/deployment.dockerCompose.yml up -d --force-recreate development
}

# push image
producation() {
    # Issue Case: Docker Swarm not exposing ports to host. The reason for that is a VM reset, stop&start, or docker engine upgrade. In these cases the routing mesh of docker swarm gets messed up for some reason.
        # Solution - leave swarm and rejoin or recreate swarm. 

    # 1. add necessary ports
    export LETSENCRYPT_PORT=3000 
    gcloud compute firewall-rules create redbird-proxy --allow tcp:$LETSENCRYPT_PORT --description "allow3000usedforletsencrypt" --target-tags docker-machine

    # 2. Production
    VolumePath=/mnt/datadisk-1/redbirdProxy/server
    sudo mkdir -p $VolumePath;
    VolumePath=/mnt/datadisk-1/redbirdProxy/certificate
    sudo mkdir -p $VolumePath;

    # 3. Export email address used for reverse proxy certificate registration with let's encrypt
    export EMAIL=<...>
    export LETSENCRYPT_PORT=3000

    # 4. 
    docker stack deploy -c ./setup/container/production.dockerStack.yml proxy
}
