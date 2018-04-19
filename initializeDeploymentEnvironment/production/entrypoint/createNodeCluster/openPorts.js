/*
  * Open required VM ports
  */
 export default async function openPort({ compute }) {
    console.group('• PORTS - Openning ports.')
  
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
    console.groupEnd()
  }