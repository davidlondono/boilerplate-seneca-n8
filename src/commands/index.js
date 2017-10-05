// @flow
const _ = require('lodash');
const handlers = require('./handlers');

const errorParser = response => (err) => {
  if (err.code === 100) {
    response(null, { error: err.message, ok: false });
  } else {
    response(err);
  }
};

const handlerAdder = seneca => (item) => {
  seneca.add(item.pattern, (msg, response) => {
    const successHandler = data => response(null, data);
    const errorHandler = errorParser(response);
    Promise.resolve(item.handler(msg, successHandler))
      .then(() => undefined)
      .catch(errorHandler);
  });
};


const plugin = (function startHandlers() {
  _.each(handlers, handlerAdder(this));
});
const pins = () => _.map(handlers, 'pattern');
const start = () => ({
  plugin,
  pins: pins(),
});

module.exports = { start };
