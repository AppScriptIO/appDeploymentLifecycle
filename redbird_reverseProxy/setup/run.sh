
# Deployment
docker-compose -f ./setup/container/deployment.dockerCompose.yml up buildDistributionCode

# build image
docker-compose -f ./setup/container/deployment.dockerCompose.yml build buildImage

# Production
VolumePath=/mnt/datadisk-1/redbirdProxy
sudo mkdir -p $VolumePath;
docker stack deploy -c ./setup/container/production.dockerStack.yml proxy
