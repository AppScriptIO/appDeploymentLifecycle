// Create static ip address
export default async function createStaticAddress({
  computeAddress
}) {
    console.group('• Reserving static address.')
    let externalIP;
    try {
      let data = await computeAddress.create()
      const address = data[0];
      const operation = data[1];
      const apiResponse = data[2];
      await operation.promise() // long running operation
      externalIP = (await computeAddress.get())[0].metadata.address
      let iteration = 0
      while(externalIP == undefined && iteration < 5) {
        console.log('Waiting: Trying to retrieve external IP address again...')
        await new Promise(resolve => setTimeout(resolve, 5000))
        externalIP = (await computeAddress.get())[0].metadata.address
        iteration++
      }
      if(externalIP == undefined) throw 'SZN - external IP is undefined, tried to retrive it from address resource, but it is still not assigned.'
      // return apiResponse.targetLink // url link of resource
    } catch (error) {
      if(error.code == 409) {
        try {
          let address = await computeAddress.get()
          externalIP = address[0].metadata.address // external IP
          // return address[0].metadata.selfLink // get server defined resource url
        } catch (secondError) { // if other than the address already exist
          // throw error
        }
      }
      // console.log(error)
    }
    
    console.log(`External reserved address is ${externalIP}`)
    console.groupEnd()
    return externalIP
}
  