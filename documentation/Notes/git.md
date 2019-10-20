# Git
- Git Clone using linux symlinks:
    - change unix symlinks in the cloned repository to Windows symlinks
    - https://stackoverflow.com/questions/5917249/git-symlinks-in-windows

    ``` set symlinks always to true but Windows symlinks have issues the way Git creates them.
    git config --global core.symlinks false

    # Example of usage independent of git configuration
    git clone -c core.symlinks=true <URL>
    ```
- Submodules:
    - https://stackoverflow.com/questions/1777854/how-can-i-specify-a-branch-tag-when-adding-a-git-submodule
- Lineendings:
    - https://stackoverflow.com/questions/2517190/how-do-i-force-git-to-use-lf-instead-of-crlf-under-windows
    - Handling line endings on Windows for git, preventing false modified status for git repos because of line endings:
        ```
        git config --global core.autocrlf true
        # Configure Git on Windows to properly handle line endings
        ```
    -  https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_formatting_and_whitespace
    ```
    # in windows msysgit
    git config --global core.autocrlf false
    git config --global core.eol lf
    ```
- configuration: 
    - https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Where-system-global-and-local-Windows-Git-config-files-are-saved

    - Change location of .gitignore for git repositories - Changes should be made in Windows git command and in WSL git, as visual git programs use Windows git.
        [1] # local user OS git configuration.
        git config --global --edit 
        git config --global core.excludesfile ./configuration/.gitignore

        [2] # gitignore is symlinked to the root directory to allow `GitKraken` visual tool to work, as it doesn't read the `core.excludesfile` option
    - Setting username
        ```
        # saved globally
        git config --system --edit 

        # Other configs: 
        git config --user --edit 
        git config --global --edit 
        ```

- Working with multiple git branches simultaneously:
    - http://www.elmund.io/2016/01/11/working-on-multiple-git-branches-simultaneously/
