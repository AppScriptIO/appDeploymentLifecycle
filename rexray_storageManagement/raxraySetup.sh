#!/usr/bin/env bash
# rexray v0.3.3 docs https://rexray.readthedocs.io/en/v0.3.3/user-guide/storage-providers/#google-compute-engine

VM=vm

# IMPORTANT: should be run manually - after ssh commands are not transmitted.
for i in 1 2; do
    docker-machine ssh $VM-$i
    # Insllation of older version 0.3
    curl -sSL https://dl.bintray.com/emccode/rexray/install | sh -s -- stable 0.3.3

    # IMPORTANT: Add credentials JSON file to /SZN/credentials/cert.json
    sudo mkdir -p /SZN/credentials
    echo '
    #IMPORTANT: add credentials from local user folder.  https://developers.google.com/identity/protocols/application-default-credentials
    ' \
    | sudo tee /SZN/credentials/cert.json

    sudo mkdir -p /etc/rexray/
    echo "
    rexray:
        storageDrivers:
        - gce
    gce:
        keyfile: /SZN/credentials/cert.json
        # TODO: Fix volumePath, should change default rexray volume path to `/mnt`
        volumePath: /mnt/" \
    | sudo tee /etc/rexray/config.yml

    # Run rexray
    sudo rexray service start

    # get gce disks/volumes
    sudo rexray volume get



    exit;
done


