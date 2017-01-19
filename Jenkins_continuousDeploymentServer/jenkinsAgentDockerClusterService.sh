# Jenkins Agent - Repo: https://github.com/vfarcic/docker-jenkins-slave-dind DockerHub: https://hub.docker.com/r/vfarcic/jenkins-swarm-agent/
VM=localContinuousDeploymentNode-1
VMProduction=localProductionNode-1

docker-machine ssh $VM

# Folder where agents save data during pipeline steps executions.
sudo mkdir /workspace && sudo chmod 777 /workspace && exit

JenkinsServerIP=$(docker-machine ip $VMProduction)
export USER=admin
export PASSWORD=admin

# Should fix $HOME directory for Windows mount to work.
docker service create --name jenkins-agent --mode global --constraint 'node.labels.deploymentEnvironment == jenkinsAgent' \
    -e COMMAND_OPTIONS="-master http://$JenkinsServerIP:8082/jenkins -username $USER -password $PASSWORD -labels 'docker' -executors 5" \
    --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
    --mount "type=bind,source=$HOME/.docker/machine/machines,target=/machines" \
    --mount "type=bind,source=/workspace,target=/workspace" \
    vfarcic/jenkins-swarm-agent

# New VM as agent should appear.
open "http://$(docker-machine ip $VMProduction):8082/jenkins/computer"