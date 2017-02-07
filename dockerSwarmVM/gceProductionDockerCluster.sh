#!/usr/bin/env bash
# add load balancer
https://rominirani.com/docker-swarm-on-google-compute-engine-364765b400ed#.fecofj5n4
# Other article for using google template CDM.
https://medium.com/@DazWilkin/deploy-docker-engine-in-swarm-mode-to-google-cloud-platform-8b88a5a43be8#.w7v3v4afm

VM=vm

# create instances:
for i in 1 2; do \
docker-machine create $VM-$i -d google \
    --google-machine-type f1-micro \
    --google-tags cluster \
    --google-project dentrist-webapp-1 ; \
done;

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

# Open ports for proxy:
# for p in 80 443; do
#     gcloud compute firewall-rules create cluster-rule-$p --allow tcp:$p --description "allow$p" --target-tags cluster
# done

# Or create firewall shared rules and add tag to instances utilizing it.
gcloud compute firewall-rules create default-allow-http --allow tcp:80 --description "allow80" --target-tags http-server
gcloud compute firewall-rules create default-allow-https --allow tcp:443 --description "allow443" --target-tags https-server
# Add tags that allow http & https access.
for i in 1 2; do
    ZONE=$(gcloud compute instances list --format=text --regexp .*$VM-$i.* | grep '^zone:' | sed 's/^.* //g' );
    gcloud config set compute/zone $ZONE
    gcloud compute instances add-tags $VM-$i --tags http-server,https-server
done