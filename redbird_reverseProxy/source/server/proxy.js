let filesystem = require('fs');
let filesystemPromise = require('fs-promise'); // supports "fs-extra" functionality.
var childProcessPromise = require('child-process-promise');

let letsencryptPort = process.env.LETSENCRYPT_PORT;
let email = process.env.EMAIL;
let webappGithubModule = [
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
        url: 'https://raw.githubusercontent.com/myuseringithub/appDeploymentLifecycle/master/jenkins_continuousDeploymentServer/reverseProxy/production.redbirdConf.js'
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

let promiseArray = []
let webappGithubModuleFolder = 'webappProxyConfig'
filesystemPromise.ensureDir('/app/server/' + webappGithubModuleFolder).then(function() {
    webappGithubModule.map((file, i) => {
        let promise = childProcessPromise.exec('curl -o /app/server/webappProxyConfig/' + file.name + ' ' + file.url)
        promiseArray.push(promise)
    })
})
Promise.all(promiseArray).then(function() {
    filesystem.readdirSync('/app/server/webappProxyConfig').forEach(function(file) {
        require("/app/server/webappProxyConfig/" + file)(proxy);
    });
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
