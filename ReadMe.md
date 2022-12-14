>*Look, ma!* I'm a bank! (OCC BIN.6 TRANSACTION SWIFT ORDER BIC.8 - *12.1.5*, or [snipcart (credit)](https://github.com/NickCarducci/vaumoney/blob/maintenance/src/Authentication/Links/index.js))

# [Using Caching to Smooth Traffic Spikes](https://www.nginx.com/blog/mitigating-ddos-attacks-with-nginx-and-nginx-plus/)

## nginx web app firewall vs perl config server firewall

> [Wouldn't the best DDOS defense be a service that caches a request from the browser? Can the World Wide Web Consortium (W3C) enable this for the hypertext transfer flag for all methods from a certain device? Wouldn't this behest a convict intranet?](https://docs.nginx.com/nginx-app-protect/configuration-guide/configuration/) Whose idea was it for browsers to not be forced cached on [all methods of the hypertext transfer protocol](https://www.linuxjournal.com/article/8706)?

`npm install mastercard-locations --save`

## Droplet (ubuntu)

````
ssh-keygen -t rsa
````
accept the default `/Users/nicholascarducci/.ssh/id_rsa`

[How to create a non-root user](https://youtu.be/LbJK48gvXcA?t=140)

chmod so only the current `~` user can see

````
cd ~
chmod 700 .ssh
````
chmod 600 w/o execution
````
cd ~
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
````

`cntl+D` exits ubuntu

`ssh nicholascarducci@142.93.58.216`

domain host `NS` and `A` records with pointing to droplet IP `142.93.58.216`

`mkdir -pv ~/.config/letsencrypt` [`cli.ini`](https://getgrav.org/blog/macos-monterey-apache-ssl)
````
work-dir = /opt/homebrew/etc/certbot   
logs-dir = /opt/homebrew/etc/certbot/logs   
config-dir = /opt/homebrew/etc/certbot/certs 
````
>"Now we can run certbot without requiring sudo which would limit our ability to run Apache as a non-root user."

`sudo certbot certonly --standalone`

possibly: [`~/.ssh/sshd_config`](https://www.digitalocean.com/community/tutorials/how-to-harden-openssh-on-ubuntu-20-04)
````
PermitRootLogin prohibit-password to PermitRootLogin yes 
PasswordAuthentication no to PasswordAuthentication yes
````

### Access>Droplet Console [Non-Root-Users](https://www.digitalocean.com/community/questions/how-to-enable-ssh-access-for-non-root-users)

`useradd -m -d /home/honcho honcho`

`passwd honcho` set _

`usermod -aG sudo honcho`

`mkdir /home/honcho/.ssh`

~~`sudo mv /root/.ssh/authorized_keys /home/honcho/.ssh/` [use _](https://www.vultr.com/docs/using-your-ssh-key-to-login-to-non-root-users/)~~

`sudo chown -R honcho:honcho /home/honcho/`~~[`.ssh`](https://shandou.medium.com/testing-out-digitalocean-droplet-1-steps-for-ssh-into-droplet-as-non-root-user-with-sudo-access-c2a7a5229cd6)~~

~~`ssh honcho@142.93.216`~~

`sudo apt-get update`

~~`sudo apt-get install nodejs`

[Gatsby's instructions on cloning into pwd /home/honcho](https://www.gatsbyjs.com/docs/deploying-to-digitalocean-droplet/)~~

3. `git clone https://github.com/NickCarducci/mastercard-backbank-digital-ocean.git`

`cd mastercard-backbank-digital-ocean`

~~`sudo apt-get install npm`
`sudo npm install`~~

try to save on size by uploading `node_modules` and `package-lock.json`

## [Enabling External Access for Your Regular User](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04)

~~`rsync --archive --chown=honcho:honcho ~/.ssh /home/honcho`~~

1. `cat /home/honcho/.ssh/authorized_keys`

[`cat /home/root/.ssh/authorized_keys`](https://webapps.stackexchange.com/questions/149530/how-can-i-view-which-of-my-ssh-keys-a-digitalocean-vps-can-use)

[try again](https://www.digitalocean.com/community/questions/how-to-switch-from-password-to-ssh-key-authentication)

i. `ssh-keygen -t rsa -b 4096 -C "nmcarducci@gmail.com"`

ii. (as root [i.e. ex.ubuntu_droplet_console]) `nano ~/.ssh/authorized_keys`

iii. paste public key

iv. `cntl+O` + `enter/return` + `yes` (save) + `cntl+X`

v. [uncomment PubKeyAuthentication yes and ](https://bendurham.dev/posts/enabling-ssh-keys-digital-ocean)

vi. `service ssh restart` (*** System restart required ***)

2. `cd mastercard-backbank-digital-ocean`

`~/.ssh --recursively`

~~[Uncomplicated Firewall (ufw)](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04)~~

~~[How to Configure Firewall Rules](https://docs.digitalocean.com/products/networking/firewalls/how-to/configure-rules/)~~

Use [spaces]](https://www.easydeploy.io/blog/setting-cors-mechanism-digital-ocean-servers/) for request.header.origin rules and allow headers, cors

[Forward  ports: How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

(`sudo apt remove nginx --purge`)

(`sudo apt install && sudo apt autoremove`)

i. `sudo apt update && sudo apt install nginx && sudo ufw app list`

> sudo ufw enable

ii. `sudo ufw allow 'Nginx HTTPS' && sudo ufw status && systemctl status nginx`

iii. `sudo mkdir -p /var/www/vault-co.in/html`

iv. `sudo chown -R $USER:$USER /var/www/vault-co.in/html && sudo chmod -R 755 /var/www/vault-co.in`

v. `sudo nano /var/www/vault-co.in/html/index.html`

````
<html>
    <head>
        <title>Welcome to vault-co.in's</title>
    </head>
    <body>
        <h1>domain server block. please visit vau.money.</h1>
    </body>
</html>
````
(`nginx -t -c /etc/nginx/nginx.conf`)

(`sudo nano /lib/systemd/system/nginx.service`)

(`sudo systemctl enable nginx.service`)

vi. `sudo nano /etc/nginx/sites-available/vault-co.in` [proxy](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching)

````
server {

        listen 80;
        listen [::]:80;

        root /var/www/vault-co.in/html; # absolute path nginx vars
        index index.html index.htm index.nginx-debian.html;

        location ~ {
                proxy_pass https://142.93.58.216:8080;
                proxy_redirect https://142.93.58.216:8080/ https://$host;
                proxy_set_header        X-Real-IP       $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /.well-known {
            alias /var/www/validation/;
        }

        server_name vault-co.in www.vault-co.in;

        location / {
                try_files $uri $uri/ =404;
        }

}
````
sudo rm -rf /etc/nginx/sites-enabled/ && sudo mkdir /etc/nginx/sites-enabled && sudo certbot --nginx -d vault-co.in -d [www.vault-co.in](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)
````

server {

        listen 80;
        listen [::]:80;

        root /var/www/vault-co.in/html; # absolute path nginx vars
        index index.html index.htm index.nginx-debian.html;

        location ~ {
                proxy_redirect https://142.93.58.216:8080/ https://$host;
        }

        server_name vault-co.in www.vault-co.in;

        location / {
                try_files $uri $uri/ =404;
        }

}
````
# NGINX [directory](https://serverfault.com/a/527644/987831)

`certbot` xii. will make `/etc/nginx/sites-available/vault-co.in`, too

>When the [proxy_pass](https://serverfault.com/questions/849989/nginx-proxy-pass-wildcard-config) contains no path component, nginx will append the normalized URI of the request to the host part of proxy_pass directive.

````
server {
    if ($host = www.vault-co.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = vault-co.in) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80;
        listen [::]:80;

        root /var/www/vault-co.in/html; # absolute path nginx vars
        index index.html index.htm index.nginx-debian.html;

        location ~ {
                proxy_pass http://142.93.58.216:8080;
                proxy_redirect https://142.93.58.216:8080/ https://$host;
        }

        server_name vault-co.in www.vault-co.in;

        location / {
                try_files $uri $uri/ =404;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/vault-co.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/vault-co.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    return 404; # managed by Certbot
}
````
(`sudo nano /etc/nginx/sites-available/vault-co.in`)

(`sudo rm -rf /etc/nginx/sites-enabled/ && sudo mkdir /etc/nginx/sites-enabled && sudo ln -s /etc/nginx/sites-available/vault-co.in /etc/nginx/sites-enabled/ && sudo systemctl restart nginx`)

vii. `sudo ln -s /etc/nginx/sites-available/vault-co.in /etc/nginx/sites-enabled/`

viii. `sudo nano /etc/nginx/nginx.conf`

>uncomment `server_names_hash_bucket_size 64;`

ix. `sudo nginx -t`

>nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
>nginx: configuration file /etc/nginx/nginx.conf test is successful

x. `sudo systemctl restart nginx`

xi. [`sudo apt install certbot python3-certbot-nginx`](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

xii. `sudo certbot --nginx -d vault-co.in -d www.vault-co.in`

(kill -HUP `/var/run/nginx.pid`)

([`sudo lsof -i:8080`](https://laracasts.com/discuss/channels/general-discussion/cant-restartreload-nginx-in-my-ubuntu-droplet))

`sudo systemctl start nginx.service`

> A www host

## [(`sudo apt-get purge nginx nginx-common nginx-full`)](https://serverfault.com/questions/348165/i-accidentally-deleted-etc-nginx-reinstalling-nginx-wont-recover-it)

`systemctl status nginx`

`systemctl start nginx`

`systemctl stop nginx`

`sudo journalctl -xeu nginx.service`

`systemctl restart nginx && nginx -t`

`ps auxf | grep nginx`

`sudo chown -R www-data:www-data /var/www/vault-co.in`

[API-GATEWAY  nginx](https://www.nginx.com/blog/deploying-nginx-plus-as-an-api-gateway-part-1)

exclusion cheat fraud [chance](https://stackoverflow.com/a/13909534/11711280)

# [Snapd](https://www.linode.com/docs/guides/enabling-https-using-certbot-with-nginx-on-ubuntu/)???

sudo certbot --nginx -d vault-co.in -d www.vault-co.in

(login recovery console)
vaumoney: root
password: _
sudo ufw disable

`sudo ufw enable`

[`sudo ufw allow 22/tcp`](https://www.digitalocean.com/community/questions/sudo-ufw-status-return-inactive)

`sudo ufw default deny`

`sudo ufw show added`

> [`sudo ufw disable && sudo ufw enable`](https://wiki.ubuntu.com/UncomplicatedFirewall) After modifying any of the above files, activate the new settings with.

not secular, orthodox

Are good people not normal? Is that why not many run, and if they do, they aren't?

now all that is left to do is everyone smd

GS "merger fees" + Is the capitalization of a bank either more dependent on the required reserve ratio or central bank funds rate? The banks are capitalized by good will value, not concurrentable value. Should we continue paying back debts rather than claim the public good will right to own is surrendered and/or loitered?

A natural normal

### [`sudo apt remove ufw`](https://www.cloudbooklet.com/how-to-secure-your-ubuntu-server-with-csf-firewall/)

`sudo tail -n 10 /var/log/nginx/error.log`