import { addAccessConfig } from './googleapis.js'

export default async function assignStaticIPToVM({
    externalAddressIP,
    vmName,
    zoneName,
    projectName,
    applicationKeyPath
}) {
    console.group('• Assigning static ip to VM.')
  
    let accessConfigData = {
      "kind": "compute#accessConfig",
      "type": "ONE_TO_ONE_NAT",
      "name": "External NAT",
      "natIP": externalAddressIP
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
    console.groupEnd()
}
  