LCOW: 
- Docker for Windows: 
    • With LCOW (Linux Containers on Windows, built with LinuxKit), the Docker daemon runs as a Windows process and every time you start a Linux container, Docker launches a minimal Hyper-V hypervisor running a VM with the container processes running on top of it, versus the previous architecture where Hyper-V Linux VM runs a Linux Docker daemon, along with all your containers.
    • LCOW Set default platform as linux - https://github.com/moby/moby/issues/35303#issuecomment-347687570
    • # LCOW slow build issue to take into consideration - https://github.com/docker/for-win/issues/1771
- https://medium.com/@joni2nja/lcow-docker-compose-vs-2017-net-core-2-1-178946b36acb

____

# Docker: 
    - Docker limitation for mapped drives - Docker for windows cannot share drives that are mapped.
    - HyperVMobyLinuxVM - Locally on host machine in case using "Docker for Windows":
        - ssh into hyper-v MobyLinuxVM : https://blog.jongallant.com/2017/11/ssh-into-docker-vm-windows/
    - sharingLinuxSockerInWindowsVsLinux
    ```
    -v "/var/run/docker.sock:/var/run/docker.sock" (Linux).

    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine (Windows).
    ```
