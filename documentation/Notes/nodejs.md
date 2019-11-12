# Nodejs:
- .yarnrc:
    • The --*. will make the flag apply to all commands (install, add, etc)
    for example
        --*.modules-folder "../../node_modules"
    which changes the install directory
- Unlink yarn issue fix:
    `find ./node_modules/@dependency -type l -delete;  find ./node_modules  -type l -delete; yarn install`
- Nodejs Debugger:
    `ndb` relies on `puppeteer` chrome headless nodejs module. Bring debugging with more features than the built-it Nodejs V8 Inspector provides.
    Issues:
    - Couldn't get it installed on WSL. The `puppeteer` headless chrome doesn't work. Documented opened issues present. 31.01.2019


# Package manager 
- if pacakge manager fails to resolve packages:
    - check connectivity using `ping` in WSL, antivirus maybe blocking connections on some packets. WebRoot for some reason suddently started blocking WSL, in this case reinstall the program.
    - check the firewall settings - node maybe blocked or VSCode editor.
    - Try installing with sudo permissions.
    - Try cleaning cache `yarn cache clean`
