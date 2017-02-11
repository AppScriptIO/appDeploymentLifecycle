#!/usr/bin/env bash
# add load balancer
https://rominirani.com/docker-swarm-on-google-compute-engine-364765b400ed#.fecofj5n4
# Other article for using google template CDM.
https://medium.com/@DazWilkin/deploy-docker-engine-in-swarm-mode-to-google-cloud-platform-8b88a5a43be8#.w7v3v4afm

VM=vm

# Add already existing compute instance.
# `google_compute_engine` = allows connection to all compute engines on google cloud. Created when authentecating or sshing using glcoud command.
docker-machine create --driver generic --generic-ip-address <ExternalIP> --generic-ssh-user <OSUser> --generic-ssh-key ~/.ssh/google_compute_engine <VM>
docker-machine create --driver generic --generic-ip-address <ExternalIP> --generic-ssh-user docker-user --generic-ssh-key ~/.ssh/<SSHKey> <VM>

# Set gcloud default credentials - https://developers.google.com/identity/protocols/application-default-credentials
# One easy way to do so: 
gcloud auth application-default login

# create instances:
# Main Leader Instance that also serves as shared NFS.
docker-machine create $VM-1 -d google --google-project szn-webapps --google-username Entrepreneur --google-zone europe-west1-c --google-tags cluster \
    --google-machine-type n1-standard-1 --google-disk-type pd-standard --google-disk-size 10

for i in 2; do \
docker-machine create $VM-$i -d google --google-project szn-webapps --google-username Entrepreneur --google-zone europe-west1-c --google-tags cluster --google-machine-type f1-micro --google-disk-type pd-standard --google-disk-size 10 \
done

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

# Open ports for swarm mode to work properly (as docker-machine doesn't open all required ports for nodes communication for example.)
gcloud compute firewall-rules create docker-swarm --allow tcp:2377,tcp:7946,tcp:4789,udp:7946,udp:4789 --description "allowswarmtowork" --target-tags docker-machine

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


# PERSISTENT DISK SOLUTION - doesn't work because persistent disk can be shared accross multiple instances as read only.
# # create disk that will be used as a volume:
# DISK=data
# gcloud compute disks create $DISK --size 50 --type pd-standard
# # Attach disk to instances
# for i in 1 2; do
#     gcloud compute instances attach-disk $VM-$i --disk $DISK
# done
# # Mount disk/volume to vms in `/mnt/data`
# # IMPORTANT: should be run manually - after ssh commands are not transmitted.
# for i in 1 2; do
#     docker-machine ssh $VM-$i
#     sudo mkdir -p /mnt/
#     sudo mount -o discard,defaults /dev/disk/by-id/google-$DISK /mnt/$DISK
#     # Configure read and write access
#     sudo chmod a+w /mnt/$DISK
# done

# NFS Solution:
# create disk for NFS which will be used as for NFS server:
# Name must be with number/hyphen, as it appears to cause mount changing name in server without them.
DISK=datadisk-1
ZONE=$(gcloud compute instances list --format=text --regexp .*$VM-1.* | grep '^zone:' | sed 's/^.* //g' );
gcloud config set compute/zone $ZONE
gcloud compute disks create $DISK --size 50 --type pd-standard
gcloud compute instances attach-disk $VM-1 --disk $DISK
# gcloud compute instances reset $VM-1
# IMPORTANT: run manually
docker-machine ssh $VM-1
sudo mkdir -p /mnt/$DISK
# list mounted disks:
ls /dev/disk/by-id
# CAREFUL: format to required type:
# sudo mkfs.ext4 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/disk/by-id/google-$DISK
# mount
sudo mount -o discard,defaults /dev/disk/by-id/google-$DISK /mnt/$DISK
# Configure read and write access
sudo chmod a+w /mnt/$DISK
# Automatically mount when restarted: if `nofail` doesn't work use `nobootwait` option.
echo UUID=`sudo blkid -s UUID -o value /dev/disk/by-id/google-$DISK` /mnt/$DISK ext4 discard,defaults,nofail 0 2 | sudo tee -a /etc/fstab
cat /etc/fstab

# NFS server:
# https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nfs-mount-on-ubuntu-14-04
# http://www.krizna.com/ubuntu/setup-nfs-server-ubuntu-14-04/
# http://www.ubuntugeek.com/how-to-configure-nfs-server-and-client-configuration-on-ubuntu-14-04.html
sudo apt-get update
# Install nfs server package
sudo apt-get install nfs-kernel-server -y
# /etc/exports is the file for configuration
# Share access to a particular network - https://console.cloud.google.com/networking/networks/list
sudo -i
echo "/mnt/$DISK        10.240.0.0/16(rw,sync,no_root_squash,subtree_check)" >> /etc/exports
# start NFS service
sudo /etc/init.d/nfs-kernel-server start
# check share status
sudo exportfs -u
# Run NFS at boot - DOESN"T Work 
sudo sed -i '/^exit 0/isudo /etc/init.d/nfs-kernel-server start' /etc/rc.local
# # http://www.cyberciti.biz/faq/debian-ubuntu-linux-disable-remove-nfs-services-daemons/
# # Stop services NFS
# sudo service nfs-kernel-server stop


# NFS Client Commands:
LeaderInternalIP=$(gcloud compute instances list --format=text --regexp .*$VM-1.* | grep '^networkInterfaces\[[0-9]\+\]\.networkIP:' | sed 's/^.* //g' );
for i in 2; do
    docker-machine ssh $VM-$i
    # Install nfs client & dependencies.
    sudo apt-get install nfs-common rpcbind -y
    sudo mkdir -p /mnt/$DISK
    sudo mount $LeaderInternalIP:/mnt/$DISK /mnt/$DISK
    # Automatically mount when restarted:
    echo "$LeaderInternalIP:/mnt/$DISK /mnt/$DISK nfs rw,sync,hard,intr 0 0" | sudo tee -a /etc/fstab
    cat /etc/fstab
done

# TODO: Automatically mount from NFS server to client doesn't work -Check for automount solution https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/3/html/System_Administration_Guide/s1-nfs-mount.html