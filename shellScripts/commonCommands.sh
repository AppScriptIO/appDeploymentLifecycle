#!/bin/bash
echo "SZN - executing commonCommands..."
echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"
# software-properties-common allows to add repositories using apt-add-repository.
apt-get install -y software-properties-common
