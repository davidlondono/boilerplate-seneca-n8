import prefix from './environment';

export default {
  type: 'amqp',
  hostname: process.env[`${prefix}AMQP_HOST`],
  port: process.env[`${prefix}AMQP_PORT`],
  vhost: process.env[`${prefix}AMQP_VHOST`] || '/',
  username: process.env[`${prefix}AMQP_USERNAME`],
  password: process.env[`${prefix}AMQP_PASSWORD`],
  name: process.env[`${prefix}AMQP_NAME`],
};
