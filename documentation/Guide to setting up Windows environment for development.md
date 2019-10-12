# **Guide to setting up Windows environment for development**
___

# Install drivers and control center for overclocking from pc manufacturer ✔️
___

# Windows features to enable: ✔️
- enable Windows Subsystem for Linux
- enable developer mode (enables bash for wsl and other features.)
- enable hyper-v feature.
- enable virual machine platform (allows desktop environment setup to work in the latest windows release.)
___

# Resolve issues by turning off:  ✔️
~~Turn off "Fast Startup" which may cause the computer to hang on the UEFI Boot load logo,(symptom: the NumLock is turned on automatically for some reason on boot and stuck).~~
___

# [Install Windows software](./installWindowsSoftware.md) ✔️
# [Install Chromium extensions](./ChromiumExtensionsList.md)
# Add software shortcuts to "Start Menu" & Taskbar: 
    - taskbar: Explorer, Brave, Chrome Canary, VSCodeInsiders, Powershell, SmartGit, Microsoft Visio, StickyNotes, Fiddler, Postman, Email, Alarm
    - System tray: Clipboard Compare, IslamicFinder, Radio, KeePass
___

# Windows Settings: ✔️
- Run scripts to alter Windwos environment: 
    - ConEmu setting > integration > Add to context explorer menu
    - Add options to file explorer context menu - _registry script folder_ (./contextMenuRegistryScript).
- 
___

# WSL Installation: ✔️
- Download & install distro from Windows store. Lunch the distro and set username & password.
- `sudo apt update -y && sudo apt upgrade -y`
- Resources: 
    - https://github.com/tj/n
    -
    -
    -
    -
    -
- zsh + oh my zsh 
    - Theme:
        - https://github.com/romkatv/powerlevel10k
        - https://github.com/bhilburn/powerlevel9k/wiki/Install-Instructions#step-1-install-powerlevel9k
    - plugin: 
        - https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md
        - https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md
        - https://github.com/zsh-users/zsh-completions
        - https://github.com/zsh-users/zsh-history-substring-search
    - https://github.com/robbyrussell/oh-my-zsh
    - Note when installing oh-my-zsh - To prevent issues with line endings when installing `oh-my-zsh` from curl or get from github repo, set git config for crlf to false. i.e. using shell `git config --global core.autocrlf false`
    - https://www.youtube.com/watch?v=ZAYDoE9Wmkc
    - change default shell - http://www.peachpit.com/articles/article.aspx?p=659655&seqNum=3
- Install docker client: 
    - https://davidburela.wordpress.com/2018/06/27/running-docker-on-wsl-windows-subsystem-for-linux/
    ```WSL 
    export DOCKER_HOST=tcp://127.0.0.1:2375
    docker ps # will run WSL Docker Client to Windows Docker Engine
    # & add `export DOCKER_HOST=tcp://127.0.0.1:2375` to .bashrc
    ```
- Symlink .ssh folder:
    Symlink Windows `.ssh` folder from user folder of Windows to user folder of WSL.
    e.g. 
    ```
        # folder `.ssh`
        ln -s /c/Users/<username>/.ssh /root/.ssh 
    ```
- ConEmu WSL - https://conemu.github.io/en/BashOnWindows.html
___

# Setup development environment using appDeploymentLifecycle repository script
___

# Host port remapping for development: 
Use `Fiddler` program to remap localhost ports in the OS.
- localhost:8081      cdn.localhost
- localhost:8082      api.localhost
- localhost:8087      websocket.localhost
- localhost:8083      test.localhost
- localhost:8081      cdn.192.168.14.178
- localhost:8082      api.192.168.14.178
- localhost:8088      oauth.localhost
- localhost:8083      test.192.168.14.178
___

# Hyper Terminal: 
- https://github.com/zeit/hyper/issues/1613
    `nano ~/.inputrc and type set bell-style none`

__
# Docker
- dockerShareDrive - For sharing local drive with docker for windows:	
•	Use “DockerUser” with it’s password. As the main user doesn’t have a password, and Docker enforces using passwords for shared drives users.

-
