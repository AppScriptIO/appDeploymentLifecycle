# Install software pacakges in Windows using a package manager:

___

# Installed Windows software without a pacakge manager:
Windows Terminal (new) from windows store.

Memgraph Lab (https://memgraph.com/download/)
Neo4j Desktop (https://neo4j.com/download-neo4j-now/)
Simple drag drop graph creation tools:
  - Install http://www.apcjones.com/arrows/
  - Install https://graphileon.com/
https://insomnia.rest/ - debug api (similar to postman)


webroot internet security (with license)
VSCode insiders
whatsapp desktop
trello
azan basic (prayer times windows tray)
debian WSL distro (Windows store)
radiotray

procmon - Process Monitor from microsoft - https://docs.microsoft.com/en-us/sysinternals/downloads/procmon allows to check if any process is being blocked.
Acronis True Image 2020 (for Full partitions backup into .img files or iso)
Microsoft Visio
Adobe Acrobat XI Pro 
Adobe Premiere, photoshop

Accent RAR Password Recovery 
Paragon Hard Disk Manager 15 
SD Card Formatter 
easyUEFI Hasleo
shutup10
https://github.com/da2x/EdgeDeflector - conrtana searches change to default system browser 

### TODO: Checkout and install following or similar apps: 
- App for caching open windows to restart windows after a reboot. (an alternative to hibernate)
- "duet" allows for using ipad as a drawing tablet.
___

# Must be executed in administractor powershell with execution policy allowed
```powershell
Set-ExecutionPolicy Bypass -Scope Process

# install Chocolatey Windows package manager
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

choco -?

# Use (https://www.browserling.com/tools/newlines-to-spaces) to convert new lines to spaces to build the command of installing all applications.
choco install -y chocolateygui chocolatey-core.extension
```

## System tools: 
winpatrol
easybcd
winaero-tweaker
vnc-viewer
malwarebytes
ccleaner ccenhancer
autoruns
procexp
crystaldiskinfo
processhacker.install
gpu-z
hwmonitor
linkshellextension
recuva
ddu
sandboxie.install
universal-usb-installer
partitionwizard
rufus
poweriso
7zip.install 
cpu-z.install
vlc 
winrar 
virtualclonedrive
imagemagick.app
autohotkey.install
k-litecodecpackfull
wireshark
winmerge
beyondcompare
fiddler


## Development
cmder
hyper
androidstudio
filezilla
putty.install 
winscp.install
virtualbox
javaruntime
conemu
cmder
postman
docker-desktop
nodejs
yarn
smartgit
git 
git-lfs.install
kdiff3
gitextensions
github-desktop

#_NOTE: git usually installs git bash with cygwin unix emulator for windows._
#_NOTE: After installation is complete install " "Additional tools for Nodejs" from the shortcut created in start menu.

## Browsers
googlechrome
googlechrome.canary
brave
firefox 
opera
Chromium

## applications
anydesk
qbittorrent
evernote
openoffice
pdfcreator
adobereader
sumatrapdf
flashplayerppapi 
googleearth
inkscape
itunes 
audacity
KeePassXC 
obs-studio
telegram.install
slack
signal
4k-video-downloader


### Errors for Chocolatey pacakge installation failures caused usually because of a newer version being installed in source that has a different hash that what is already published in the Chocolatey packages registry.
failing packages:
smartgit
linkshellextension
sandboxie.install
winpatrol
partitionwizard
VisualBCD and dualboot repair for windows 10
