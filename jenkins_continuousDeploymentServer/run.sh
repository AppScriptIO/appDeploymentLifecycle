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

    # 5. add credentials for docker and github. inJenkins server settings
}

jenkins.agent() { # local
    # IMPORTANT: To reconnect try leaving swarn and them rejoining with ip of vm.
    
    # Jenkins agent:
    # https://github.com/vfarcic/docker-flow-stacks/tree/master/jenkins
    # 1. Folder agent local wordspace
    sudo adduser -G root -D jenkins
    sudo mkdir /workspace; sudo chmod -R 777 /workspace; sudo chown jenkins /workspace
    
    # 2. run agent
    export HOME=/c/Users/<...>
    export JenkinsServerIP=<...>
    export JenkinsServerPassword=<...>
    docker stack deploy -c ./jenkinsAgent.dockerStack.yml jenkins-agent

    # 3. validate connection by navigating to jenkins server nodes settings.
    
}
jenkins.agent-secrets() { # local
    # IMPORTANT: To reconnect try leaving swarn and them rejoining with ip of vm.
    
    # Jenkins agent:
    # https://github.com/vfarcic/docker-flow-stacks/tree/master/jenkins
    # 1. Folder agent local wordspace
    sudo adduser -G root -D jenkins
    sudo mkdir /workspace; sudo chmod -R 777 /workspace; sudo chown jenkins /workspace

        
    # create secrets
    echo "admin" | docker secret create jenkins-user -
    echo "password" | docker secret create jenkins-pass -
    # 2. run agent
    export HOME=/c/Users/<...>
    export JenkinsServerIP=<...>
    # export JenkinsServerPassword=<...>
    JENKINS_USER_SECRET=jenkins-user \
    JENKINS_PASS_SECRET=jenkins-pass \
    docker stack deploy -c ./jenkinsAgent-secrets.dockerStack.yml jenkins-agent
    
    # 3. validate connection by navigating to jenkins server nodes settings.
    
}
