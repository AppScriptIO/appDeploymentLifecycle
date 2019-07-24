printf '%s\n' "• Error: Must copy & paste command from this file." >&2  # write error message to stderr
exit 1

# [1] Windows OS setup
cmd.exe
node ./script/setupOS.js

# [2] WSL setup
wsl.exe
./script/setupWSL.sh