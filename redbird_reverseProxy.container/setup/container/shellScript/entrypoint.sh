#!/bin/bash
set -ex; 
echo "Deploying as ${DEPLOYMENT}";

# copy from tmp only if not present already in volume.
if [ ! -f /app/server/proxy.js ]; then
    cp -pr /tmp/source/server/* /app/server/
fi

cd /app/server;
npm install; npm update;
node proxy.js;

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
exec "$@"
