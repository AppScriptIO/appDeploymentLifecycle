# vagrant client
Vagrant.configure('2') do |config|
  # Continues Deployment VMachine.
  config.vm.define :continuesDeployment do |cd|
    cd.vm.box = "#{$configVariables['vagrantDefaultImage']}"
    cd.vm.hostname = "continuesDeployment"
    cd.vm.network "private_network", ip: "192.168.0.2"

    # Run shell script
    # dev.vm.provision :shell, path: "./shellScripts/ansibleInstallation.sh"
    # Execute a shell with passing arguments.
    cd.vm.provision "shell" do |s|
      # Run shell script - Ansible installation.
      s.path = "#{$configVariables['shellScriptsFolder']}/ansibleInstallation.sh"
      # Pass as arguments the path to the VM's configuration files inside the VM. So that each subsequent shell script can know the path to be called from.
      # $1 is VMConfSynchedFolderOnVM & $2 is shellScriptsFolder.
      s.args = ["#{$configVariables['VMConfSynchedFolderOnVM']}", "#{$configVariables['shellScriptsFolder']}"]
    end
    
    # Execute inline shell command - ansible playbook.
    cd.vm.provision :shell,
      inline: "PYTHONUNBUFFERED=1 ansible-playbook \
        #{$configVariables['VMConfSynchedFolderOnVM']}/ansible/continuesDevelopment.yml -c local"
  end
end
