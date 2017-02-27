jenkins.server() {
    # 1. add necessary ports 
    gcloud compute firewall-rules create jenkins-server --allow tcp:50000 --description "allow50000usedforjenkinsagentservercommunication" --target-tags docker-machine

    # 2. run Jenkins server:
    VM=vm
    # Create mounts folders.
    docker-machine ssh $VM-1 
    VolumePath=/mnt/datadisk-1/jenkins
    sudo mkdir -p $VolumePath;
    sudo chown 1000 $VolumePath
    docker stack deploy -c ./jenkinsServer.dockerStack.yml jenkins

    # 3. Jenkins server initialize & install plugins;
    # Self-Organizing Swarm Plug-in Modules

    # (After connecting agent)
    # 4. Create jenkins pipeline jobs
    # add global variables to the jenkins server configuration: 
    # PROD_IP = <the ip of cload hosted production server>
    # PROD_NAME = < name of vm so it will be identified>
}

jenkins.agent() { # local
    # Jenkins agent:
    # https://github.com/vfarcic/docker-flow-stacks/tree/master/jenkins
    # 1. Folder agent local wordspace
    mkdir ./workspace; chmod 777 ./workspace

    # 2. run agent
    docker stack deploy -c ./jenkinsAgent.dockerStack.yml jenkins-agent

    # 3. validate connection by navigating to jenkins server nodes settings.


}
