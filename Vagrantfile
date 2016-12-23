Vagrant.configure("2") do |config|

  # Vagrant image to build the VM from.
  config.vm.box = "williamyeh/ubuntu-trusty64-docker"

  # Connect to outside internet, in order to detect docker and docker-compose and install them.
  config.vm.network "public_network"

  # forward multiple ports (forward range of ports)
  for i in 80..89
            config.vm.network :forwarded_port, guest: i, host: i
  end
  for i in 8080..8089
            config.vm.network :forwarded_port, guest: i, host: i
  end

  if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
    config.vm.synced_folder "./../", "/project", mount_options: ["dmode=700,fmode=600"]
    config.vm.synced_folder "./", "/vagrant", mount_options: ["dmode=700,fmode=600"]
  else
    config.vm.synced_folder "./../", "/project"
    config.vm.synced_folder "./", "/vagrant"
  end
  
end