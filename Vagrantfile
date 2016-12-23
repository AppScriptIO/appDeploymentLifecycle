
# Ruby code that includes the variables configuration file.
require 'yaml'
current_dir    = File.dirname(File.expand_path(__FILE__))
# import file variables.
allFileVariables = YAML.load_file("#{current_dir}/vagrantfileConfigurationVariables.yaml")
# get the variables that are going to be used only.
configVariables = allFileVariables[allFileVariables['variableSetToBeUsed']]


Vagrant.configure("2") do |config|

  # Vagrant image to build the VM from.
  config.vm.box = "#{configVariables['vagrantImage']}"

  # Connect to outside internet, in order to detect docker and docker-compose and install them.
  config.vm.network "public_network"

  # forward multiple ports (forward range of ports)
  for i in 80..89
            config.vm.network :forwarded_port, guest: i, host: i
  end
  for i in 8080..8089
            config.vm.network :forwarded_port, guest: i, host: i
  end

  # Shared Folders between Local and VM.
  if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
    config.vm.synced_folder "#{configVariables['projectSynchedFolderOnLocal']}", "/#{configVariables['projectSynchedFolderOnVM']}", mount_options: ["dmode=700,fmode=600"]
    config.vm.synced_folder "./", "#{configVariables['VMConfSynchedFolderOnVM']}", mount_options: ["dmode=700,fmode=600"]
  else
    config.vm.synced_folder "#{configVariables['projectSynchedFolderOnLocal']}", "/#{configVariables['projectSynchedFolderOnVM']}"
    config.vm.synced_folder "./", "#{configVariables['VMConfSynchedFolderOnVM']}"
  end

  # Run shell script
  config.vm.define :dev do |dev|
    # dev.vm.provision :shell, path: "./shellScripts/ansibleInstallation.sh"
    # Execute a shell with passing arguments.
    dev.vm.provision "shell" do |s|
      # Run shell script - Ansible installation.
      s.path = "#{configVariables['shellScriptsFolder']}/ansibleInstallation.sh"
      # Pass as arguments the path to the VM's configuration files inside the VM. So that each subsequent shell script can know the path to be called from.
      # $1 is VMConfSynchedFolderOnVM & $2 is shellScriptsFolder.
      s.args = ["#{configVariables['VMConfSynchedFolderOnVM']}", "#{configVariables['shellScriptsFolder']}"]
    end
    
    # Execute inline shell command - ansible playbook.
    dev.vm.provision :shell,
      inline: "PYTHONUNBUFFERED=1 ansible-playbook \
        #{configVariables['VMConfSynchedFolderOnVM']}/ansible/dev.yml -c local"
  end
    
  # Vagrant caching plugin to allow faster build up from cache, rather than downloading each time (speed up creation of VMs, caches all packages used).
  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
  end

end