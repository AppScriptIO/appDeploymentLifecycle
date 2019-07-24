#!/usr/bin/env bash

# Docker local registry server for pulling and pushing images locally.
docker service create --name registry -p 5000:5000 \
    --mount "type=bind,source=$PWD,target=/var/lib/registry" \
    registry:2.5.0
    # --reserve-memory 100m
