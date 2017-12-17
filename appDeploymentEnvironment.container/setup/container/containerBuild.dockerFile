### Build docker container
### As this is a deployment image - number of layers and subsequently image size doesn't matter.
FROM node:latest
MAINTAINER SZN


# Copy files and make them executable.
# Copy command in dockerfile is relative to the build context specified in docker-compose.
COPY ./application/ /project/appDeploymentEnvironment/application/
COPY ./dependency/ /project/appDeploymentEnvironment/dependency/

### command for build installation - define defaults, which can be overriden by docker-compose file args.
ARG instructionConfigurationFilePath
ENV instructionConfigurationFilePath ${instructionConfigurationFilePath}
ARG instructionOption
ENV instructionOption ${instructionOption}
ARG dockerImageTag
ENV dockerImageTag ${dockerImageTag}
ARG dockerImageName
ENV dockerImageName ${dockerImageName}
ARG DEPLOYMENT
ENV DEPLOYMENT ${DEPLOYMENT}
# Apparently when copied from windows, execution permissions should be granted. for sehll scripts.
RUN find /project/ -type f -exec chmod +x {} \; 
RUN node /project/appDeploymentEnvironment/application/source/containerDeploymentManagement.js.container/

# ### Define command for runtime. For using container from dockerhub immediately.
# ARG instructionConfigurationFilePath=./instructionConfiguration.js
# ENV instructionConfigurationFilePath ${instructionConfigurationFilePath}
# ARG instructionOption=run
# ENV instructionOption ${instructionOption}
# # Executed only on runtime.
# CMD node /app/containerDeploymentManagement.js.container/entrypoint.js
