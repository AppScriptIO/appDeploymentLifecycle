
# Build image
docker-compose -f ./setup/container/deployment.dockerCompose.yml build proxy
# push image

# Production
VolumePath=/mnt/datadisk-1/redbirdProxy
sudo mkdir -p $VolumePath;
docker stack deploy -c ./setup/container/production.dockerStack.yml proxy
