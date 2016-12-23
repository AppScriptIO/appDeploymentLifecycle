#!/bin/bash
# path and name of file:
# Accepts 3 parameters: $1 is path to shared folder in VM, $2 is path to shellScripts folder, $3 the name of the file to print.
# Usage: source $1/$2/printScriptPath.sh $1 $2 ${0##*/}
# http://stackoverflow.com/questions/192319/how-do-i-know-the-script-file-name-in-a-bash-script
printf "(Executing: %s)" "$1/$2/$3"
# ______________________________________
# Comments possible commands: 

# echo "SZN - Executed file: ${0%/*}/${0##*/}"
# $(basename "$1")
# $(dirname "$1")
# $(cd "$(dirname "$1")"; pwd)
# echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"

# This works:
# echo "# arguments called with ---->  ${@}     "
# echo "# \$1 ---------------------->  $1       "
# echo "# \$2 ---------------------->  $2       "
# echo "# path to me --------------->  ${0}     "
# echo "# parent path -------------->  ${0%/*}  "
# echo "# my name ------------------>  ${0##*/} "
