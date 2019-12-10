# appDeploymentLifecycle
- Contains scripts and instructions to provision machines.
- **Local Machine** - This repository is cloned to the local environment and files are installed from it to the OS (usually by symlinking). 
    - _In addition it contains personal development notes._
- **Production Machine** - Configurations and scripts related to IaaS setup (e.g. Google Compure Engine) are used to replicate a production environment.
- **Continues Deployment** - Instructions for setting up the applications deployment lifecycle, e.g. Configurations for CI & CD server for automating deployment process.
- **Projects Generator** 
- Architecture of modules includes the main application code (foundation) and the other adapter code (adapter). [CLI & API adateprs](/documentation/DesignPatternsConceptsConventions/cliAndApi.md)
        Similar terminology of https://github.com/material-components/material-components-web/tree/master/docs/code. 

Resources folder -
•  contains configuration files that are version controlled for WSL, Windows OS, and deployment VMs/Containers provisionning. In addition to setup instruction notes.

[Guide to setting up Windows environment for development](./systemProvisionGuide/"Guide to setting up Windows environment for development.md")

[Glossary for terms used in related projects](./documentation/glossary.md)

# Version limits: 
- Node version 12: limited by the required libgit2 version available for WSL 1 Debian 10. Currently the only supported libgit2 version for Debian 10 is version libgit2-27, which limits the node dependency nodegit to 0.25 which works only on node <12.
    - Check frequency for support of libgit2-28 for debian 10 - https://packages.debian.org/search?searchon=sourcenames&keywords=libgit2
___

# Usage: 
# in elevated powershell: 
yarn run provisionOS
___

[TODO list](/documentation/todo-list.md)

___

### 🔑 License: [MIT](/.github/LICENSE)
