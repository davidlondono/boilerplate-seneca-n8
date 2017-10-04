// @flow
import _ from 'lodash';
import handlers from './handlers';

const errorParser = response => (err: Error) => {
  if (err.code === 100) {
    response(null, { error: err.message, ok: false });
  } else {
    response(err);
  }
};

const handlerAdder = seneca => (item) => {
  seneca.add(item.pattern, (msg, response) => {
    const successHandler = data => response(null, { ok: true, data });
    const errorHandler = errorParser(response);
    Promise.resolve(item.handler(msg, successHandler))
      .then(() => undefined)
      .catch(errorHandler);
  });
};
const start = () => (function startHandlers() {
  _.each(handlers, handlerAdder(this));
});

export default { start };
