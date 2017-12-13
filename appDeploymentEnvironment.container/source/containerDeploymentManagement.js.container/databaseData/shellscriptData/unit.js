const configuration = require('../../configuration/configuration.export.js')

let data = [
    /**
     * Install Docker Compose
     */
    { 
        key: '66181bdc-16f2-4fb3-af1f-4fe301ab6a18',
        label: {
            name: 'Run this command to download the latest version of Docker Compose:', 
        },
        command: 'curlfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        argument: ['-L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: 'fa4c633a-24a0-4255-834f-0181a6ce48f0',
        label: {
            name: 'Apply executable permissions to the binary', 
        },
        command: 'chmod',
        argument: ['+x /usr/local/bin/docker-compose;'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '49f404a4-d0f6-41a5-9b66-0e5136c76ddb',
        label: {
            name: 'docker-compose version'
        },
        command: 'docker-compose',
        argument: ['--version'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },



    /**
     * run container
     */

    {
        key: '63fa6973-58c1-4ae9-b2c3-3a001d94cedd',
        label: {
            name: 'run rethinkdb for using in temporary build container'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `up --force-recreate rethinkdb_build`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawnAsynchronous' 
    },
    {
        key: 'bcc280d1-2dd3-4e57-be19-a11821adc2d4',
        label: {
            name: 'run dockerfile build - temporary container that the build creates'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `build dockerfileBuild`
        ],
        option: {
            // cwd: '/',
            shell: true,
            stdio: [0, 1, 2],
            env: {
                dockerImage: process.env.dockerImage,
                DEPLOYMENT: 'imageBuild',
                instructionConfigurationFilePath: process.env.instructionConfigurationFilePath,
                instructionOption: 'install'
            }
        },
        implementation: 'spawn'
    },
    {
        key: '7aac8cd8-9399-471c-a14f-a281ea086550',
        label: {
            name: 'stop/remove container rethinkdb which was used for build'
        },
        command: 'docker-compose',
        argument: [
            `-f ${configuration.directory.projectContainerRootFolder}/application/setup/container/containerDeployment.dockerCompose.yml`,
            `--project-name appDeploymentEnvironment`,
            `stop rethinkdb_build`
        ],
        option: {
            shell: true,
            stdio: [0, 1, 2],
            env: {}
        },
        implementation: 'spawn' 
    },
];

export default {
    databaseTableName: 'unit',
    data: data
}