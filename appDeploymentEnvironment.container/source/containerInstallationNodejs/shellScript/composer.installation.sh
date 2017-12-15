#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ Composer - run in a subshell, so that current directory is not changed.
    (cd ~; curl -sS https://getcomposer.org/installer | php; mv composer.phar /usr/local/bin/composer)
elif [ $1 == "uninstall" ]; then
    rm -r /usr/local/bin/composer;
fi;
