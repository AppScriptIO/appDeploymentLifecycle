# TODO: implement the below manual steps into the production module (entrypoint) so that using the javascript code the required settings for letsencrypt certbot are configures.

Steps using visual tools: 
• Add new service account with predefined roles "DNS Administrator" which includes all permissions for DNS changes. 
• Stop VM & Edit VM and choose the newly created Service account that has the permissions. And restart VM.
• Run docker "cerbot-dns-google' plugin contianer.
• Trigger certificate issuance.
• change permissions for /etc/letsencrypt/live folder 