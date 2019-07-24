#!/usr/bin/env bash
# add load balancer - https://rominirani.com/docker-swarm-on-google-compute-engine-364765b400ed#.fecofj5n4
# Other article for using google template CDM. - https://medium.com/@DazWilkin/deploy-docker-engine-in-swarm-mode-to-google-cloud-platform-8b88a5a43be8#.w7v3v4afm
# Swarm mode deployment using templates and deployment manager for GCE (Google cloud) - https://blog.docker.com/2017/03/beta-docker-community-edition-google-cloud-platform/
VM=vm

########################### In case of existing VMs:
# Add already existing compute instance.
# IMPORTANT: `google_compute_engine` = allows connection to all compute engines on google cloud. Created when authentecating or sshing using glcoud command.
docker-machine create --driver generic --generic-ip-address <ExternalIP> --generic-ssh-user <OSUser> --generic-ssh-key ~/.ssh/google_compute_engine <VM>
docker-machine create --driver generic --generic-ip-address <ExternalIP> --generic-ssh-user docker-user --generic-ssh-key ~/.ssh/<SSHKey> <VM>
# regenerate certificates & provision
# docker-machine regenerate-certs <VM>
# docker-machine provision <VM>

########################### Connect/Authenticate with Google Cloud
# Set gcloud default credentials - https://developers.google.com/identity/protocols/application-default-credentials
# One easy way to do so: 
gcloud auth application-default login

########################### Create VMs
# create instances:
# Main Leader Instance that also serves as shared NFS.
docker-machine create $VM-1 -d google --google-project szn-webapps --google-username Entrepreneur --google-zone europe-west1-c --google-tags cluster \
    --google-machine-type n1-standard-1 --google-disk-type pd-standard --google-disk-size 10 ;

for i in 2; do \
    docker-machine create $VM-$i -d google --google-project szn-webapps --google-username Entrepreneur --google-zone europe-west1-c --google-tags cluster \
        --google-machine-type g1-small --google-disk-type pd-standard --google-disk-size 10 ; \
done

########################### Open ports for internal use.
# Open ports for swarm mode to work properly (as docker-machine doesn't open all required ports for nodes communication for example.)
gcloud compute firewall-rules create docker-swarm --allow tcp:2377,tcp:7946,tcp:4789,udp:7946,udp:4789 --description "allowswarmtowork" --target-tags docker-machine

# Open ports for proxy:
# for p in 80 443; do
#     gcloud compute firewall-rules create cluster-rule-$p --allow tcp:$p --description "allow$p" --target-tags cluster
# done

########################### Open ports for external connections.
# Or create firewall shared rules and add tag to instances utilizing it. The naming with default and `-server` is because of google default values for https http when created by UI.
gcloud compute firewall-rules create default-allow-http --allow tcp:80 --description "allow80" --target-tags http-server
gcloud compute firewall-rules create default-allow-https --allow tcp:443 --description "allow443" --target-tags https-server
gcloud compute firewall-rules create redbird-proxy --allow tcp:3000 --description "allow3000usedforletsencrypt" --target-tags docker-machine
gcloud compute firewall-rules create jenkins-server --allow tcp:50000 --description "allow50000usedforjenkinsagentservercommunication" --target-tags docker-machine
# Add tags that allow http & https access.
for i in 1 2; do
    ZONE=$(gcloud compute instances list --format=text --regexp .*$VM-$i.* | grep '^zone:' | sed 's/^.* //g' );
    gcloud config set compute/zone $ZONE
    gcloud compute instances add-tags $VM-$i --tags http-server,https-server
done

########################### Join Docker swarm
# Initialize swarm with one of the nodes.
eval $(docker-machine env $VM-1)
# Internal IP of Leader
LeaderInternalIP=$(gcloud compute instances list --format=text --regexp .*$VM-1.* | grep '^networkInterfaces\[[0-9]\+\]\.networkIP:' | sed 's/^.* //g' );
docker swarm init --advertise-addr $LeaderInternalIP

# Join other nodes as manager to the swarm.
TOKEN=$(docker swarm join-token -q manager)
for i in 2; do
    eval $(docker-machine env $VM-$i)
    # InternalIP    
    VMInternalIP=$(gcloud compute instances list --format=text --regexp .*$VM-$i.* | grep '^networkInterfaces\[[0-9]\+\]\.networkIP:' | sed 's/^.* //g' );
    # join swarm on default port set by Docker.
    docker swarm join --token $TOKEN --advertise-addr $VMInternalIP $LeaderInternalIP:2377
done

########################### IMPORTANT: Restart VMS



