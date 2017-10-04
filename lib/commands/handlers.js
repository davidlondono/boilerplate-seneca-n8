'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interfaces = require('../interfaces');

const handlers = [{
  pin: 'math:sum',
  handler: (msg, resolve) => {
    const { a, b } = msg;
    const response = _interfaces.MathInterface.sum(a, b);
    resolve(response);
  }
}, {
  pin: 'math:times',
  handler: async (msg, resolve) => {
    const { a, b } = msg;
    const response = await _interfaces.MathInterface.pow(a, b);
    resolve(response);
  }
}];

exports.default = handlers;