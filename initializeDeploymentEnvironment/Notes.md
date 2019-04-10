Shell scripts: 
• # : ${X:=value}; export X # set variable only if if is unset or empty string.
• color formatting - https://misc.flogisoft.com/bash/tip_colors_and_formatting
• console.log with color - https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
• pwd - current working directory in host machine.
• shellscript add tab/indentation to echo - https://stackoverflow.com/questions/34689887/indent-lines-equally-with-echo
___
Docker yml: 
• # bridge for the same host, while overlay is for swarm hosts.
___

package.json: 
• For installing latest commit of a branch-
    "multiplePrototypeChain": "git+https://github.com/AppScriptIO/multiplePrototypeChain.git#build",
Where package-lock.json will contain the exact commit hash.
• For installing from github tags that follow the semver standard: 
    "multiplePrototypeChain": "git+https://github.com/AppScriptIO/multiplePrototypeChain.git#1.0.1", 
    or using v1.0.1

Installation from github repository: 
- Usage of npm `files` property in package.json only works with `npm` command, while yarn ignores it for installations (yarn uses it only on packaging). 
- `files` property sets the file patterns to include in installation. And .npmignore sets the files to ignore from instlalation (eg. `**/*` for ignoring all but those mentioned in the package.json `files` property).
___

.yarnrc: 
• The --*. will make the flag apply to all commands (install, add, etc)
 for example 
    --*.modules-folder "../../node_modules" 
 which changes the install directory
___

Organization of files: 
• dependencies should be able to: 
    1. Be loaded using their name or scope/name (e.g. exist in node_modules folder).
    2. Share similar dependencies/packages that exist in the module's package.json and the encompassing module's package.json
• nesting package can be made by adding a path to the name.
___

Docker for Windows: 
• With LCOW (Linux Containers on Windows, built with LinuxKit), the Docker daemon runs as a Windows process and every time you start a Linux container, Docker launches a minimal Hyper-V hypervisor running a VM with the container processes running on top of it, versus the previous architecture where Hyper-V Linux VM runs a Linux Docker daemon, along with all your containers.
• LCOW Set default platform as linux - https://github.com/moby/moby/issues/35303#issuecomment-347687570
• # LCOW slow build issue to take into consideration - https://github.com/docker/for-win/issues/1771


