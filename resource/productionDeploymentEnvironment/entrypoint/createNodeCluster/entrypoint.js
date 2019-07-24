/*
 * Uses environment variable to point to the key for Google Cloud authentication.
 * https://cloud.google.com/nodejs/docs/reference/compute/0.9.x/Address#create
 * https://cloud.google.com/compute/docs/reference/latest/instances
 * https://cloud.google.com/sdk/gcloud/reference/compute/instances/create
 * Paths to resources as defined by GCloud server are present in the api documentation on top - e.g. https://cloud.google.com/compute/docs/reference/latest/subnetworks/get
 */
import sshModule from 'node-ssh' // https://www.npmjs.com/package/node-ssh
import Compute from '@google-cloud/compute'

import config from './configuration.js'
import { getVMTemplate, getVM, addAccessConfig } from './googleapis.js'
import reserveStaticIpAddress from './reserveStaticIpAddress.js'
import createVM from './createVM.js'
import assignStaticIPToVM from './assignStaticIP.js' 
import openPort from './openPorts.js'
import addServerStorage from './addServerStorage.js'
import provisionVMCluster from './provisionCluster.js'

const compute = new Compute({ projectId: config.projectName, keyFilename: config.applicationKeyPath }),
      computeZone = compute.zone(config.zoneName),
      computeRegion = compute.region(config.regionName),
      computeVM = computeZone.vm(config.vmName),
      computeAddress = computeRegion.address(config.addressName)

/* Create necessary Google Cloud address, ports, vms, firewall rules, etc. */
;(async () => {
  let externalIpAddress;
  externalIpAddress = await reserveStaticIpAddress({ computeAddress })

  let vmURL = await createVM({
    computeZone,
    computeVM,
    zoneName: config.zoneName,
    vmName: config.vmName,
    vmType: config.vmType,
    storageDiskName: config.storageDiskName,
    bootImage: config.bootImage,
    diskSizeInGb: config.diskSizeInGb
  })

  await new Promise(resolve => setTimeout(resolve, 5000))

  await assignStaticIPToVM({
    externalAddressIP: externalIpAddress,
    vmName: config.vmName,
    zoneName: config.zoneName,
    projectName: config.projectName,
    applicationKeyPath: config.applicationKeyPath
  })

  await openPort({ compute })

  await new Promise(resolve => setTimeout(resolve, 20000))
  
  // if authentication failes or refused connection run - 
  // IMPORTANT:   gcloud auth application-default login
  // to generate keys
  // then execut: gcloud auth application-default print-access-token
  console.group('• Connecting through SSH')
  externalIpAddress = externalIpAddress || 'x.x.x.x' // for debugging - incase above code is commeted out 
  const ssh = new sshModule()
  await ssh.connect({
    host: externalIpAddress,
    port: '22',
    username: process.env.sshUsername,
    privateKey: config.sshPrivateKeyPath,
    readyTimeout: 120000
  }).catch(error => { throw error }).then(() => { console.log('SSH Connection successful') })
  
  await addServerStorage({ ssh })

  await provisionVMCluster({
    ssh,
    externalIpAddress,
    sshPrivateKeyPath: config.sshPrivateKeyPath,
    vmName: config.vmName
  })

  // TODO: Update cloud DNS external ip for all domains.
  // this should deploy apps to the server.

  ssh.dispose(); console.log('• Closed ssh connection'); console.groupEnd() // close connection to end container process
  process.exit(0)
})()





