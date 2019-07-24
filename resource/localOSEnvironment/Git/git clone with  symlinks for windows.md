# change unix symlinks in the cloned repository to Windows symlinks
# https://stackoverflow.com/questions/5917249/git-symlinks-in-windows

# set symlinks always to true but Windows symlinks have issues the way Git creates them.
git config --global core.symlinks false

# Example of usage independent of git configuration
git clone -c core.symlinks=true <URL>