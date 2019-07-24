#!/usr/bin/env bash

# Portainer is a docker management ui.
docker-compose \
        -f ./portainerContainerGUI.dockerCompose.yml \
        --project-name containerGUI \
        up -d --force-recreate

docker ps

rundll32 url.dll,FileProtocolHandler http://localhost:9000
