# Symlink .ssh folder
Symlink Windows `.ssh` folder from user folder of Windows to user folder of WSL.

e.g. 
```
    # folder `.ssh`
    ln -s /c/Users/<username>/.ssh /root/.ssh 
```