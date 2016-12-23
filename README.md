# AppDeliveryConfigurations
Responsible for DevOps configurations - added to other respiratories.

Use:  

  • cd AppDeliveryConfigurations

  • vagrant up 
  
  • vagrant ssh 
  
  • cd /project


Then the docker or docker-compose command can be used to build and run the app.


________


To add this respiratory as a submodule use CLI not desktop app: 

  • git submodule add https://github.com/myuseringithub/AppDeliveryConfigurations.git AppDeliveryConfigurations
  
  • git submodule init
  
  • git submodule update
  
  • git commit -m "Added AppDeliveryConfigurations submodule"
  
  • git push
  
  
http://stackoverflow.com/questions/3336995/git-will-not-init-sync-update-new-submodules

_______

Ansible - Manages VMs and installs required packages, e.g. docker, docker-compose, etc.

Vagrantfile - specifies the base VM machine image from vagrant respiratory, and shell commands to run after VM is running, e.g. *.sh files (like ansible installation), runs anisble playbook to install dependencies like docker, docker-compose.

vagrantfileConfigurationVariables.yaml - Gets Imported into Vagrantfile as variables. Allows for applying different parameters when needed.

_______

Extra packages used: 
  • vagrant plugin install vagrant-cachier
