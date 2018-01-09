#!/bin/bash
###### TODO: Change this file name to represent its purpose more like "node module installations. and execution of following command"

set -ex; 
echo "Deploying as ${DEPLOYMENT}";

echo 'Node Version: '; node -v;
echo 'NPM Version: '; npm -v;
echo 'Gulp Version: '; gulp -v;

# ⭐ install dependencies / node modules (from packages.json) in working directory "/tmp/build/gulp_buildTool/" & update to latest versions
# --no-bin-links --no-optional (removes fsevents which fails on Windows volume) options may sovle issues with installation. & 'npm cache verify' may fix inconsitencies with new npm and windows.
(
    cd /project/application/setup/build;
    # npm cache verify;
    # npm install --no-optional;
    # npm install --only=dev;
    # Use yarn instead of npm.
    # npm update;
    yarn install --pure-lockfile --production=false # Install prod & dev dependencies and do not generate lock file, but read from if exists.

)
sleep 1;

if [ -d "/project/application/setup/livereload" ]; then
    (
        cd /project/application/setup/livereload;
        # npm install;
        # npm install --only=dev;
        # npm update;
        yarn install --pure-lockfile --production=false;
    )
fi
sleep 1;

(
    cd /project/dependency/appDeploymentLifecycle/gulp_buildTool.js; 
    # npm install;
    # npm install --only=dev;
    # npm update;
    # yarn install --pure-lockfile --production=false; 
    yarn install;
    yarn upgrade; 
)
sleep 1;

(
    cd /project/dependency/appDeploymentLifecycle/babel_javascriptTranspilation.js; 
    # npm install;
    # npm install --only=dev;
    # npm update;
    yarn install --pure-lockfile --production=false;
)
sleep 1;

sleep 4;
(
    cd /project/application/setup/build;
    ./entrypoint.sh build
)
sleep 1;

echo "Gulp watch ? ";
if [ "$DEPLOYMENT" = "development" ]; then
    (cd /project/application/setup/livereload;
    ./entrypoint.sh watch)
fi

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
exec "$@"
