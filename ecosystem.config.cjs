require('babel-register');
const pm2 = require("./pm2.js");
module.exports = {
  apps: [pm2]
}