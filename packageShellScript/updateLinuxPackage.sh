# Run upgrade before update, to prevent errors for upgraded packages.
apt-get upgrade -y; \
apt-get update -y; \
apt-get update -y --fix-missing;
# apt-get -f install
# apt-get install --fix-missing; \
# apt-get upgrade --fix-missing; \
# apt-get -f install; \
# apt-get install aptitude -y; \
# fix some issues with curl insllation
# aptitude -f install libcurl3-gnutls -y; \

# install packages
# Installing these messes up the package list in linux, and results in errors during apt-get update.
# for adding "add-apt-repository" command.
# RUN apt-get install python-software-properties -y;
# RUN apt-get install python3-software-properties -y;
# RUN apt-get install python-software-properties software-properties-common -y;
