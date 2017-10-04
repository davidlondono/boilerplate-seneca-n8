'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = _winston2.default.createLogger({
  transports: [new _winston2.default.transports.Console(), new _winston2.default.transports.File({ filename: 'combined.log' })]
});

exports.default = logger;