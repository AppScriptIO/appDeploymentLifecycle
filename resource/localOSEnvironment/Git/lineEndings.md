- Handling line endings on Windows for git, preventing false modified status for git repos because of line endings: 
    
```
        git config --global core.autocrlf true
        # Configure Git on Windows to properly handle line endings
```

____

[InternetShortcut]
URL=https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_formatting_and_whitespace

in windows msysgit
git config --global core.autocrlf false
git config --global core.eol lf
