'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const errorParser = response => err => {
  if (err.code === 100) {
    response(null, { error: err.message, ok: false });
  } else {
    response(err);
  }
};

const handlerAdder = seneca => item => {
  seneca.add(item.pattern, (msg, response) => {
    const successHandler = data => response(null, { ok: true, data });
    const errorHandler = errorParser(response);
    Promise.resolve(item.handler(msg, successHandler)).then(() => undefined).catch(errorHandler);
  });
};
const start = () => function startHandlers() {
  _lodash2.default.each(_handlers2.default, handlerAdder(this));
};

exports.default = { start };