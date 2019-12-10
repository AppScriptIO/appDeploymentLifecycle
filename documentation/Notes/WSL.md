- Fix issues with WSL connectivity 
  https://github.com/microsoft/WSL/issues/3438

  Add 
  ```
  nameserver 8.8.8.8
  nameserver 8.8.4.4
  ```
  to 
  `sudo nano /etc/resolv.conf`