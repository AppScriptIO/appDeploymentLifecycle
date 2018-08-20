# script run from within the container to install node_modules from package.json where workspaces exist.
installNodeModules() {
    # Fix unlink issue of Yarn, when symlinks exist. On second calling of `yarn install` the symlinks get corrupted and unaccesable (only restarting docker container removes them), because they are being schedualed for deletion by host Windows when files are freed & unused.
    find ./node_modules/@dependency -type l -delete;
    find ./node_modules/@script -type l -delete;
    find ./node_modules  -type l -delete;
    # package manager with workspaces
    yarn install
}

installNodeModules