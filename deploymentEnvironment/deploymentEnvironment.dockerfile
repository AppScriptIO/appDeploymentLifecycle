FROM php:latest
MAINTAINER SZN

# Copy all shellScript files and make them executable.
COPY ./shellScript/ /tmp/shellScript/
# Apparently when copied from windows, execution permissions should be granted.
RUN find /tmp/shellScript/ -type f -exec chmod +x {} \; 

# As this is a deployment image - number of layers and subsequently image size doesn't matter.
# Run upgrade before update, to prevent errors for upgraded packages.
RUN apt-get upgrade -y; \
    apt-get update -y; \
    apt-get update -y --fix-missing;
    # apt-get install --fix-missing; \
    # apt-get upgrade --fix-missing; \
    # apt-get -f install; \
    # apt-get install aptitude -y; \
    # fix some issues with curl insllation
    # aptitude -f install libcurl3-gnutls -y; \

# for adding "add-apt-repository" command.
# RUN apt-get install python-software-properties -y;
# RUN apt-get install python3-software-properties -y;
# RUN apt-get install software-properties-common -y;

RUN apt-get install apt-utils -y; \
    apt-get install wget -y; \
    apt-get install curl -y;

# `|| true` to ignore error (because git installation gets debian connection error - apparently servers are temporarly down)
RUN /tmp/shellScript/git.installation.sh; sleep 1;

ARG NODEJS_VERSION=v8.0.0-nightly201702124cafa60c99
ENV NODEJS_VERSION ${NODEJS_VERSION}
RUN /tmp/shellScript/nodejs.installation.sh; sleep 1;
# RUN /tmp/shellScript/php7.installation.sh;
RUN /tmp/shellScript/bower.installation.sh; sleep 1;
RUN /tmp/shellScript/gulp.installation.sh; sleep 1;
RUN /tmp/shellScript/rsync.installation.sh; sleep 1;
RUN /tmp/shellScript/jspm.installation.sh; sleep 1;
RUN /tmp/shellScript/composer.installation.sh; sleep 1;
