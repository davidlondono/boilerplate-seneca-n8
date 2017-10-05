// @flow
const _ = require('lodash');
const handlers = require('./handlers');


const handlerAdder = seneca => (item) => {
  seneca.add(item.pattern, (msg, response) => {
    const successHandler = data => response(null, data);
    Promise.resolve(item.handler(msg, successHandler))
      .then(() => undefined)
      .catch(err => response(err));
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
