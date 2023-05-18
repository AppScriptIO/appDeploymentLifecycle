# **Guide to setting up Windows environment for development**

---

# Linux:

-   Install a secondary Linux OS for recovery purposes. e.g. `Debian` > `Ubuntu` > `Pop OS`
-   Make sure to create a EFI Partition separate from the Windows OS one.

# BIOS:

    - storge management: Use AHCI instead of RAID.
    - Turn on secure boot with custom registered keys.
    - Turn off network boot, and unnecessary secondary OS boots.
    - Use UEFI mode.

# Windows:

Install Windows and make sure the installer creates it's own EFI & Recovery partitions (MSR partition is always installed along side the OS system partition), because in case an EFI already exists, the installer seems to skip creation of Recovery partition and uses the existing EFI partition, which may cause issues in Hibernation mode. - UEFI boot: - if errors appear during boot in case multiple EFI enteries for different OSes are registered - use `dual-boot repair for Windows 10` to fix EFI partition table (Access safe mode from windows recovery menu). - remove UEFI boot of previous insllations - using any BCD editor software (e.g. "visual BCD editor") - Update Windows

# Drivers:

Install drivers and control center for overclocking from pc manufacturer.
Install from CD ROM (ISO), where the following drivers should downloaded and use an updated version: - VGA (NVIDIA) driver - use GeForce Experience NVIDIA update tool instead. (+ signin using a created account stored in KeePass use portable version)
Change profile to use `studio driver` rather than optimized for games.
After installation - enable NVIDIA G-Sync for windowed mode. - for Network use the newer Killer Control Panel with performance suite from official website (instead of Killer control manager) - card E2400 - Intel® Management Engine Driver - install newer driver. run one of the MSI installars https://downloadcenter.intel.com/product/67496/Intel-Management-Engine-Interface-Intel-MEI-

# Hibernation:

    - Test Hibernation mode afte driver and updates installed.
    - Note: Hibernation does not work with Hyper-V feature enable in recent Windows versions. Drivers has nothing to do with hibernation wakeup failure. E.g. using the original Windows flash installer that came with the PC (less that version 18), makes it possible to hibernate even if Hyper-V is enabled.
    Note that checking if hibernation works after turnning off a feature should be done in 2nd restart (as in the first restart the feature will not be turned off completely).

# Windows features to enable:

    - enable windows feature: (Differences between featuers - https://superuser.com/questions/1510172/hyper-v-vs-virtual-machine-platform-vs-windows-hypervisor-platform-settings-in-p)
    	- Windows Subsystem for Linux
    	- Windows Hypervisor Platform (prerequisite of the future WSL2)
    	- Hyper-v feature
    	- Virual Machine Platform (allows desktop environment setup to work in the latest windows release.).
            - Containers.
    	- Windows sandbox (created sandboxed environment to test applications without risking the main Windows OS)
    - enable Developer Mode (enables bash for wsl and other features.)
    - Windows long file path https://helpdeskgeek.com/how-to/how-to-fix-filename-is-too-long-issue-in-windows/

# Install chocolatey pacakge manager and [Install Windows software](./installWindowsSoftwareAndChromiumExtensions.md) with chrome extensions to Brave browser✔️

    - Afterwards, run `Auroruns` program to disable unneeded update services (e.g. office related).
    - Add to firewall programs to prevent connection to the internet in case required.

# Add software shortcuts to "Start Menu" & Taskbar:

    - taskbar: Explorer, Brave, Chrome Canary, VSCodeInsiders, ConEmu, WindowsTerminal, SmartGit, Microsoft Visio, Microsoft OneNote, Fiddler, Postman, StickyNotes, Email, Alarm, IslamicFinder Athan
    - System tray: IslamicFinder Athan, Radio, KeePassXC, docker desktop, bluetooth
    - Windows start menu: Use program "Backup Start Menu Layout v1.3"
        - make sure when saving backup using the program to remove "Info.ini", as it contans personal user data.
        Using terminal doesn't seem to be working (https://www.thewindowsclub.com/import-export-fix-start-menu-layout-windows-10)
        - `export-startlayout –path <path><file name>.xml`
        - `Import-StartLayout –LayoutPath <path><file name>.xml –MountPath C:\`  (%systemdrive% => is the drive where windows is installed)
    - pin shortcuts in the resource > startMenuWindows folder, if they do not exist. (a registry script is used to allow adding any file to the pin start menu).
    - Remove shortcuts from desktop
    - Add Computer folder as a toolbar in taskbar, allowing quick view of filesystem folders.

# 💾 create a restore point for recovery in case the next settings messed up the system:

    - remove unnecessary default windows installed apps before creating a restore point.
    - remove temporary storage files, activity history, recents explorer, before creating a restore point.

# set Settings:

-   Don't require sign-in after wakeup: settings > Accounts > Sign-in options > Require signin.
-   Networking:
    -   Change network workgroup name & computer name (random generated).
    -   turn off network discovery.
-   Run scripts to alter Windwos environment:
    -   Add options to file explorer context menu - _registry script folder_ (./contextMenuRegistryScript).
    -   Use Windows 10 Magnifier - Use lense mode & run on startup minimized https://superuser.com/questions/1097802/start-magnifier-minimized-in-windows-10  
         (shortcuts: Windows with +/- keys https://www.tenforums.com/tutorials/84190-open-close-magnifier-windows-10-a.html)
-   Set default apps to use with different file extensions. i.e. Brave, VLC
-   remove unnecessary startup apps and change setting in apps if necessary.
    -   remove `clipboard compare` (Beyond compare product) from startup.
    -   remove unnecessary services from startup (e.g. update services of different apps)
-   Turn on clipboard history - to allow multiple clipboard enteries.
-   Multiple screen setup - resolution, scaling, position, sound source & volume, set primary.
    -   display scale 200% for 4k screen
    -   Ease of Access > Display > make text bigger = 120%, make everything bigger = 200%
        Resource: - Guide to switch between multiple screen modes - https://superuser.com/questions/1322510/switch-between-multiple-displays-configuration-in-windows-10
-   Taskbar settings: Combine buttons when taskbar is full, peek preview, small taskbar buttons, Top position, Taskbar where windows is opened, select icons to show in system tray including all system icons.
-   Keyboard Languages, clock/date formats
-   Disable shift 5-times sticky key toggling in Settings > Device > keyboard.
-   Sign in automatically to windows: `netplwiz` command, then untick `users must enter a password to use this computer`
-   system performance - change settings for best performace by removing animations (system propertes > advanced > performace settings)
-   power settings:
    -   enable hibernation & Turn off "Fast Startup" option.
    -   close lid & sleep button -> turns off screen. close lid on battery -> hibernate.
    -   shutdown button turns off pc.
    -   never put to sleep when plugged.
-   show all hidden files (system and non system files), show extensions, use check boxes to select, expand to open folder, details view, preview pane.
-   Change to dark theme for windows & explorer, remove transparency, show accent color on title bars & windows borders.
    -   set wallpapers to collection (copy from storage to user pictures fodler.).
    -   ~~show all icons on desktop.~~
-   start menu: show most used apps.
-   change mouse & touchpad speed to fastest, change mouse color to yellow and size to 2 for mouse and cursor thickness, (~touchpad sentsitivity to "Most sensitive" to prevent mouse locking when pressing on keyboard at the same time~).
-   `msconfig` > boot timeout = 3s, check OS boot information.
-   TODO (Tool isn't easy to use, need a way to backup current context settings): Using `Easy Context Menu` tool, manipulate the Windows context menu, creating nested menus for common tools.
-   TODO: set calibration configuration from original backup ISO.
-   TODO: Add Windows explorer "tags" field for quick edit of metadata details in the "details pane" https://karl-voit.at/2019/11/26/Tagging-Files-With-Windows-10/
    -   https://github.com/Dijji/FileMeta/releases/tag/v1.6.0.4
-   Add to context menu "pin to start" for files: https://www.addictivetips.com/windows-tips/pin-a-file-to-start-menu-windows-10/#:~:text=Right%2Dclick%20the%20file%20and,context%20menu%20for%20all%20files.
-   Disable telemetry: https://www.easeus.com/partition-manager-software/fix-windows-10-microsoft-compatibility-telemetry-high-disk-usage.html
    -   https://www.oo-software.com/en/shutup10
-   Check schedualed tasks in windows and disable unnecessary updates.

# Windows 10 themes:

-   TODO: https://www.youtube.com/watch?v=X6FpuMqCghw

---

# Specific Applications setup:

### Boot options:

-   using Winraero - Always show boot menu (timeout seconds can be controlled in msconfig.exe).

### Windows apps

-   sign into windows email app.
    -   set dark mode, no background, compact.
-   set weather location.

### Clevo control center and overclocking:

-   change mode for quiet, fan automatic, power balanced.
-   Optional - insert overclocking parameters from original supplier.

## T-Clock taskbar clock:

-   Setting from ./resource/localDevelopmentEnvironment/WindowsOS/T-Clock settings.

## add folder widgets to dektop https://www.stardock.com/products/fences/

### Brave browser:

-   create profile for each email and sign in.
-   remove passwords, payment method, address saving.
-   use wide address bar, hide brave rewards button.
-   show bookmarks tab
-   make extensions run only when clicked.
-   Do not continue in background when closed.
-   Reopen where left.

## Chrome Canary:

Use chrome canary as development browser.

-   Add necessary extensions.
-   remove passwords, payment method, address saving.
-   show bookmarks tab
-   make extensions run only when clicked.
-   Do not continue in background when closed.
-   Reopen where left.
-   brave://flags/ or chrome://flags and enable features related to tabs and fullscreen.

### ConEmu

-   ConEmu setting > integration > Add to context explorer menu
-   ConEmu WSL - This should be already configured as the ConEmu configuration file is version controlled in the repository.
    https://conemu.github.io/en/BashOnWindows.html
    -   Links for WSL2 with ConEmu setup:
        generally usage of `wsl.exe` works fine - https://gist.github.com/meatcar/b8b6b756b9b33cbae62ee9d518c6f274 - https://github.com/Maximus5/ConEmu/issues/1930 - https://github.com/Maximus5/ConEmu/issues/1930

### Windows Terminal (new from windows store)

-   Change setting of the default shell/command to WSL debian.
    TODO: symlink the configuration used by the Window Terminal program, adding it to the resource folder.

### Fiddler:

-   Host port remapping for development: Use `Fiddler` program to remap localhost ports in the OS. (Tools > HOSTS)

```
localhost:8081      cdn.localhost
localhost:8082      api.localhost
localhost:8087      websocket.localhost
localhost:8083      test.localhost
localhost:8081      cdn.localhost
localhost:8082      api.localhost
localhost:8088      oauth.localhost
localhost:8083      test.localhost
```

### VSCode:

-   Synchronize settings with gist `90e15820071cc7bdef5507c8b75d9bf8` using `settings sync` vscode extension. after setting gist id, press ctrl+shift+d to download the settings (ctrl+shift+P -> Sync: Download).
    -   Setup multi language settings: i.e. for JS, Java, C++, etc. https://code.visualstudio.com/docs/getstarted/settings
-   Fonts:
    -   Generate `Operator Mono` font with ligature (or check resource folder for an already generated files):
        Using docker https://github.com/kiliman/operator-mono-lig#docker
        or
        Using local linux environment:
        -   FiraCode - download the latest version from https://github.com/tonsky/FiraCode or use resource in this repository.
        -   Operator Mono - use from resource folder.
        -   combine both symbol font (FiraCode) & syntax font (operator mono) into a single font using - https://github.com/kiliman/operator-mono-lig
            -   install `sudo apt install -y python3-pip python-pip`
            -   `pip install fonttools` // https://github.com/fonttools/fonttools
            -   `PATH=$PATH:~/.local/bin` // add python packages to command path.
            -   `cd /tmp && git clone https://github.com/kiliman/operator-mono-lig && cd ./operator-mono-lig && npm install`
            -   Copy the Operator Mono files into the `./origianal` folder. (filenames must not include spaces, and be as should in the repository documentation.)
            -   `./build.sh` will create a folder `build` folder with the newly combined fonts.
    -   install all the generated fonts (check resource for already generated files).
    -   Verify that VSCode settings contain the font wanted.
-   Setup Remote WSL (Check notes down after the WSL setup).

## NeoVim:

-   install Operator Mono fonts
-   install NerdFonts.com fonts (check github install script)
-   install NvChad collection

### RadioTray:

-   Add recitation channels
-   remove up down volume hotkeys control (configuration > hotkeys)

### Antiverus:

    // TODO:  switched from webroot as it was conflicting and blocking WSL 1 (after a while of monitoring it starts blocking, couldn't find a way to solve it.). Check if WSL 2 is released and try webroot with it.
    ### webroot:
        - ~~remove shortcut from desktop (as it keeps being automatically created.)~~
    ### Bitdefender:
        - sign in using a created account.
        - install VPN of bitdefender

### Docker

-   Increase RAM and CPU cores.
-   [Only for WSL1 or WSL2 without integration of docker desktop] dockerShareDrive - For sharing local drive with docker for windows:
    -   Create a new user “DockerUser” with a secure password with limited access permission and no desktop signin, rather than using the main user. (KeePassCX = location for storage)
        Computer Management > local users & groups
        -   prevent login for the user - https://superuser.com/questions/663531/can-i-create-a-windows-user-account-without-the-ability-for-an-interactive-user/663537
            `GPEDIT.MSC`> Computer Configuration\Windows Settings\Security Settings\Local Policies\User Rights Assignment > Deny Logon Locally
    -   Expose daemon on localhost (for Docker Desktop settings) - for usage with WSL Docker client
-   TODO: Enable Kubernates
-   download images:
    -   Memgraph image - https://docs.memgraph.com/memgraph/quick-start#docker-installation
    -   docker pull neo4j; docker pull node; docker pull portainer/portainer
-   Run docker containers:
    -   run portainer with autostart. (run portainer from @deployment/deploymentScript package.)
    -   run Swarmpit for docker swarm GUI. (run swarmpit from @deployment/deploymentScript package.)
-   Turn on WSL2 integration of Docker Desktop.
    -   Solve issue, every now and then the WSL2-Docker integration breaks:
        -   Remove containers with socket attached, disable WSL2 Docker and then re-enable it, & restart computer (complete shutdown, not logging out)
        -   Make sure DOCKER_HOST environment is not set, Or reinstall docker or https://github.com/docker/for-win/issues/5096#issuecomment-572730439
        -   IMPORTANT: Should add delayed startup for docker desktop to prevent failure of setting up itself with WSL2. Otherwise, WSL2 docker commands will not be able to connect to Docker deamon. Add delay to startup program using Windows Patrol program.

### Winrar:

-   Settings > Integration > Cascaded context menu.

### IslamicFinder Athan:

    - Advanced options > show window at athan time.

### Acronis True Image 2020:

    - disable startup using task manager and from msconfig. As the app does not have an option to uncheck startuping on boot.

### Git:

    - Save github credentials in windows Credential Manager: `git config --global credential.helper wincred`, afterwards the next login from git command will save the credentials in Credential Manager.
    Note the github global configuration should have already contain the entry for credntial helper "wincred", as the config is symlinked.
    - TODO: Make sure the correct line-ending is used accross WSL2 and Windows applications. https://stackoverflow.com/questions/10418975/how-to-change-line-ending-settings

### SmartGit:

    - Change to dark theme.
    - configure github intergration: preferences > hosting providers > Add (place token from github account or autogenerate one from SmartGit.)
    - Allow manipulating pushed commits: Preferences > Commands > Push - Allow modifying pushed commeits.
    - Preferences > Commands > Stash > Include tracked files.
    - Preferences > Commands > Push > Push all tags.
    - Preferences > Commands > Commit > Add untracked files.
    - Preferences > Refresh > Referesh file system in background.

### Github Desktop:

    - sign in to github account.

### Postman:

    - change theme to dark
    - Login to the postman account.
    - add schemas for api/graphql - e.g. Github graphql (https://github.com/octokit/graphql-schema) ...

### Neo4j Desktop:

-   install extensions from https://install.graphapp.io/: yFiles, GraphXR, graphlytic desktop.
-   Resources:
    -   https://neo4j.com/graphgists/

## TODO: OpenDNS:

-   Setup openDNS client automatic ip update.

## Web filitering:

    - K9 web protection (Not supported anymore): Github copy https://github.com/romanov999/K9-Web-Protection-Copy use the provided link to generate license key.

Alternatives: - Qustodio - Cold Turkey

## Microsoft OneNote:

-   Setup onenote notebooks and sync online notebooks.
-   Add-on https://github.com/stevencohn/OneMore/releases
-   Add-on https://www.onenotegem.com/
-   custom style addons:
    -   https://getonetastic.com/?i=update-for-onetastic-1-3-0#custom-styles

## VPN:

-   https://www.psiphon3.com/en/download.html
    -NordVPN - search for premium accounts - Make sure VPN is secure https://support.nordvpn.com/FAQ/1047410162/How-to-be-truly-secure-whilst-using-NordVPN.htm
    -   <https://github.com/kboghe/NordVPN-switcher>

## other

-   <https://ramensoftware.com/7-taskbar-numberer>
-   ***

# Setup Windows & WSL environment: ✔️

-   WSL2 Entroll into insiders program:
    -   💾 create a restore point for recovery in case the next settings messed up the system.
    -   Check which Window Insiders release cycle (preview/slow/fast) supports WSL2 (currently slow ring does).
    -   hackish way to enroll into Windows insiders program without an account - https://github.com/myuseringithub/offlineinsiderenroll
    -   switch to WSL2: https://docs.microsoft.com/en-us/windows/wsl/wsl2-install
        -   powershell (administrative privilages) `wsl --set-default-version 2` & `wsl --set-version Debian 2` then verify `wsl --list --verbose`
        -   WSL2 files can be access through path `\\wsl$` (network sharing can be kept disabled)
-   WSL2 related installations: (WSL2 update allows calling wsl commands from windows)
    -   use native docker integrated with WSl2.
-   [WSL1] TODO: setup wslgit which will allow to use a single installation of git on WSL - https://github.com/andy-5/wslgit or https://github.com/hangxingliu/wslgit
-   Download & install distro from Windows store. Lunch the distro and set username & password.
-   Setup development environment using appDeploymentLifecycle repository powershell script.
    -   `yarn run provisionOS` run it through Windows Node's installation, rather than under the newly installed WSL.
        once reached `change default shell` exit the new zsh shell that will be opened to continue installation. Repeat execution if errors occur, and make sure all commands in installations where executed (e.g. powerlevel10K theme in ZSH command group). this command will also update linux `sudo apt update -y && sudo apt upgrade -y`
    -   Make sure the apppDeploymentLifecycle scripts don't mess up some changes made by Docker on WSL2 and VSCode remote server for WSL2. If Issues found try disabling and reenabling docker engine on WSL2 and to trigger reinstallation.
-   Symlink .ssh folder to WSL: `sudo ln -s /<.ssh location>/.ssh ~/.ssh`
    -   git will use 'credential store' (resource > .gitconfig) to lookup for `.git-credentials` file and automatically read token for github. Make sure .git-credentials have the current user as owner and has permissions (-rw-------), instead of root (which will allow usage without sudo),.
    -   TODO: change default path docker lookup for config file (default location `~/.docker/config.json`), to <.ssh folder>/.docker.
-   Setup VSCode in WSL2: ctrl+shift+p and search for "Remote: WSL new window", in which VSCode will download WSL server automatically and set it up.
    -   make sure `code .` or `code-insiders .` works in WSL2 after vscode installed VSCode server in WSL2.
    -   Open extensions tab, and migrate all required extensions to debian side in order to enable them.
        Note: VSCode will have 2 types of extensions UI, & Workspace (requires direct access to source code of projects) extensions. These are installed automatically by VSCode on the correct side - WSL2 server or Windows VScode client.
        VS Code's APIs are designed to automatically run in the right location regardless of where your extension happens to be located.
-   Setup Linux graphical server and Windows client to access WSL2 graphical programs: https://medium.com/@chuckdries/installing-gitkraken-in-wsl-2-15bf6459f823 https://wiki.ubuntu.com/WSL#Running_Graphical_Applications
    -   TODO: [FIX this not working...] Install smartGit graphical program in WSL2 and access it through Windows to take advantage of `inotify` support for autorefresh (as not yet supported), and use wsl own git installation.
        -   (follow steps of above link) Install X server e.g. VcXsrv, symlink configs (from this repo's resource folder), set firewall protocol to allow WSL2 own ip access.
        -   smartgit for linux https://www.syntevo.com/smartgit/download/#installation-instructions
-   Split repositories between Windows and WSL2: Move most repositories to WSL2 filesystem for greater performance, and keep Window system provisioning and documentation related repositories in Windows.

Notes & Resources:

-   Access root user in WSL2 with `sudo su`
-   An attempt to install WSL2 in insiders program (slow ring):
    -   OS biuld before switching to insiders = 18363.592 (version 1909) or 18363.628
    -   OS build after switching to insiders = 19041.21
-   https://github.com/shayne/wsl2-hacks
-   https://www.hanselman.com/blog/CoolWSLWindowsSubsystemForLinuxTipsAndTricksYouOrIDidntKnowWerePossible.aspx
<!-- !important: docker desktop engine on WSL2 (unreleased version) still has the following required features not implemented fully: 
    - [Supported ✔] Access WSL2 executables from windows: e.g. ` \Windows\System32\wsl.exe git status` in Windows will use the wsl git executable.
    - [Supported ✔] /var/run/docker.sock volume still not supported as mentioned in https://www.docker.com/blog/new-docker-desktop-wsl2-backend/ 
    - [Supported ✔ both host and bridge] WSL2 is now running with a host-only network adapter (While the WSL VM is still on a host-only network adapter, you can access things like docker containers through localhost on your Windows (host) machine) https://medium.com/faun/windows-subsystem-on-linux-wsl-2-first-impressions-96adaf2ebe76
    https://www.youtube.com/watch?v=Xxhhdo2e-DA
    Use --network="host" in your docker run command, then 127.0.0.1 in your docker container will point to your docker host. https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach
        The issue is that networking is messed up a little when using docker desktop on WSL2, from what I've observed, docker desktop WSL2 ports are exposed, they do not conflict with localhost but override their access (accessing localhost:8080 will be tranmitted to the WSL2 container, over the host's server/app).
        https://github.com/microsoft/WSL/issues/4212
        WSL2 will have it's own ip address https://docs.microsoft.com/en-us/windows/wsl/wsl2-ux-changes#accessing-network-applications
        Important note about networking - https://github.com/microsoft/WSL/issues/4150#issuecomment-504209723
        Port exposure when using `--network="host"` in docker run command (e.g. relying on Windows host program like memgraph on host): When host network is used, the container for some reason stops being accessible through eaither WSL2 ip or localhost. Checkout - https://docs.docker.com/network/host/
        WSL2 ip = `ip addr show dev eth0` reveals the address that allows to access the containers ports in the VM.
        host machine ip = `cat /etc/resolv.conf`
        - Accessing WSL2 from Windows can be accessed with localhost.
        - Accessing Windows from WSL2 can be accessed through host machine ip address.
    - [Not supported ❌] iNotify from Windows to WSL2 
        Workaround: move projects to WSL2 filesystem.
        - https://www.youtube.com/watch?v=lwhMThePdIo&feature=youtu.be&t=2189
        - https://github.com/microsoft/WSL/issues/1956
        - https://github.com/microsoft/WSL/issues/4739


-   Use windows executable from WSL2: https://www.reddit.com/r/bashonubuntuonwindows/comments/evs4hr/do_you_like_using_wsl2_but_hate_how_slow_git_runs/
-   Run graphical applications of WSL2 from Windows: https://www.reddit.com/r/bashonubuntuonwindows/comments/evs4hr/do_you_like_using_wsl2_but_hate_how_slow_git_runs/ffypob0/
    https://medium.com/@chuckdries/installing-gitkraken-in-wsl-2-15bf6459f823
    -->

-   Fix WSL DNS when using VPN: https://github.com/microsoft/WSL/issues/1350

    -   set `[network] generateResolvConf = false` in /etc/wsl.conf and add a different dns server name in /etc/resolv.conf file.

-   update debian 10 to debian 11 (bullseye) <https://www.cyberciti.biz/faq/update-upgrade-debian-10-to-debian-11-bullseye/>. To use latest g++ version compiler.

---

# 💾 verify environment then: create `restore point` and remove all other restore points. (system properties > system protection > configure restore points for the system drive)

# 💾 Create a Windows ISO image full backup. - using "Acronis True Image 2020" (for Full partitions backup into .img files or iso)

# from time to time execute:

    - `choco upgrade all -y` on Windows
    - `apt update -y && apt upgrade -y` on WSL

---

# Clone all project repositories to allow bulk changes accross repositories in related projects.
