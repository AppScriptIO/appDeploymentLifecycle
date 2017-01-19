# Jenkins Agent - Repo: https://github.com/vfarcic/docker-jenkins-slave-dind DockerHub: https://hub.docker.com/r/vfarcic/jenkins-swarm-agent/
VM=localContinuousDeploymentNode-1
docker-machine ssh $VM

# Folder where agents save data during pipeline steps executions.
sudo mkdir /workspace && sudo chmod 777 /workspace && exit

export USER=admin
export PASSWORD=admin

# Should fix $HOME directory for Windows mount to work.
docker service create --name jenkins-agent --mode global --constraint 'node.labels.deploymentEnvironment == jenkinsAgent' \
    -e COMMAND_OPTIONS="-master http://192.168.99.100:8082/jenkins -username $USER -password $PASSWORD -labels 'docker' -executors 5" \
    --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
    --mount "type=bind,source=$HOME/.docker/machine/machines,target=/machines" \
    --mount "type=bind,source=/workspace,target=/workspace" \
    vfarcic/jenkins-swarm-agent