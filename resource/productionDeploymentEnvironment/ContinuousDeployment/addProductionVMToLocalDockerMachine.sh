
### This will add the vm in the 'docker-machine' list and allow for docker engine connections or ssh.
# IMPORTANT NOT WORKING - will cause the provisionning of the remote machine which changs configuration and issues arise because of the bug in docker-machine provisionning compatibility
# Usage: ./addProductionVMToLocalDockerMachine.sh address= vmName=

OSUsername=$(whoami)
keyPath="c:/Users/$OSUsername/.ssh"
privateKeyPath="$keyPath/google_compute_engine"

run() {
    docker-machine create --driver generic --generic-ip-address=${address} --generic-ssh-user=${OSUsername} --generic-ssh-key="${privateKeyPath}" ${vmName}

    # after which should fix issue with docker compatibility configuration (side effect of docker-machine create/provision)
    sudo sed -i 's/--storage-driver aufs//g' /etc/systemd/system/docker.service.d/10-machine.conf
    sudo systemctl daemon-reload
    sudo systemctl -f start docker
}


if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default
    echo 'Shell Script • No arguments were passed, arguments are required to execute the commands. Pattern of args: "key=value" pairs'
else

    # Export arguments  
    for ARGUMENT in "${@:1}"; do # iterate over arguments, skipping the first.
        KEY=$(echo $ARGUMENT | cut -f1 -d=); VALUE=$(echo $ARGUMENT | cut -f2 -d=);
        case "$KEY" in
                address)     address=${VALUE}; export address ;;
                vmName)         vmName=${VALUE}; export vmName ;;
                *)
        esac
    done

    if [[ $1 != *"="* ]]; then # if first argument is a command, rather than a key-value pair.
        echo 'Shell Script • Command as argument passed.'
        # run first argument as function.
        $@ # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
    else
        echo 'Shell Script • Key-Value arguments passed.'
        run
    fi

fi
