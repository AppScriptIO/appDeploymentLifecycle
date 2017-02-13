var proxy = require('redbird')({port: 80, xfwd: false});
 
proxy.register("jenkins.webapp.run", "http://jenkins_jenkins:8080");
proxy.register("dentrist.com", "http://dentristwebapp_wordpress:80");

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
