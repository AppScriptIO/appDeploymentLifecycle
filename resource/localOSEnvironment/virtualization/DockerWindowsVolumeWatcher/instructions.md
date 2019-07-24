• install docker-windows-volume-watcher to allow inotify events to be triggered in linux container when host files mounted changes
    http://blog.subjectify.us/miscellaneous/2017/04/24/docker-for-windows-watch-bindings.html


Steps: 
• Run docker for windows
• Run "docker-volume-watcher *node* -v"
• Run container manager that will watch the volume files from inside the container.
