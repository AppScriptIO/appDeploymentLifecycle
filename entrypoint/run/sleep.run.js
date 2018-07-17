const { spawnSync } = require('child_process')

export default function({ ymlFile, serviceName, containerPrefix }) {
    let containerCommand = 'sleep 1000000'
    let processCommand = 'docker-compose'
    let processArg = [
        `-f ${ymlFile}`,
        `--project-name ${containerPrefix}`,
        `run --service-ports --use-aliases`,
        `--entrypoint '${containerCommand}'`,
        `${serviceName}`
    ]
    spawnSync(processCommand, processArg, { shell: true, stdio: [0,1,2] })
}