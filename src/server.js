const seneca = require('seneca');
const Commands = require('./commands');
const logger = require('./logger');
const senecaConfig = require('./config/seneca');


const start = () => {
  const commands = Commands.start();
  senecaConfig.pin = commands.pins;
  const listener = seneca()
    .use('seneca-amqp-transport')
    .use(commands.plugin)
    .listen(senecaConfig);
  // start server
  return new Promise((fulfill) => {
    listener.ready((e) => {
      logger.info('listener is done');
      fulfill(e);
    });
  });
};
module.exports = { start };
