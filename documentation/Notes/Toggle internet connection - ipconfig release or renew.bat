REM REM https://helpdeskgeek.com/networking/release-and-renew-an-ip-address/

REM Not working properly https://stackoverflow.com/questions/929368/how-to-test-an-internet-connection-with-bash
REM ping -n 1 10.0.0.1 | find "TTL=" >nul 
REM if errorlevel 1 ( 
REM     ipconfig /release
REM ) else (
REM     ipconfig /renew
REM )

