# Proxy - "docker flow proxy"
VM=vm

# Create mounts folders.
docker-machine ssh $VM-1 
VolumePath=/mnt/datadisk-1/dockerFlowProxy/haproxyConfiguration
sudo mkdir -p $VolumePath;
# Dowload haproxy.cfg
sudo curl -o $VolumePath/haproxy.cfg https://raw.githubusercontent.com/myuseringithub/appDeploymentLifecycle/master/dockerFlowProxy_reverseProxy/haproxy.cfg

# copy haproxy.cfg DON'T work
# docker-machine scp ./haproxy.cfg /mnt/datadisk-1/dockerFlowProxy/haproxyConfiguration
# CONTENT=$(<./haproxy.cfg)
# docker-machine ssh $VM-1 sudo echo "$CONTENT" >> /mnt/datadisk-1/dockerFlowProxy/haproxyConfiguration/haproxy.cfg

# docker network create --driver overlay proxy
docker stack deploy --compose-file ./dockerFlowProxy.dockerStack.yml proxy

