let path = require('path') 
let filesystem = require('fs');
let filesystemPromise = require('fs-promise'); // supports "fs-extra" functionality.
let childProcessPromise = require('child-process-promise');

let letsencryptPort = process.env.LETSENCRYPT_PORT;
let email = process.env.EMAIL;
let proxyConfigFolder = 'webappProxyConfig'
let proxyFolderPath = `/app/server/${proxyConfigFolder}`

let webappGithubProxyModule = [
    {
        name: 'talebWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/talebWebapp/master/setup/reverseProxy/production.redbirdConf.js',
    },
    {
        name: 'gazitengWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/gazitengWebapp/master/setup/reverseProxy/production.redbirdConf.js'
    },
    {
        name: 'animalsoundsWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/animalsoundsWebapp/master/setup/reverseProxy/production.redbirdConf.js'
    },
    {
        name: 'radioscannerWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/radioscannerWebapp/master/setup/reverseProxy/production.redbirdConf.js'
    },
    {
        name: 'dentristWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/dentristWebapp/master/setup/reverseProxy/production.redbirdConf.js'
    },
    {
        name: 'assalammdWebapp.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/assalammdWebapp/master/setup/reverseProxy/production.redbirdConf.js'
    },
    {
        name: 'jenkins_continuousDeploymentServer.js',
        url: 'https://raw.githubusercontent.com/myuseringithub/appDeploymentLifecycle/master/jenkins_continuousDeploymentServer.container/reverseProxy/production.redbirdConf.js'
    },
]

let proxy = require('redbird')({
    port: 80,
    xfwd: true, 
    letsencrypt: {
        port: letsencryptPort, 
        path: '/app/certificate'
    },
    ssl: { // Optional SSL proxying.
        port: 443, // SSL port the proxy will listen to.
        // // Default certificates
        // key: keyPath,
        // cert: certPath,
        // ca: caPath // Optional.
        redirect: true // Disable HTTPS autoredirect to this route.
    }
});

if (!filesystem.existsSync(proxyFolderPath)){
    filesystem.mkdirSync(proxyFolderPath);
}

let promiseArray = []
filesystemPromise
    .ensureDir(proxyFolderPath) // directory should be present
    .then(function() { // retrieve proxy configuration for each project.
        webappGithubProxyModule.map((file, i) => {
            let toFile = `${proxyFolderPath}/${file.name}`
            let rawData = file.url
            let promise = childProcessPromise.exec(`curl -o ${toFile} ${rawData}`)
            promiseArray.push(promise)
            console.log(`• Downloading raw data from ${rawData}.\n`)
        })
    })
    .catch(function(error) { throw error })
    .then(function() {
        Promise.all(promiseArray)
            .then(function() {
                filesystem.readdirSync(proxyFolderPath).forEach(function(file) {
                    if(file.substr(file.lastIndexOf('.')+1)) {
                        let filePath = path.join(proxyFolderPath, file)
                        console.log(`\n\n\n\n• Adding ${filePath} to proxy.`)
                        let func;
                        try {
                            func = require(filePath)
                        } catch (error) {
                            throw error
                        }
                        console.log(func) 
                        func(proxy) // initialize proxy configuration with the current running proxy app.
                    }
                });
            })
            .catch(function(error) { throw error })
    }) 


// _____________________________________________________________________________
// Using express with redbird - https://github.com/OptimalBits/redbird/issues/83

// var express  = require('express');
// var app      = express();
// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer();
// var serverOne = 'http://google.com',
//     ServerTwo = 'http://yahoo.com',
//     ServerThree = 'http://example.com';
 
// app.all("/app1/*", function(req, res) {
//     console.log('redirecting to Server1');
//     apiProxy.web(req, res, {target: serverOne});
// });

// app.all("/app2/*", function(req, res) {
//     console.log('redirecting to Server2');
//     apiProxy.web(req, res, {target: ServerTwo});
// });

// app.all("/app2/*", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerThree});
// });

// app.listen(80);
