The end result of this repository (i.e. deployment in production) is a docker image that can be used for :
• Building docker images using nodejs scripts. i.e. installing packages, moving files, organizing project files in the container operating system.
• Running other applications in development, and providing environment for deployment also.

directory struction for:
• Intermediate container used for installation and calling dockerfile build through socket:
    - /project
        /application
        /dependency
• Resulted container/image from build:
    - /project
        - /appDeploymentEnvironment
                /application
                /dependency
    (because the production apps that are going to use it will have inside the project folder their own application and dependency folders.)