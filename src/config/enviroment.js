import dotenv from 'dotenv';

let environment;
let path;
const env = '.env';
const service = process.env.SERVICE || 'auth';

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
    environment = 'TEST_';
    path = `${process.env.HOME}/.qcams.${service}${env}`;
    break;
}
dotenv.config({ path });
const prefix = environment;
export default prefix;
