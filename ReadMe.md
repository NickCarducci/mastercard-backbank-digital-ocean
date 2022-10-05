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

[`npm install -g pm2`](https://www.youtube.com/watch?v=kR06NoSzAXY&t=285s)

`pm2 start .`

[`pm2 startup`](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

`sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup launchd -u nicholascarducci --hp /Users/nicholascarducci`

`pm2 unstartup launchd`

`brew install bc`

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

[add pm2 and nginx load balancer](https://medium.com/nerd-for-tech/deploy-your-nodejs-application-to-a-digital-ocean-droplet-step-by-step-guide-3f6f928f776)

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

vi. `service ssh restart`

2. `cd mastercard-backbank-digital-ocean`

# [How to start a package.json script in pm2](https://stackoverflow.com/questions/46008665/how-to-start-a-package-json-script-in-pm2)

~~`pm2.json` and `pm2 start pm2.json`

`sudo apt install node-babel-cli`
`sudo apt install babel-cli`~~

a. `sudo apt install node-babel7`

[Do we need npm and node for pm2](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps)?

> You may notice a file folder called node in the safeuser directory. It was used during installation, but you no longer need it. `rm -rf /home/honcho/node`

[NPM global packages not available on Ubuntu](https://stackoverflow.com/questions/41287787/npm-global-packages-not-available-on-ubuntu)

~~`sudo env PATH=$PATH:/node_modules/.bin node_modules/.bin/pm2 startup -u honcho`
`sudo export PATH=$PATH:/node_modules/.bin node_modules/.bin/pm2 startup -u honcho`
`sudo export pm2_home=/home/honcho:/node_modules/.bin node_modules/.bin/pm2 startup -u honcho`~~

`cat` - read
`--recursively` | `-R` - list (sub)directories
`ls` - list all directories and/or files in the current folder

~~[droplet .env](https://stackoverflow.com/questions/71367040/environmental-variables-in-digital-ocean-droplets)~~

~~`export PATH=$PATH:/node_modules/.bin`~~

~~`pm2 startup .`

`node_modules/.bin/pm2 startup .`~~
`node_modules/.bin/pm2 start src/index.js`

c. `node_modules/.bin/pm2 startup`

`node_modules/.bin/pm2 save`

`sudo env PATH=$PATH:/usr/bin /home/honcho/mastercard-backbank-digital-ocean/node_modules/pm2/bin/pm2 startup systemd -u honcho --hp /home/honcho`

b. `node_modules/.bin/pm2 list`
~~`node_modules pm2 list`~~