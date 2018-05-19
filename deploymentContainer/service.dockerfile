# last version used 9.3.0
FROM node:latest 

# Environment Variables & Arguments
# default value is override if build argument is specified in docker compose.


# project folder path 
ARG PROJECT="/project" 
ENV PROJECT=${PROJECT}

ARG DEPLOYMENT=production
ENV DEPLOYMENT ${DEPLOYMENT}

COPY ./distribution $PROJECT/application/distribution
COPY ./setup $PROJECT/application/setup

WORKDIR $PROJECT/application/distribution/serverSide
ENTRYPOINT $PROJECT/application/distribution/serverSide/entrypoint.sh run