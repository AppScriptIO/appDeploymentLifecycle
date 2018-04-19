import EventEmitter from 'events'
import filesystem from 'fs'
import path from 'path'
import { spawn, spawnSync, execSync, exec } from 'child_process'

/*  
* Provision machine with docker and initialize cluster manager.
*/
// https://cloud.google.com/compute/docs/instances/connecting-to-instance#sshingcloud
// gcloud compute ssh <vmName> // create ssh keys automatically using gcloud - will produce the keys in .ssh folder.
// docker-machine create --driver generic --generic-ip-address=<IP> --generic-ssh-user=<user> --generic-ssh-key=<id_rsa or google_compute_engine> <vmName>
// IMPORTANT - issue in windows when calling docker-machine from host the path should be "c:/Users/<user>/.ssh/id_rsa" not "/c/Users/<user>/.ssh/id_rsa"
// IMPORTANT - If a machine is failling and showing error after trying to add it locally on host, it shouldn't be removed as doing so removes the cloud instance also, therefore reconfiguring by deleting the related folder in the ~/.docker/machines .
// Docker --driver google : used for creating provisionning vms if doesn't exist.
// Docker --driver generic : for adding & provisioning existing vms or creatng new vm & provision.
// docker with google driver when creating vms assigns user for ssh as "docker-user" (not sure about this one), but the "gcloud compute ssh <vm>" should be called again to provision the newlly created vm with the necessary ssh to use e.g. google_compute_engine.
// while creating ssh for existing vms using "gcloud compute ssh <vm>" assigns the host os username as ssh user.

//[1] machine created using gcloud api
//[2] gcloud compute ssh vm // to produce ssh keys
//[3] docker-machine create --driver generic --generic-ip-address=<> --generic-ssh-user=<windowsUser> --generic-ssh-key="c:/Users/<user>/.ssh/google_compute_engine" vm
//[4] docker-machine provision vm
//[5] fix issues with docker starting command: https://github.com/docker/machine/issues/4166 https://github.com/docker/machine/issues/4156#issuecomment-311955380 
//    $ nano /etc/systemd/system/docker.service.d/10-machine.conf
//    change "--storage-driver aufs" to "--engine-storage-driver=overlay2"
//    $ sudo systemctl daemon-reload
//    $ sudo systemctl -f start docker
//[6] initialize cluster

export default async function provisionVMCluster({
    ssh, // connected ssh
    externalIpAddress,
    sshPrivateKeyPath,
    vmName
}) {
    console.group('• Provisioning VM Cluster:')

    //Fix issue with starting remote docker deomon
    // let errorFoundEvent = new EventEmitter()
    // errorFoundEvent.on('specificErrorFound', async () => {
    //   await fixCompatibilityIssueWithDockerMachine({ ssh }) FIX CALL 1/2
    // })
    
    await addVMToHost({ externalIpAddress, sshPrivateKeyPath, vmName })

    await provisionVMWithDocker({ vmName })
    
    // await fixCompatibilityIssueWithDockerMachine({ ssh }) // FIX CALL 2/2
    
    await new Promise(resolve => setTimeout(resolve, 5000))
  
    // await ssh.dispose(); console.log('• Closed ssh connection') // close connection
    
    await initializeDockerSwarm({ vmName, externalIpAddress })

    console.groupEnd()
}


async function addVMToHost({ externalIpAddress, sshPrivateKeyPath, vmName }) {
  /*** Add VM to container 
   * FOR WINDOWS directly use - $ docker-machine ... --generic-ssh-key="C:/Users/<user>/.ssh/google_compute_engine" ....
  */
  console.group('• Add VM to host docker-machine list:')

  let childProcess = spawn(`docker-machine`, 
    // [`--debug ls`], 
    [
      `create --driver generic --generic-ip-address=${externalIpAddress}`,
      `--generic-ssh-user=${process.env.sshUsername} --generic-ssh-key="${sshPrivateKeyPath}"`,
      `--engine-storage-driver overlay2`, // fixes issue with docker and debian 9 - in which using storage driver "aufs" causes docker startup failures
      `${vmName}`
    ], 
    {
      shell: true,
      // stdio: [0, 1, 2],
      detached: true,
      setsid: true,
      env: process.env // Without passing the environment variables the following issue will be thrown - IMPORTATNT ISSUE - causes issue when executed through nodejs child process - "Driver generic not found. Do you have the plugin binary accessible in your PATH?" 
    }
  )
  
  childProcess.stdout.on('data', (data) => {
    let searchForErrorText = 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?'
    // if(data.toString().search(searchForErrorText) >= 0) errorFoundEvent.emit('specificErrorFound')
    if(data.toString().search(searchForErrorText) >= 0) {
      console.log('• Killing process 1.')
      process.kill(-childProcess.pid)
    }
    console.log(`stdout: ${data}`)
  })

  childProcess.stderr.on('data', data => console.log(data.toString()))
  // wait till process finishes.
  await new Promise((resolve, reject) => {
    childProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`)
      // importatnt - because the file which is fixed '/etc/systemd/system/docker.service.d/10-machine.conf' get changed second time in step where docker reconfigures remote daemon //
      if(code > 0) {}
      resolve()
    })
  })

  console.groupEnd()
}

async function initializeDockerSwarm({ vmName, externalIpAddress }) {
  console.group('• Initialize docker swarm:')
  // TODO: fix issue - stdout: The default lines below are for a sh/bash shell, you can specify the shell you're using, with the --shell flag.
  let childProcess = exec(`docker-machine env ${vmName}; docker-machine ls; docker swarm init --advertise-addr ${externalIpAddress}`, 
    {
      shell: true,
      stdio: [0, 1, 2],
      detached: true,
      setsid: true,
      env: process.env // Without passing the environment variables the following issue will be thrown - IMPORTATNT ISSUE - causes issue when executed through nodejs child process - "Driver generic not found. Do you have the plugin binary accessible in your PATH?" 
    }
  )
  childProcess.stdout.on('data', (data) => {
    let searchForErrorText = 'Error response from daemon'
    if(data.toString().search(searchForErrorText) >= 0) {
      console.log('• Killing process 3.')
      process.kill(-childProcess.pid)
    }
    console.log(`stdout: ${data}`)
  })
  childProcess.stderr.on('data', data => console.log(data.toString()))
  // wait till process finishes.
  await new Promise((resolve, reject) => {
    childProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`)
      // importatnt - because the file which is fixed '/etc/systemd/system/docker.service.d/10-machine.conf' get changed second time in step where docker reconfigures remote daemon //
      if(code > 0) {}
      resolve()
    })
  })
  console.groupEnd()
}

async function provisionVMWithDocker({ vmName }) {
  console.group('• Provision using docker-machine provision command: ')
  let childProcess = spawn(`docker-machine`, 
    [`provision ${vmName}`], 
    {
      shell: true,
      detached: true,
      setsid: true,
      // stdio: [0, 1, 2],
      env: process.env // Without passing the environment variables the following issue will be thrown - IMPORTATNT ISSUE - causes issue when executed through nodejs child process - "Driver generic not found. Do you have the plugin binary accessible in your PATH?" 
    }
  )
  childProcess.stdout.on('data', (data) => {
    let searchForErrorText = 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?'
    // if(data.toString().search(searchForErrorText) >= 0) errorFoundEvent.emit('specificErrorFound')
    if(data.toString().search(searchForErrorText) >= 0) {
      console.log('• Killing process 2.')
      process.kill(-childProcess.pid)
    }
    console.log(`stdout: ${data}`)
  })
  childProcess.stderr.on('data', data => console.log(data.toString()))
  // wait till process finishes.
  await new Promise((resolve, reject) => {
    childProcess.on('close', async (code) => {
      console.log(`child process exited with code ${code}`)
      // importatnt - because the file which is fixed '/etc/systemd/system/docker.service.d/10-machine.conf' get changed second time in step where docker reconfigures remote daemon //
      if(code > 0) {}
      resolve()
    })
  })
  console.groupEnd()
}

// Fix issue - Change docker daemon storage driver from 'aufs' to OverlayFS (either "overlay" or "overlay2")
async function fixCompatibilityIssueWithDockerMachine({ ssh }) {
    console.group('• Fixing remote docker daemon - changing daemon storage driver')

    let dockerMachineConfigurationFile = '/etc/systemd/system/docker.service.d/10-machine.conf' // file that holds the docker storage driver configuration.
    let i = 0
    let checkIfFileExists = async (file) => {
        let output = await ssh.execCommand(`[ -f "${file}" ] && echo true || echo false`)
        return JSON.parse(output.stdout) // change true/false string to boolean
    }
    let fileExists = await checkIfFileExists(dockerMachineConfigurationFile)
    while(!fileExists && i < 10) {
        console.log(`Waiting for retry - Cannot find ${dockerMachineConfigurationFile}`)
        await new Promise(resolve => setTimeout(resolve, 5000))
        fileExists = await checkIfFileExists(dockerMachineConfigurationFile)
        i++ 
    }

    // remove '--storage-driver aufs' from file - this section causes issues on docker startup (i.e. use the default overlay storga driver )
    await ssh.execCommand(`sudo sed -i 's/--storage-driver aufs//g' ${dockerMachineConfigurationFile}`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
    // restart docker daemon
    await ssh.execCommand(`sudo systemctl daemon-reload`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
    await ssh.execCommand(`sudo systemctl -f start docker`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.groupEnd()
}
  