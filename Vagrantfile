
# Ruby code that includes the variables configuration file.
require 'yaml'
current_dir    = File.dirname(File.expand_path(__FILE__))
# import file variables.
allFileVariables = YAML.load_file("#{current_dir}/vagrantVMConfigurations/vagrantfileConfigurationVariables.yaml")
# Global variable - get the variables that are going to be used only.
$configVariables = allFileVariables[allFileVariables['variableSetToBeUsed']]

Vagrant.configure("2") do |config|

  # Vagrant image to build the VM from.
  config.vm.box = "#{$configVariables['vagrantDefaultImage']}"

  # Connect to outside internet, in order to detect docker and docker-compose and install them.
  config.vm.network "public_network"

  # Memory settings:
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
  end

  # forward multiple ports (forward range of ports)
  for i in 80..89
            config.vm.network :forwarded_port, guest: i, host: i
  end
  for i in 8080..8089
            config.vm.network :forwarded_port, guest: i, host: i
  end

  # Shared Folders between Local and VM.
  if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
    config.vm.synced_folder "#{$configVariables['projectSynchedFolderOnLocal']}", "/#{$configVariables['projectSynchedFolderOnVM']}", mount_options: ["dmode=700,fmode=600"]
    config.vm.synced_folder "./", "#{$configVariables['VMConfSynchedFolderOnVM']}", mount_options: ["dmode=700,fmode=600"]
  else
    config.vm.synced_folder "#{$configVariables['projectSynchedFolderOnLocal']}", "/#{$configVariables['projectSynchedFolderOnVM']}"
    config.vm.synced_folder "./", "#{$configVariables['VMConfSynchedFolderOnVM']}"
  end

  # Vagrant caching plugin to allow faster build up from cache, rather than downloading each time (speed up creation of VMs, caches all packages used).
  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
  end

end

# Load VM & Configuration files:
vagrantfiles = %w[continuesDeployment.vagrantMachine.rb]
vagrantfiles.each do |vagrantfile|
  load File.expand_path("./vagrantVMConfigurations/" + vagrantfile) if File.exists?("./vagrantVMConfigurations/" + vagrantfile)
end
