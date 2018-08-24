/**
 * CLI tool that calls other script according to passed argument commands. Acts as a switcher or adapter to receiving command-line arguments/commands.
 * For managing the the development, build, & testing of this project.
 * USAGE:
 * • ./entrypoint [build|run] entrypointConfigurationPath=./entrypoint/configuration.js entrypointConfigurationKey=[run | install | build | buildContainerManager/buildEnvironmentImage ] dockerImageTag=X dockerhubUser=x dockerhubPass=x [dockerImageName=x]
 */
import operatingSystem from 'os'
import path from 'path'
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '@dependency/parseKeyValuePairSeparatedBySymbol'
const style = { titleCyan: '\x1b[33m\x1b[1m\x1b[7m\x1b[36m', titleGolden: '\x1b[33m\x1b[1m\x1b[7m', message: '\x1b[96m', italic: '\x1b[2m\x1b[3m', default: '\x1b[0m' },
      applicationHostPath = path.normalize(path.join(__dirname, '../../../')), //applicationHostPath - The path of the host machine that is accesible from inside the virtual container. will be used when calling docker-compose from inside 'manager' container to point to the host VM path rather than trying to mount from manager container. as mounting volumes from other container causes issues.
      osUsername = operatingSystem.userInfo().username,
      namedArgs = parseKeyValuePairSeparatedBySymbolFromArray({ array: process.argv }),
      dockerComposeFilePath = path.join(__dirname, `/container/containerDeployment.dockerCompose.yml`); // ['x=y'] --> { x: y }

export function script({ 
    hostScriptPath 
}) {

    console.log(`${style.italic}%s %s${style.default}`, `•[JS script] -`, `Application host path inside container: ${applicationHostPath}`)

    let nodeCommandArgument = process.argv.slice(2)
    let nodeEnvironmentVariable = process.env

    if(!nodeCommandArgument[0]) { // if no arguments supplied, fallback to default command.
        console.log("No command argument passed. Please choose either \"run\" or \"build\" or \"sleep\"")
        process.exit(1)
    } 


    switch (nodeCommandArgument[0]) {
        default:
            // Load the module with the matching name (either a folder module or file with js extension)
            try {
                require( path.join(hostScriptPath, `${nodeCommandArgument[0]}`) )
            } catch (error) {
                console.log(error)
                console.log(nodeCommandArgument[0] + ' command isn`t configured')
            }
        break;
    }
}

