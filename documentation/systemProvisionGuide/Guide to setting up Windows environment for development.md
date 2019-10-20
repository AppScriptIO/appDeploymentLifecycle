# **Guide to setting up Windows environment for development**
___

# BIOS:
	- storge management: Use AHCI instead of RAID. 
	- Turn on secure boot with custom registered keys.
	- Turn off network boot, and unnecessary secondary OS boots.
	- Use UEFI mode.

# Windows:
Install Windows and make sure the installer creates it's own EFI & Recovery partitions (MSR partition is always installed along side the OS system partition), because in case an EFI already exists, the installer seems to skip creation of Recovery partition and uses the existing EFI partition, which may cause issues in Hibernation mode.
    - UEFI boot:
        - if errors appear during boot in case multiple EFI enteries for different OSes are registered - use `dual-boot repair for Windows 10` to fix EFI partition table (Access safe mode from windows recovery menu).
        - remove UEFI boot of previous insllations - using any BCD editor software (e.g. "visual BCD editor")
	- Update Windows

# Drivers: 
Install drivers and control center for overclocking from pc manufacturer.
Install from CD ROM (ISO), where the following drivers should downloaded and use an updated version:
	- VGA (NVIDIA) driver - use GeForce Experience NVIDIA update tool instead. (+ signin using a created account stored in KeePass use portable version)
	  Change profile to use `studio driver` rather than optimized for games.
      After installation - enable NVIDIA G-Sync for windowed mode.
	- for Network use the newer Killer Control Panel with performance suite from official website (instead of Killer control manager) - card E2400
	- Intel® Management Engine Driver - install newer driver. run one of the MSI installars https://downloadcenter.intel.com/product/67496/Intel-Management-Engine-Interface-Intel-MEI-

# Hibernation: 
	- Test Hibernation mode afte driver and updates installed.
	- Note: Hibernation does not work with Hyper-V feature enable in recent Windows versions. Drivers has nothing to do with hibernation wakeup failure. E.g. using the original Windows flash installer that came with the PC (less that version 18), makes it possible to hibernate even if Hyper-V is enabled.
    Note that checking if hibernation works after turnning off a feature should be done in 2nd restart (as in the first restart the feature will not be turned off completely).

# Windows features to enable:
	- enable windows feature:
		- Windows Subsystem for Linux
		- Windows Hypervisor Platform (prerequisite of the future WSL2)
		- Hyper-v feature
		- Virual Machine Platform (allows desktop environment setup to work in the latest windows release.).
	        - Containers.
		- Windows sandbox (created sandboxed environment to test applications without risking the main Windows OS)
	- enable Developer Mode (enables bash for wsl and other features.)

# Install chocolatey pacakge manager and [Install Windows software](./installWindowsSoftwareAndChromiumExtensions.md) with chrome extensions to Brave browser✔️

# Add software shortcuts to "Start Menu" & Taskbar: 
    - taskbar: Explorer, Brave, Chrome Canary, VSCodeInsiders, Powershell, ConEmu, GitBash, SmartGit, Microsoft Visio, Fiddler, Postman, StickyNotes, Email, Alarm, IslamicFinder Athan
    - System tray: IslamicFinder Athan, Radio, KeePassXC, docker desktop, bluetooth
    - Windows start menu: Use program "Backup Start Menu Layout v1.3
        Using terminal doesn't seem to be working (https://www.thewindowsclub.com/import-export-fix-start-menu-layout-windows-10)
        - `export-startlayout –path <path><file name>.xml`
        - `Import-StartLayout –LayoutPath <path><file name>.xml –MountPath C:\`  (%systemdrive% => is the drive where windows is installed)
    - Remove shortcuts from desktop

# 💾 create a restore point for recovery in case the next settings messed up the system:
	- remove unnecessary default windows installed apps before creating a restore point.
	- remove temporary storage files, activity history, recents explorer, before creating a restore point.

# set Settings: 
- Networking: 
    - Change network workgroup name & computer name (random generated).
    - turn off network discovery.
- Run scripts to alter Windwos environment: 
    - Add options to file explorer context menu - _registry script folder_ (./contextMenuRegistryScript).
- Set default apps to use with different file extensions. i.e. Brave, VLC
- remove unnecessary startup apps and change setting in apps if necessary.
    - remove `clipboard compare` (Beyond compare product) from startup.
    - remove unnecessary services from startup (e.g. update services of different apps)
- Turn on clipboard history - to allow multiple clipboard enteries.
- Multiple screen setup - resolution, scaling, position, sound source & volume, set primary. 
    - display scale 200% for 4k screen
    - Ease of Access > Display > make text bigger = 120%, make everything bigger = 200%
    Resource: 
        - Guide to switch between multiple screen modes - https://superuser.com/questions/1322510/switch-between-multiple-displays-configuration-in-windows-10
- Taskbar settings: Combine buttons when taskbar is full, peek preview, small taskbar buttons, Top position, Taskbar where windows is opened, select icons to show in system tray including all system icons.
- Keyboard Languages, clock/date formats
- Sign in automatically to windows: `netplwiz` command, then untick `users must enter a password to use this computer`
- system performance - change settings for best performace by removing animations (system propertes > advanced > performace settings)
- power settings:
    - enable hibernation & Turn off "Fast Startup" option.
    - close lid & sleep button -> turns off screen. close lid on battery -> hibernate.
    - shutdown button turns off pc.
    - never put to sleep when plugged.
- show all hidden files (system and non system files), show extensions, use check boxes to select, expand to open folder, details view, preview pane.
- Change to dark theme for windows & explorer, remove transparency, show accent color on title bars & windows borders.
    - set wallpapers to collection (copy from storage to user pictures fodler.).
    - ~~show all icons on desktop.~~
- start menu: show most used apps.
- change mouse & touchpad speed to fastest, change mouse color to yellow and size to 2 for mouse and cursor thickness.
- `msconfig` > boot timeout = 3s, check OS boot information.
- TODO (Tool isn't easy to use, need a way to backup current context settings): Using `Easy Context Menu` tool, manipulate the Windows context menu, creating nested menus for common tools.
- TODO: set calibration configuration from original backup ISO.

___

# Specific Applications setup:

### Boot options:
- using Winraero - Always show boot menu (timeout seconds can be controlled in msconfig.exe).

### Windows apps
- sign into windows email app.
    - set dark mode, no background, compact.
- set weather location.

### Clevo control center and overclocking:
- change mode for quiet, fan automatic, power balanced.
- Optional - insert overclocking parameters from original supplier.

### Brave browser:
- create profile for each email and sign in.
- remove passwords, payment method, address saving.
- use wide address bar, hide brave rewards button.
- show bookmarks tab
- make extensions run only when clicked.
- Do not continue in background when closed.

### ConEmu 
- ConEmu setting > integration > Add to context explorer menu
- ConEmu WSL - This should be already configured as the ConEmu configuration file is version controlled in the repository. https://conemu.github.io/en/BashOnWindows.html

### Fiddler:
- Host port remapping for development: Use `Fiddler` program to remap localhost ports in the OS. (Tools > HOSTS)
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
- Synchronize settings with gist `90e15820071cc7bdef5507c8b75d9bf8` using `settings sync` vscode extension. after setting gist id, press ctrl+shift+d to download the settings (ctrl+shift+P -> Sync: Download).

### RadioTray: 
- Add recitation channels
- remove up down volume hotkeys control (configuration > hotkeys)

### webroot: 
    - ~~remove shortcut from desktop (as it keeps being automatically created.)~~

### Docker
- Increase RAM and CPU cores.
- dockerShareDrive - For sharing local drive with docker for windows:	
    - Create a new user “DockerUser” with a secure password with limited access permission and no desktop signin, rather than using the main user. (KeePassCX = location for storage)
        Computer Management > local users & groups
    - prevent login for the user - https://superuser.com/questions/663531/can-i-create-a-windows-user-account-without-the-ability-for-an-interactive-user/663537
        `GPEDIT.MSC`> Computer Configuration\Windows Settings\Security Settings\Local Policies\User Rights Assignment > Deny Logon Locally
- Expose daemon on localhost (for Docker Desktop settings) - for usage wit WSL Docker client
- TODO: Enable Kubernates

### Winrar:
- Settings > Integration > Cascaded context menu.

### IslamicFinder Athan: 
    - Advanced options > show window at athan time.

### Acronis True Image 2020:
    - disable startup using task manager and from msconfig. As the app does not have an option to uncheck startuping on boot.

### Git: 
    - Save github credentials in windows Credential Manager: `git config --global credential.helper wincred`, afterwards the next login from git command will save the credentials in Credential Manager.
    Note the github global configuration should have already contain the entry for credntial helper "wincred", as the config is symlinked.

### SmartGit:
    - Change to dark theme.
    - configure github intergration: preferences > hosting providers > Add (place token from github account or autogenerate one from SmartGit.)
    - Allow manipulating pushed commits: Preferences > Commands > Push - Allow modifying pushed commeits.

___

# Setup Windows & WSL environment: ✔️
- Download & install distro from Windows store. Lunch the distro and set username & password.
- Setup development environment using appDeploymentLifecycle repository powershell script.
    - `yarn run setup`, once reached `change default shell` exit the new zsh shell that will be opened to continue installation. Repeat execution if errors occur, and make sure all commands in installations where executed (e.g. powerlevel10K theme in ZSH command group). this command will also update linux `sudo apt update -y && sudo apt upgrade -y`
- Symlink .ssh folder to WSL: `ln -s /<.ssh location>/.ssh /root/.ssh`

- TODO: (WSL2 may replace this option, as it allows calling wsl commands from Windows) setup wslgit which will allow to use a single installation of git on WSL - https://github.com/andy-5/wslgit or https://github.com/hangxingliu/wslgit

___

# 💾 verify environment then: create `restore point` and remove all other restore points. (system properties > system protection > configure restore points for the system drive)
# 💾 Create a Windows ISO image full backup. - using "Acronis True Image 2020" (for Full partitions backup into .img files or iso)
