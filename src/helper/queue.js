const logger = require('../logger');


module.exports = seneca => queue => (msg) => {
  logger.debug('Publish on interface', queue, 'with data', msg);
  return new Promise((resolve, reject) => {
    seneca.act(queue, msg, (err, res) => {
      if (err) {
        return reject(err);
      }
      const { data, error, ok } = res || {};
      if (!ok) {
        const businessError = new Error(error);
        businessError.bussiness = true;
        return reject(businessError);
      }
      return resolve(data);
    });
  });
};
