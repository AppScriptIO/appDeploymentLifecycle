FROM node:latest
# RUN apt-get update -y; apt-get upgrade -y;

ENV EMAIL ${EMAIL}
ENV LETSENCRYPT_PORT ${LETSENCRYPT_PORT}

COPY ./source/server /app/server

WORKDIR /app/server
ENTRYPOINT ./entrypoint.sh run