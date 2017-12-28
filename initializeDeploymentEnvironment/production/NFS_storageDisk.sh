# shared storage solutions:

# create disk for NFS which will be used as for NFS server:
# Name must be with number/hyphen, as it appears to cause mount changing name in server without them.
DISK=datadisk-1
ZONE=$(gcloud compute instances list --format=text --regexp .*$VM-1.* | grep '^zone:' | sed 's/^.* //g' );
gcloud config set compute/zone $ZONE
gcloud compute disks create $DISK --size 50 --type pd-standard --zone $ZONE
gcloud compute instances attach-disk $VM-1 --disk $DISK --device-name $DISK
# get network range:
REGION=europe-west1
RANGES=$(gcloud compute networks subnets list --format=text default --regions=$REGION | grep '^ipCidrRange:' | sed 's/^.* //g' );
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


#################################### OPTION 1 - shared persistent disk
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

#################################### OPTION 2 - NFS server 
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
echo "/mnt/$DISK        $RANGES(rw,sync,no_root_squash,subtree_check)" >> /etc/exports
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


# Change permissions of all mount files:
sudo find ./datadisk-1/ -type f -exec chown 1000 {} \;
sudo find ./datadisk-1/ -type d -exec chown 1000 {} \;