'use strict';

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.start().then(() => {
  _logger2.default.info('server started');
}).catch(err => {
  _logger2.default.error('start error', err);
});