const _ = require('lodash');
const AMQP_CONFIG = require('../config/amqp');
const services = require('../config/services');
const queueFactory = require('../helper/queue');

const seneca = require('seneca')()
  .use('seneca-amqp-transport');

const start = () => _.reduce(services, (publisher, service) => {
  // use AMQP config globla
  const amqpConfig = _.clone(AMQP_CONFIG);

  // custom config with service parameters
  const { name, pin, alias } = service;
  amqpConfig.name = name.toLowerCase();
  amqpConfig.pin = pin;

  // seneca client using service config
  const client = seneca.client(amqpConfig);

  // create queue manager with this seneca
  const queue = queueFactory(client);

  // create the commands using the queue of each pin
  const commands = _.reduce(pin, (t, feature) => {
    const [, nameFeature] = _.split(feature, ':');
    if (!nameFeature) {
      throw new Error(`pin ${feature} of service ${name} dont match 'service:command'`);
    }
    // add queue of a pin
    t[nameFeature] = queue(feature);
    return t;
  }, {});
  // add commands on to the service name
  publisher[alias || name] = commands;
  return publisher;
}, {});

module.exports = start();
