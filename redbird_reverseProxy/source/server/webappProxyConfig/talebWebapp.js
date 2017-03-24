// This file would be required in Redbird reverseProxy. 
// USAGE: 

export default function reverseProxy(proxy) {

    let email = process.env.EMAIL
    let domain = 'taleb.io'

    proxy.register(domain, 'http://talebwebapp_nodejs:80', {
        ssl: {
            letsencrypt: {
                email: email, // Domain owner/admin email
                production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
            }
        }
    });
    proxy.register('api.' + domain, 'http://talebwebapp_nodejs:8082', {
        ssl: {
            letsencrypt: {
                email: email, // Domain owner/admin email
                production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
            }
        }
    });
    proxy.register('cdn.' + domain, 'http://talebwebapp_nodejs:8081', {
        ssl: {
            letsencrypt: {
                email: email, // Domain owner/admin email
                production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
            }
        }
    });
    proxy.register('rethinkdb.' + domain, 'http://talebwebapp_rethinkdb:8080');

}
