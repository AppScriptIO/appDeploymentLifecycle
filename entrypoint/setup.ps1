param (
    [switch]$y, # set default vaue
    [switch]$n # set default vaue
)

# Self elevating scriptMust be executed with privilaged permissions.
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) { Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

# prompt question if needed.
if ($y.IsPresent) {
    $shouldInstallNodeModule = 'y'
}
elseif (-Not $n.IsPresent) {
    $shouldInstallNodeModule = Read-Host -Prompt 'Should yarn install package ? (y/n)'
}

try {
    cd $PSScriptRoot/.. # $PSScriptRoot = This is an automatic variable set to the current file's/module's directory
    
    # wsl wslpath -a . # check wsl path
    wsl ./script/windowsSubsystemForLinux/installPackageAndSymlinkConfiguration.sh
    if ($shouldInstallNodeModule -eq 'y') {
        wsl --user root yarn install 
    }

    ## Setup Windows
    refreshenv # update path commands
    echo 'Using `choco` to install.'
    choco install -y nodejs yarn
    refreshenv # refresh path commands
    node ./node_modules/.bin/scriptManager shouldCompileScript=true windows/symlinkConfiguration.js ".symlinkFileConfig()"

    ## Setup WSL 
    wsl yarn run scriptManager shouldCompileScript=true script/windowsSubsystemForLinux/installPackageAndSymlinkConfiguration.js '".nonElevatedCallback()"'
}
catch {
    Write-Error $_.Exception.ToString()
    Read-Host -Prompt "Error occured !"
}

