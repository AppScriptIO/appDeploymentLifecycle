/*
* Uses environment variable to point to the key for Google Cloud authentication.
*/
import { getVMTemplate } from './vmTemplate.js'
import Compute from '@google-cloud/compute'
const projectName = 'szn-webapps', 
      applicationKeyPath = '/project/key/szn-webapps-2cebc5522d5b.json'

;(async () => {

  // const template = await getVMTemplate({
  //   templateName: 'node-cluster-cpu1',
  //   projectName,
  //   applicationKeyPath
  // })
  // const resource = template.properties // the properties should be apparantely extracted to be used in vm creation.

  const compute = new Compute({
    projectId: projectName,
    keyFilename: applicationKeyPath
  })
  
  const zone = compute.zone('europe-west1-c'), 
        vmName = 'vm-cluster-1',
        vmConfig = {
          machineType: 'n1-standard-1',
          http: true,
          https: true,
          tags: ['docker-machine', 'https-server', 'http-server'],
          disks: [
            { // boot image disk.
              boot: true,
              autoDelete: false,
              initializeParams: {
                sourceImage: 'projects/debian-cloud/global/images/debian-9-stretch-v20171213'
              }
            },
            { // attached disk
              source: 'zones/europe-west1-c/disks/datadisk-1', // url format https://cloud.google.com/compute/docs/reference/latest/
              autoDelete: false,
              boot: false
            }
          ]
        }
  
  zone
    .createVM(vmName, vmConfig)
    .then((data) => {
      const vm = data[0];
      const operation = data[1];
      const apiResponse = data[2];
      console.log(data)
    })


})()
