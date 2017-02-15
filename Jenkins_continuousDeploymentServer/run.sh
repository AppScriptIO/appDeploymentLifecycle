# Jenkins server:
VM=vm
# Create mounts folders.
docker-machine ssh $VM-1 
VolumePath=/mnt/datadisk-1/jenkins
sudo mkdir -p $VolumePath;
sudo chown 1000 $VolumePath
docker stack deploy -c ./jenkinsServer.dockerStack.yml jenkins

# Jenkins agent:
# TODO: https://github.com/vfarcic/docker-flow-stacks/tree/master/jenkins