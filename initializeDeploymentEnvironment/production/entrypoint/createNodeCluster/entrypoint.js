/*
 * Uses environment variable to point to the key for Google Cloud authentication.
 * https://cloud.google.com/nodejs/docs/reference/compute/0.9.x/Address#create
 * https://cloud.google.com/compute/docs/reference/latest/instances
 * https://cloud.google.com/sdk/gcloud/reference/compute/instances/create
 * Paths to resources as defined by GCloud server are present in the api documentation on top - e.g. https://cloud.google.com/compute/docs/reference/latest/subnetworks/get
 */
import filesystem from 'fs'
import path from 'path'
import EventEmitter from 'events'
import sshModule from 'node-ssh' // https://www.npmjs.com/package/node-ssh
import { spawn, spawnSync, execSync, exec } from 'child_process'
import { getVMTemplate, getVM, addAccessConfig } from './googleapis.js'
import Compute from '@google-cloud/compute'
const projectName = 'szn-webapps', 
      applicationKeyPath = '/project/key/szn-webapps-bf289213ce2e.json',
      sshPrivateKeyPath = '/project/key/google_compute_engine'

const compute = new Compute({
  projectId: projectName,
  keyFilename: applicationKeyPath
})
const regionName = 'europe-west1',
      storageDiskName = 'datadisk-1',
      zoneName = `${regionName}-c`,
      vmName = 'vm-cluster-1',
      zone = compute.zone(zoneName),
      region = compute.region(regionName),
      computeVM = zone.vm(vmName)

;(async () => {

  /*
   * Create necessary Google Cloud address, ports, vms, firewall rules, etc.
   */
  let address = await createStaticAddress()
  console.log(`External reserved address is ${address}`)
  let vmURL = await createVM({vmType: 'n1-standard-1'})
  console.log(`VM resource URL is ${vmURL}`)
  await assignStaticIPToVM({ addressIP: address })
  await openPort()

  await new Promise(resolve => setTimeout(resolve, 5000))
  
  const privateKeyPath = sshPrivateKeyPath
  const ssh = new sshModule()
  await ssh.connect({
    host: '35.195.72.82',
    port: '22',
    username: process.env.sshUsername,
    privateKey: privateKeyPath,
    readyTimeout: 120000
  })

  //add server NFS storage
  await ssh.execCommand(`sudo mkdir -p /mnt/${storageDiskName}
    # list mounted disks:
    ls /dev/disk/by-id
    # CAREFUL: format to required type:
    # sudo mkfs.ext4 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/disk/by-id/google-$DISK
    # mount
    sudo mount -o discard,defaults /dev/disk/by-id/google-${storageDiskName} /mnt/${storageDiskName}
    # Configure read and write access
    sudo chmod a+w /mnt/${storageDiskName}
    # Automatically mount when restarted: if 'nofail' doesn't work use 'nobootwait' option. If the string doesn't exist already in the machine
    # Startup config file for partition mounting.
    startupMountFile=/etc/fstab
    # check if startup configuration is written in file
    if ! grep -q '${storageDiskName}' $startupMountFile ; then
        echo "Dist mount on restart string is being added."
        # Unique partition ID
        partitionID=$(sudo blkid -s UUID -o value /dev/disk/by-id/google-${storageDiskName})
        echo UUID=$partitionID /mnt/${storageDiskName} ext4 discard,defaults,nofail 0 2 | sudo tee -a $startupMountFile
    fi
    # to execute fstab (startupMountFile) without restart use "sudo mount -a"
    cat $startupMountFile`)
  .then(output => { console.log(output.stdout) })

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

  await provisionVMCluster({address})

  // TODO: Update cloud DNS external ip for all domains.
  // this should deploy apps to the server.

})()

async function provisionVMCluster({address}) {
  const privateKeyPath = sshPrivateKeyPath
  const ssh = new sshModule()
  await ssh.connect({
    host: '35.195.72.82',
    port: '22',
    username: process.env.sshUsername,
    privateKey: privateKeyPath,
    readyTimeout: 120000
  })
  
  //Fix issue with starting remote docker deomon
  let errorFoundEvent = new EventEmitter()
  errorFoundEvent.on('specificErrorFound', async () => { 
    console.log('• Fixing remote docker deamon')
    await fixCompatibilityIssueWithDockerMachine()
  })
  // IMPORTANT - The next commands should be triggered in the middle of 
  async function fixCompatibilityIssueWithDockerMachine() {
    let dockerMachineConfigurationFile = '/etc/systemd/system/docker.service.d/10-machine.conf'
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
    await ssh.execCommand(`sudo sed -i 's/--storage-driver aufs//g' ${dockerMachineConfigurationFile}`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
    await ssh.execCommand(`sudo systemctl daemon-reload`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
    await ssh.execCommand(`sudo systemctl -f start docker`).then(output => { if(output.code>0) console.log(output.stderr) })
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
  
  {
    let childProcess = spawn(`docker-machine`, 
      // [`--debug ls`], 
      [`create --driver generic --generic-ip-address=${address} --generic-ssh-user=${process.env.sshUsername} --generic-ssh-key="${privateKeyPath}" ${vmName}`], 
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
  }

  {
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
  }
  
  await fixCompatibilityIssueWithDockerMachine()
  
  await new Promise(resolve => setTimeout(resolve, 5000))

  await ssh.dispose(); console.log('• Closed ssh connection') // close connection
  
  {
    let childProcess = exec(`docker-machine env ${vmName}; docker-machine ls; docker swarm init --advertise-addr ${address}`, 
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
  }

  process.exit(0)
}

async function createStaticAddress() {
  console.log('• Reserving static address.')
  // Create static ip address
  const addressName = 'node-cluster-external-ip'
  const computeAddress = region.address(addressName)
  try {
    let data = await computeAddress.create()
    const address = data[0];
    const operation = data[1];
    const apiResponse = data[2];
    await operation.promise() // long running operation
    let externalIP = (await computeAddress.get())[0].metadata.address
    let iteration = 0
    while(externalIP == undefined && iteration < 5) {
      console.log('Waiting: Trying to retrieve external IP address again...')
      await new Promise(resolve => setTimeout(resolve, 5000))
      externalIP = (await computeAddress.get())[0].metadata.address
      iteration++
    }
    if(externalIP == undefined) throw 'SZN - external IP is undefined, tried to retrive it from address resource, but it is still not assigned.'
    return externalIP // external IP
    // return apiResponse.targetLink // url link of resource
  } catch (error) {
    if(error.code == 409) {
      try {
        let address = await computeAddress.get()
        return address[0].metadata.address // external IP
        // return address[0].metadata.selfLink // get server defined resource url
      } catch (secondError) { // if other than the address already exist
        throw error
      }
    }
    throw error
  }
}

/*
  * Create VMs
  */
async function createVM({ vmType }) {
  console.log('• Creating VM.')

  // const template = await getVMTemplate({
  //   templateName: 'node-cluster-cpu1',
  //   projectName,
  //   applicationKeyPath
  // })
  // const resource = template.properties // the properties should be apparantely extracted to be used in vm creation.
  const storageDiskURL = `zones/${zoneName}/disks/${storageDiskName}`
  const bootImage = 'projects/debian-cloud/global/images/debian-9-stretch-v20171213'
  const vmConfig = {
    machineType: vmType,
    http: true,
    https: true,
    tags: ['docker-machine', 'docker-swarm', 'https-server', 'http-server'],
    disks: [
      { // boot image disk.
        boot: true,
        autoDelete: false,
        initializeParams: {
          sourceImage: bootImage
        }
      },
      { // attached disk
        source: storageDiskURL, // url format https://cloud.google.com/compute/docs/reference/latest/
        autoDelete: false,
        boot: false,
        deviceName: storageDiskName // the device will be referenced in the vm as "google-${storageDiskName}"
      }
    ], 
  }

  try {
    let data = await zone.createVM(vmName, vmConfig)
    const vm = data[0];
    const apiResponse = data[2];
    const operation = data[1];
    await operation.promise() // long running operation
    return apiResponse.targetLink    
  } catch (error) {
    if(error.code == 409) {
      // // get vm using googleapis
      // // const vm = await getVM({
      // //   vmName: 'vm-cluster-1',
      // //   projectName,
      // //   applicationKeyPath, 
      // // })
      // // console.log(vm)      
      try {
        let vm = await computeVM.get()
        return vm[0].metadata.selfLink // get server defined resource url        
      } catch (secondError) {
        throw error
      }
    }
    throw error
  }
}

async function assignStaticIPToVM({ addressIP }) {
  console.log('• Assigning static ip to VM.')

  let accessConfigData = {
    "kind": "compute#accessConfig",
    "type": "ONE_TO_ONE_NAT",
    "name": "External NAT",
    "natIP": addressIP
  }

  await addAccessConfig({
    vmName,
    zoneName,
    projectName,
    applicationKeyPath, 
    accessConfigData
  })

  // let vmNetworkInterfaces = (await computeVM.getMetadata())[0].networkInterfaces[0]
  // console.log(vmNetworkInterfaces)
}

/*
  * Open required ports
  */
async function openPort() {
  console.log('• Openning ports.')

    /*
   * Create Firewall rules
   */
  await compute.firewall('docker-swarm').create({
    description: 'Allow swarm to work.',
    targetTags: [ 'docker-swarm' ], 
    allowed: [
      { IPProtocol: 'tcp', ports: ['2377'] },
      { IPProtocol: 'tcp', ports: ['7946'] },
      { IPProtocol: 'tcp', ports: ['4789'] },
      { IPProtocol: 'udp', ports: ['7946'] },
      { IPProtocol: 'udp', ports: ['4789'] },
    ]
  }).catch(error => { 
    if(error.code == 409) { console.log(error.message); return }
    throw error
  })
  await compute.firewall('default-allow-http').create({
    description: 'Allow port 80.',
    targetTags: [ 'http-server' ], 
    allowed: [ { IPProtocol: 'tcp', ports: ['80'] } ]
  }).catch(error => { 
    if(error.code == 409) { console.log(error.message); return }
    throw error
  })
  await compute.firewall('default-allow-https').create({
    description: 'Allow port 443.',
    targetTags: [ 'https-server' ], 
    allowed: [ { IPProtocol: 'tcp', ports: ['443'] } ]
  }).catch(error => { 
    if(error.code == 409) { console.log(error.message); return }
    throw error
  })
  await compute.firewall('redbird-proxy').create({
    description: 'Allow 3000 - used for Letsencrypt challenge for identity confirmation.',
    targetTags: [ 'docker-machine' ], 
    allowed: [ { IPProtocol: 'tcp', ports: ['3000'] } ]
  }).catch(error => { 
    if(error.code == 409) { console.log(error.message); return }
    throw error
  })
  await compute.firewall('jenkins-server').create({
    description: 'Allow 50000 used for jenkins agent server communication.',
    targetTags: [ 'docker-machine' ], 
    allowed: [ { IPProtocol: 'tcp', ports: ['50000'] } ]
  }).catch(error => { 
    if(error.code == 409) { console.log(error.message); return }
    throw error
  })
}