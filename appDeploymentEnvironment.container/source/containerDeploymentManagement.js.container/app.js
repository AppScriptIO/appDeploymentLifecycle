import path from 'path'
const configuration = require('./configuration/configuration.export.js')

console.log('• instructionConfigurationFilePath:' + process.env.instructionConfigurationFilePath)
console.log('• instructionOption:' + process.env.instructionOption)
console.log(`• Configuration: ${JSON.stringify(configuration)}`)

switch (process.env.instructionOption) {
    case 'build':
        require('./instructionImplementation/build.js')
    break;
    case 'install': {
        let instructionConfigurationPath = path.join(configuration.directory.projectContainerRootFolder, process.env.instructionConfigurationFilePath)
        const instructionConfiguration = require(instructionConfigurationPath)[process.env.instructionOption]
        let installationModulePath = path.join(configuration.directory.projectContainerRootFolder, instructionConfiguration.installationModulePath)
        require(installationModulePath)
    } break;
    case 'run':
        // (function endlessProcess() { process.nextTick(endlessProcess) })() // Readable solution but it utilizes all available CPU. https://stackoverflow.com/questions/39082527/how-to-prevent-the-nodejs-event-loop-from-exiting
        setInterval(() => {  console.log('setTimeout/setInterval (sleep) command ended. The process will exit now.'); }, 10000 * 60 * 60);
    break;
    default:
        console.log('Reached switch default - instructionOption does not match any case/kind/option')
        // var docker = new Docker({socketPath: '/var/run/docker.sock'})
        // var container = docker.getContainer('4ba04235356e8f07d16f2bd2d4aa351a97d50eb3775d7043b63a29861412735a');
        // container.inspect(function (err, data) {
        //     console.log(data);
        // });
    break;
}
