#!/bin/bash

if [ -z "$1" ]; then 
    #⭐ install Gulp
    # npm install gulp -g;
    npm install gulpjs/gulp.git#4.0 -g
    npm install gulp-cli -g;
elif [ $1 == "uninstall" ]; then
    npm uninstall gulpjs/gulp.git#4.0 -g
    npm uninstall gulp-cli -g;
fi;

# Print Horizontal Line
source $(dirname -- "$0")/printHorizontalLine.sh