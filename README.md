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
