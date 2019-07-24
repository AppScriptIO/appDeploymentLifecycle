

# Installation from github repository: 
- Usage of npm `files` property in package.json only works with `npm` command, while yarn ignores it for installations (yarn uses it only on packaging). 
- `files` property sets the file patterns to include in installation. And .npmignore sets the files to ignore from instlalation (eg. `**/*` for ignoring all but those mentioned in the package.json `files` property).

# For installing latest commit of a branch-
•    "multiplePrototypeChain": "git+https://github.com/AppScriptIO/multiplePrototypeChain.git#build",
Where package-lock.json will contain the exact commit hash.
• For installing from github tags that follow the semver standard: 
    "multiplePrototypeChain": "git+https://github.com/AppScriptIO/multiplePrototypeChain.git#1.0.1", 
    or using v1.0.1

