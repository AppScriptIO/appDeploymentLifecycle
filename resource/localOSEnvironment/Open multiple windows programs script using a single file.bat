@echo off

cd "C:\Users\Entrepreneur\AppData\Local\Google\Chrome SxS\Application\"
start chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

cd "C:\Program Files\Git\"
start git-bash.exe --cd-to-home

cd "C:\Users\Entrepreneur\AppData\Local\Programs\Fiddler\"
start Fiddler.exe

cd "C:\Program Files\Microsoft VS Code Insiders\"
start "Code - Insiders.exe"

exit