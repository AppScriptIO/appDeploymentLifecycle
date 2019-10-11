# **Guides for usage of development environment**

# Multiple screen mode
- Switch between multiple screen modes - https://superuser.com/questions/1322510/switch-between-multiple-displays-configuration-in-windows-10
___

# Remote Desktop and RDP (protocol):
- https://www.youtube.com/watch?v=gsP46ltENRY
- https://www.youtube.com/watch?v=pKU03-sdNxk
___
#Nodejs:
- .yarnrc:
    • The --*. will make the flag apply to all commands (install, add, etc)
    for example
        --*.modules-folder "../../node_modules"
    which changes the install directory
- Unlink yarn issue fix:
    `find ./node_modules/@dependency -type l -delete;  find ./node_modules  -type l -delete; yarn install`
- Nodejs Debugger:
    `ndb` relies on `puppeteer` chrome headless nodejs module. Bring debugging with more features than the built-it Nodejs V8 Inspector provides.
    Issues:
    - Couldn't get it installed on WSL. The `puppeteer` headless chrome doesn't work. Documented opened issues present. 31.01.2019
___
# Mapped folter to drive (virtual drive)
- https://www.itworld.com/article/2694895/how-to-map-a-local-folder-to-a-drive-letter-in-windows.html

___

# Shortcuts
- vscode - https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
-
___

# Git
- Git Clone using linux symlinks:
    - change unix symlinks in the cloned repository to Windows symlinks
    - https://stackoverflow.com/questions/5917249/git-symlinks-in-windows

    ``` set symlinks always to true but Windows symlinks have issues the way Git creates them.
    git config --global core.symlinks false

    # Example of usage independent of git configuration
    git clone -c core.symlinks=true <URL>
    ```
- Submodules:
    - https://stackoverflow.com/questions/1777854/how-can-i-specify-a-branch-tag-when-adding-a-git-submodule
- Lineendings:
    - https://stackoverflow.com/questions/2517190/how-do-i-force-git-to-use-lf-instead-of-crlf-under-windows
    - Handling line endings on Windows for git, preventing false modified status for git repos because of line endings:
        ```
        git config --global core.autocrlf true
        # Configure Git on Windows to properly handle line endings
        ```
    -  https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_formatting_and_whitespace
    ```
    # in windows msysgit
    git config --global core.autocrlf false
    git config --global core.eol lf
    ```
- configuration: 
    - https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Where-system-global-and-local-Windows-Git-config-files-are-saved

    - Change location of .gitignore for git repositories - Changes should be made in Windows git command and in WSL git, as visual git programs use Windows git.
        [1] # local user OS git configuration.
        git config --global --edit 
        git config --global core.excludesfile ./configuration/.gitignore

        [2] # gitignore is symlinked to the root directory to allow `GitKraken` visual tool to work, as it doesn't read the `core.excludesfile` option
    - Setting username
        ```
        # saved globally
        git config --system --edit 

        # Other configs: 
        git config --user --edit 
        git config --global --edit 
        ```

- Working with multiple git branches simultaneously:
    - http://www.elmund.io/2016/01/11/working-on-multiple-git-branches-simultaneously/
___
# HyperV Ubuntu VM:
    - https://www.youtube.com/watch?v=YLTdQ7-dmgs
    - https://linuxhint.com/shared_folders_hypver-v_ubuntu_guest/
___
# RDP: 
    - GPU option (remoteFX) was removed from the GUI interface but still accessible from powershell
        `Add-VMRemoteFx3dVideoAdapter -VMName "<name>"`
    - Remote Desktop Connection HyperV VM + RasberryPi: 
        Allow connection to a HyperV VM directly through Ethernet connection to the host machine, from another computer e.g. RasberryPi
    - https://www.youtube.com/watch?v=CuzOxpWopT0
    - https://www.youtube.com/watch?v=uX2VoV28Uww
    - https://www.youtube.com/watch?v=zhvNi6UUdwo
    - https://ashwaniashwin.wordpress.com/2014/06/27/configure-remote-desktop-connection-to-hyper-v-virtual-machine/
    - https://learn.adafruit.com/adafruits-raspberry-pi-lesson-3-network-setup/finding-your-pis-ip-address
    - https://tinkertry.com/how-to-change-windows-10-network-type-from-public-to-private
___
LCOW: 
- Docker for Windows: 
    • With LCOW (Linux Containers on Windows, built with LinuxKit), the Docker daemon runs as a Windows process and every time you start a Linux container, Docker launches a minimal Hyper-V hypervisor running a VM with the container processes running on top of it, versus the previous architecture where Hyper-V Linux VM runs a Linux Docker daemon, along with all your containers.
    • LCOW Set default platform as linux - https://github.com/moby/moby/issues/35303#issuecomment-347687570
    • # LCOW slow build issue to take into consideration - https://github.com/docker/for-win/issues/1771
- https://medium.com/@joni2nja/lcow-docker-compose-vs-2017-net-core-2-1-178946b36acb

___

# Docker: 
    - Docker limitation for mapped drives - Docker for windows cannot share drives that are mapped.
    - HyperVMobyLinuxVM - Locally on host machine in case using "Docker for Windows":
        - ssh into hyper-v MobyLinuxVM : https://blog.jongallant.com/2017/11/ssh-into-docker-vm-windows/
    - sharingLinuxSockerInWindowsVsLinux
    ```
    -v "/var/run/docker.sock:/var/run/docker.sock" (Linux).

    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine (Windows).
    ```

___
