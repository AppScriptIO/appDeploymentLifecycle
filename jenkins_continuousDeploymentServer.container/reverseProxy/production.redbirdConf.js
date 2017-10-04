// This file would be required in Redbird reverseProxy. 
// USAGE: 

export default function reverseProxy(proxy) {

    let email = process.env.EMAIL
    let domain = 'jenkins.webapp.run'

    proxy.register(domain, 'http://jenkins_jenkins:8080', {
        ssl: {
            letsencrypt: {
                email: email, // Domain owner/admin email
                production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
            }
        }
    });
        
}
