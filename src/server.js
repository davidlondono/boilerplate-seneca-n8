const seneca = require('seneca');
const Commands = require('./commands');
const logger = require('./logger');
const amqpConfig = require('./config/amqp');

const start = () => {
  // get plugin with interfaces
  const commands = Commands.start();
  amqpConfig.pin = commands.pins;

  // create listener
  const listener = seneca()
    .use('seneca-amqp-transport')
    .use(commands.plugin)
    .listen(amqpConfig);

  // start server
  return new Promise((fulfill) => {
    listener.ready((e) => {
      logger.info('listener is done');
      fulfill(e);
    });
  });
};
module.exports = { start };
