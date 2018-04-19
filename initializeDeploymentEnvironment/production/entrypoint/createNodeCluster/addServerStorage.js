export default async ({
    ssh,
    storageDiskName
}) => {
    console.group('• Add server NFS storage')
    await ssh.execCommand(
        `sudo mkdir -p /mnt/${storageDiskName}
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
    .then(output => { 
        console.log(output.stdout) 
    })
    console.groupEnd()
}
