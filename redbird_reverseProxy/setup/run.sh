
deployment.build() {
    # Build image
    docker-compose -f ./setup/container/deployment.dockerCompose.yml build --no-cache proxy
}

# push image
producation() {
    # add necessary ports 
    gcloud compute firewall-rules create redbird-proxy --allow tcp:3000 --description "allow3000usedforletsencrypt" --target-tags docker-machine

    # Production
    VolumePath=/mnt/datadisk-1/redbirdProxy/server
    sudo mkdir -p $VolumePath;
    VolumePath=/mnt/datadisk-1/redbirdProxy/certificate
    sudo mkdir -p $VolumePath;

    docker stack deploy -c ./setup/container/production.dockerStack.yml proxy
}
