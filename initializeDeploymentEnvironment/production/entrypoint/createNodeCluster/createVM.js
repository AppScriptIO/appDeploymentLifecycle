/*
  * Create VMs
  */
export default async function createVM({
  computeVM,
  computeZone,
  vmType,
  zoneName,
  vmName,
  storageDiskName,
  bootImage,
  diskSizeInGb
}) {
  console.group('• Creating VM:')
  // const template = await getVMTemplate({
    //   templateName: 'node-cluster-cpu1',
    //   projectName,
    //   applicationKeyPath
    // })
    // const resource = template.properties // the properties should be apparantely extracted to be used in vm creation.
    const storageDiskURL = `zones/${zoneName}/disks/${storageDiskName}`
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
            sourceImage: bootImage,
            diskSizeGb: diskSizeInGb
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
      
    let vmURL;
    try {
      let data = await computeZone.createVM(vmName, vmConfig)
      const vm = data[0];
      const apiResponse = data[2];
      const operation = data[1];
      await operation.promise() // long running operation
      vmURL = apiResponse.targetLink    
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
          vmURL = vm[0].metadata.selfLink // get server defined resource url        
        } catch (secondError) {
          // throw error
        }
      }
      // console.log(error)
    }
  
    console.log(`VM resource URL is ${vmURL}`)
    console.groupEnd()
    return vmURL
  }
  