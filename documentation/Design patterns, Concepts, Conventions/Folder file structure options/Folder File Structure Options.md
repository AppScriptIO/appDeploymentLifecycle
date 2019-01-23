# Possible suggestions for organization and folder naming.
test / spec,
library / assets / vendor,
source (raw code) app,
web, 
dist (distribution) / build, 
setup, 
tools / utilities, 
docs documentations,
https://gist.github.com/lancejpollard/1398757

Project - stored as a git repository
    dependency - external libraries
    setup - files related to configuration of the app on runtime and on services related to deployment.
        configuration - bare sets of configurations used by the app or other deployment services.

___

# Script Folder
This folder contains scripts that are used to startup/run the application in different modes spinning up containers
Other names possible - coorginatingScript, startupScript, runScript, procedureScript.

e.g. initial running container, testing, build, development, etc. Run on the local host machine to setup the development environment.

Coordinating script - scripts that are used to run other programs. intended for coordinating things between other programs, rather than for writing in applications directly.
A "script" is code written in a scripting language. A scripting language is nothing but a type of programming language in which we can write code to control another software application.
