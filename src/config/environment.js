const dotenv = require('dotenv');

let environment;
let path;
const env = '.env';
const service = process.env.SERVICE;
const platform = process.env.PLATFORM;

switch (process.env.NODE_ENV) {
  case 'develop':
    environment = 'DEV_';
    path = `/src/${env}`;
    break;
  case 'production':
    environment = '';
    path = `/src/${env}`;
    break;
  default:
    environment = '';
    path = '.env.test';
    break;
}
dotenv.config({ path });
const prefix = environment;
module.exports = prefix;