const regionName = 'europe-west1',
      zoneName = `${regionName}-c`;

export default {
    projectName: 'szn-webapps', 
    applicationKeyPath: '/project/key/szn-webapps-bf289213ce2e.json',
    sshPrivateKeyPath: '/project/key/google_compute_engine',
    vmName: 'vm-cluster-1',
    vmType: 'n1-standard-1',
    storageDiskName: 'datadisk-1',
    regionName,
    zoneName,
    addressName: 'node-cluster-external-ip',
    bootImage: 'projects/debian-cloud/global/images/debian-9-stretch-v20180401',
    diskSizeInGb: 20
}