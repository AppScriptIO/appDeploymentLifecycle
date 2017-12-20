#!/bin/bash

if [ -z "$1" ]; then 
    # # PHP7 installation using exaternal repository 
    # export LANG=C.UTF-8
    # add-apt-repository ppa:ondrej/php -y;
    # apt-get update -y
    # apt-get install -y php7.1

    # ⭐ PHP7
    apt-get install -y apt-transport-https lsb-release ca-certificates;
    wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg;
    echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/.s.list.d/php.list;
    apt-get update -y
    apt-get install php7.1 -y
    # apt-get install php-pear -y
    apt-get install php7.1-zip -y
    # install php zip extension using PECL (PEAR's sister) - http://blogs.fsfe.org/samtuke/?p=333
    # pecl install zip
elif [ $1 == "installZipExtension" ]; then # in dockerfile :# RUN /tmp/shellScript/php7.installation.sh installZipExtension;
    apt-get update -y;
    apt-get install zlib1g-dev -y;
    pecl install zip -y;
    echo 'extension=zip.so' >> /usr/local/etc/php/php.ini
elif [ $1 == "uninstall" ]; then
    apt-get remove -y apt-transport-https lsb-release ca-certificates;
    apt-get remove -y php7.1 php7.1-zip;
fi;
