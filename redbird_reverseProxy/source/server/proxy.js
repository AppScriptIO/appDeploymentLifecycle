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
]

var proxy = require('redbird')({
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
filesystemPromise.ensureDir('/app/server/webappProxyConfig').then(function() {
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

// proxy.register('gaziteng.com', 'http://gazitengwebapp_wordpress:80', {
//     ssl: {
//         letsencrypt: {
//             email: email, // Domain owner/admin email
//             production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
//         }
//     }
// });


// proxy.register('radioscanner.webapp.run', 'http://radioscannerwebapp_nodejs:80');
// proxy.register('stream.radioscanner.webapp.run', 'http://radioscannerwebapp_apachestreamproxy/:80');

// proxy.register('animalsounds.webapp.run', 'http://animalsoundswebapp_nodejs:80', {
//     ssl: {
//         letsencrypt: {
//             email: email, // Domain owner/admin email
//             production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
//         }
//     }
// });

// proxy.register('jenkins.webapp.run', 'http://jenkins_jenkins:8080', {
//     ssl: {
//         letsencrypt: {
//             email: email, // Domain owner/admin email
//             production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
//         }
//     }
// });

// proxy.register('assalammd.com', 'http://assalammdwebapp_wordpress:80', {
//     ssl: {
//         letsencrypt: {
//             email: email, // Domain owner/admin email
//             production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
//         }
//     }
// });

// // TODO: Fix cross origin http in https, seems as if `upgrade` header doesn't work well in apache config wiht browser throgh http config file.
// proxy.register('dentrist.com', 'http://dentristwebapp_wordpress:80', {
//     ssl: {
//         letsencrypt: {
//             email: email, // Domain owner/admin email
//             production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
//         }
//     }
// });


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
