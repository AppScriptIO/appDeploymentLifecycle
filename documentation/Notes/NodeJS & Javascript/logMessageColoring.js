{
  const message_prefix = `\x1b[3m\x1b[2m•[${path.basename(__filename)} JS script]:\x1b[0m`
  console.group(`%s \x1b[33m%s\x1b[0m`, `${message_prefix}`, `ƒ container manager - container with volumes & requested entrypoint script`)
}

{
  const message_prefix = `\x1b[3m\x1b[2m•[${path.basename(__filename)} JS script]:\x1b[0m`
  console.group(`%s \x1b[33m%s\x1b[0m`, `${message_prefix}`, `ƒ run - container with volumes`)
  console.log(`%s \n %s \n %s`, `\x1b[3m\x1b[2m > docker run\x1b[0m`, `\t\x1b[3m\x1b[2mimage:\x1b[0m ${image}`, `\t\x1b[3m\x1b[2mcommand:\x1b[0m ${containerCommand}`)
  console.groupEnd()
}

{
  const message_prefix = `\x1b[3m\x1b[2m•[${path.basename(__filename)} JS script]:\x1b[0m`
  console.group(`%s \x1b[33m%s\x1b[0m`, `${message_prefix}`, `ƒ build`)
  console.log(
    `%s \n %s \n %s \n %s \n %s `,
    `\x1b[3m\x1b[2m > ${processCommand} up \x1b[0m`,
    `\t\x1b[3m\x1b[2mimage:\x1b[0m ${dockerImage}`,
    `\t\x1b[3m\x1b[2mdockerComposeYmlPath:\x1b[0m ${dockerComposeFilePath}`,
    `\t\x1b[3m\x1b[2mserviceName:\x1b[0m ${serviceName}`,
    `\t\x1b[3m\x1b[2mprojectName:\x1b[0m ${projectName}`,
  )
  console.log(
    `%s \n %s \n %s`,
    `\x1b[3m\x1b[2m > docker-compose down\x1b[0m \x1b[3m\x1b[2m(stop  running containers) output\x1b[0m`,
    `\t\x1b[3m\x1b[2mfile path:\x1b[0m ${dockerComposeFilePath}`,
    `\t\x1b[3m\x1b[2mprojectName:\x1b[0m ${projectName}`,
  )
  console.groupEnd()
}
