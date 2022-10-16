
# pm2 [directions](https://youtu.be/ebdKIU6SDHI?t=39)

[`npm install -g pm2`](https://www.youtube.com/watch?v=kR06NoSzAXY&t=285s)

`pm2 start .`

[`pm2 startup`](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

`sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup launchd -u nicholascarducci --hp /Users/nicholascarducci`

`pm2 unstartup launchd`

`brew install bc`

[add pm2 and nginx load balancer](https://medium.com/nerd-for-tech/deploy-your-nodejs-application-to-a-digital-ocean-droplet-step-by-step-guide-3f6f928f776)



# [How to start a package.json script in pm2](https://stackoverflow.com/questions/46008665/how-to-start-a-package-json-script-in-pm2)

~~`pm2.json` and `pm2 start pm2.json`~~

~~`sudo apt install node-babel-cli`~~
~~`sudo apt install babel-cli`~~

a. `sudo apt install @babel/node` ~~`node-babel7`~~

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

(`export PATH=$PATH:node_modules/.bin` `PATH=$(getconf PATH)` `printenv`)

> export PATH=$PATH:node_modules/.bin && pm2 start ecosystem.config.cjs
> export PATH=$PATH:node_modules/.bin && pm2 save
> export PATH=$PATH:node_modules/.bin && pm2 logs --lines 500
> export PATH=$PATH:node_modules/.bin && pm2 kill && rm -rf ~/.pm2 
> export PATH=$PATH:node_modules/.bin && pm2 restart ecosystem.config.cjs

~~`pm2 startup .`~~

~~`node_modules/.bin/pm2 startup .`~~

(4) ~~`node_modules/.bin/`~~ `pm2 start ecosystem.config.cjs` ~~`src/index.mjs`~~

~~c. `node_modules/.bin/pm2 startup`~~

`node_modules/.bin/pm2 save` (4: `Saving current process list... Successfully saved in /home/honcho/.pm2/dump.pm2`)

~~`sudo env PATH=$PATH:/usr/bin /home/honcho/mastercard-backbank-digital-ocean/node_modules/pm2/bin/pm2 startup systemd -u honcho --hp /home/honcho`~~

~~b. `node_modules/.bin/pm2 list`~~
~~`node_modules pm2 list`~~

5. `node_modules/.bin/`(`pm2 logs`)

6. ~~`pm2 stop index` `pm2 delete index` `pm2 save --force`~~

> cd .. && rm -rf mastercard-backbank-digital-ocean && git clone https://github.com/NickCarducci/mastercard-backbank-digital-ocean.git && cd mastercard-backbank-digital-ocean && pm2 start [~~ecosystem.config.cjs~~](https://github.com/Unitech/pm2/issues/1976#issuecomment-1270533822) && pm2 logs --lines 350


# cd mastercard-backbank-digital-ocean && export PATH=$PATH:node_modules/.bin

(`pm2 kill`)

> cd .. && rm -rf mastercard-backbank-digital-ocean && git clone https://github.com/NickCarducci/mastercard-backbank-digital-ocean.git && cd mastercard-backbank-digital-ocean && pm2 start src/index.js && pm2 logs --lines 150

(`pm2 kill && pm2 start src/index.js`)

[`delete node_modules after pm2 save`](https://stackoverflow.com/questions/52683376/pm2-deleted-process-runs-on-startup)

>"a little [[relief,](https://politics.stackexchange.com/questions/76012/isnt-the-optimal-tax-rate-more-dependent-on-technical-inefficiencies-including)] competition ([police/tech](https://commie.dev))]" - [RG](https://www.youtube.com/watch?v=pafY6sZt0FE)

### [Using transpilers with pm2](https://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2)

[(tag batches)](https://docs.digitalocean.com/products/droplets/how-to/tag/)

~~`pm2 connection dynamic port`~~

~~pm2 ssh utc dynamic port`~~

`sudo ufw allow 8080`

`systemctl restart nginx && sudo nginx -t`