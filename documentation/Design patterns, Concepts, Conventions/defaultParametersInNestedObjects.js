/* A pattern for allowing nested object to be used as parameters with ability to assign default values: 
 * Disclaimer this technique may miss some use cases where assigning a nested property, without the others, causes overriding defaults.
 * example taken from - https://github.com/AppScriptIO/javascriptTestRunner/blob/d8a1c9ccbd5c836a1cf55bccbb5736dcca134137/source/clientInterface/commandLine.js#L30
 */

function unitTest(input) {
    let configuration, container = {}, nodeFlag = {}, testRunnerModulePath, testPath, applicationPathOnHostMachine;
    ({
        configuration,
        container = {
            imageName: container.imageName = namedArgs.imageName || process.env.imageName || configuration.dockerImageName,
            ymlFile: container.ymlFile = `${appDeploymentLifecyclePath}/deploymentContainer/deployment.dockerCompose.yml`,
        },
        nodeFlag = {
            debug: nodeFlag.debug = process.argv.includes('debug'),
            break: nodeFlag.break = process.argv.includes('break')
        },
        testRunnerModulePath = javascriptTestRunnerPath, // path of the module that includes the test framework.
        testPath = namedArgs['path'] || configuration.directory.testPath, // path to test directory.
        applicationPathOnHostMachine = process.env.applicationPathOnHostMachine || path.join(configuration.directory.projectPath, 'application') // this path should be already resolved to Unix path from Windows path including the drive letter, which will be used in MobyLinuxVM.
    } = input) // destructure nested objects to the object properties themselves.
    
}

