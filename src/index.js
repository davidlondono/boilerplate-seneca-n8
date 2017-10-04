import logger from './logger';
import server from './server';


server.start().then(() => {
  logger.info('server started');
}).catch((err) => {
  logger.error('start error', err);
});
