#!/bin/bash 
# path and name of file:
# Accepts 3 parameters: $1 is path to shared folder in VM, $2 is path to shellScripts folder, $3 the name of the file to print.
# Usage: 
#   printf '%s - Description of process.' "$(source $1/$2/printScriptPath.sh $1 $2 $BASH_SOURCE)"
# Top level script invoked by Vagrant will output wrong filename, as it is copied and applied directly.

message="SZN - Executing: $1/$2/$3"
printf '\e[1;47m%-6s\e[m' "$message"

# ______________________________________
# Comments possible commands: 
# http://stackoverflow.com/questions/192319/how-do-i-know-the-script-file-name-in-a-bash-script
# Colors - http://stackoverflow.com/questions/5412761/using-colors-with-printf

#echo "SZN - Executed file: ${0%/*}/${0##*/}"
#echo $(basename "$1")
#echo $(dirname "$1")
#echo $(cd "$(dirname "$1")"; pwd)
#echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"

# This works:
# $BASH_SOURCE
#printf '$BASH_SOURCE is: %s\n' "$0" "$BASH_SOURCE"

 #echo "# arguments called with ---->  ${@}     "
 #echo "# \$1 ---------------------->  $1       "
 #echo "# \$2 ---------------------->  $2       "
 #echo "# path to me --------------->  ${0}     "
 #echo "# parent path -------------->  ${0%/*}  "
 #echo "# my name ------------------>  ${0##*/} "