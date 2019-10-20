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
