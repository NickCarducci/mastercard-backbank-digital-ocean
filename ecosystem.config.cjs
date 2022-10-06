require('babel-register');
const pm2 = require("src/pm2.js");
module.exports = {
  apps: [pm2]
}