const app = require("./index.mjs");
//ecosystem.config.cjs can require this (i.e. ex-"Must use import to load ES Module")
export default {
  "name": "mastercard-backbank-digital-ocean",
  "interpreter": "node",
  "script": app,
  "merge_logs": true,
  "cwd": "./src",
  "env_development": {
    "NODE_ENV": "development"
  },
  "env": {
    "NODE_ENV": "production"
  }
}