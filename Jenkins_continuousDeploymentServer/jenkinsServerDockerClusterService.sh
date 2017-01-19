# Jenkins Server Service - 
# Send Docker client commands to Docker engine on the desired node.
VM=localProductionNode-1
eval $(docker-machine env $VM)
# In case for Windows "--mount" doesn't work without changing $PWD to the local pwd command. Then ssh into the machine and run docker create command.
mkdir -p docker/jenkins

docker service create --name jenkins -p 8082:8080 -p 50000:50000 -e JENKINS_OPTS="--prefix=/jenkins" \
    --mount "type=bind,source=$PWD/docker/jenkins,target=/var/jenkins_home" \
    jenkins:2.7.4-alpine
    # --reserve-memory 300m 
