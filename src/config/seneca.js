const prefix = require('./environment');

module.exports = {
  type: 'amqp',
  url: process.env[`${prefix}AMQP_URL`],
  name: process.env[`${prefix}SENECA_NAME`],
};
