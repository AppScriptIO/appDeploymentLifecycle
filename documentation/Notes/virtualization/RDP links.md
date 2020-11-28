# Remote Desktop and RDP (protocol):
- https://www.youtube.com/watch?v=gsP46ltENRY
- https://www.youtube.com/watch?v=pKU03-sdNxk

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

# Connection issues: 
- make sure no other program blocks visibility on LAN (e.g. VPN program, or settings)
- Allow remote connection, network level auth, allow in firewall settings (features) 
- Network sharing settings
