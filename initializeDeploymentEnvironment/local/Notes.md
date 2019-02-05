# Locally on host machine in case of using "Docker for Windows"
• ssh into hyper-v MobyLinuxVM : https://blog.jongallant.com/2017/11/ssh-into-docker-vm-windows/
• install docker-windows-volume-watcher to allow inotify events to be triggered in linux container when host files mounted changes
    http://blog.subjectify.us/miscellaneous/2017/04/24/docker-for-windows-watch-bindings.html
• 


Steps: 
• Run docker for windows
• Run "docker-volume-watcher *node* -v"
• Run container manager

____

- Handling line endings on Windows for git, preventing false modified status for git repos because of line endings: 
    
```
        git config --global core.autocrlf true
        # Configure Git on Windows to properly handle line endings
```

- 

