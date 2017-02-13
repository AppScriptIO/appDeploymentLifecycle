FROM node:latest
RUN apt-get update -y; apt-get upgrade -y;
    # npm install n -g; \
    # NODE_MIRROR=https://nodejs.org/download/nightly/ n v8.0.0-nightly20170126a67a04d765 ; \
    # n v8.0.0-nightly20170126a67a04d765 ; \
    # node -v ; \
    # node -p process.versions;

COPY ./source /app/