const { MathInterface } = require('../interfaces');

const handlers = [
  {
    pattern: 'math:sum',
    handler: (msg, resolve) => {
      const { a, b } = msg;
      const response = MathInterface.sum(a, b);
      resolve(response);
    },
  },
  {
    pattern: 'math:times',
    handler: async (msg, resolve) => {
      const { a, b } = msg;
      const response = await MathInterface.pow(a, b);
      resolve(response);
    },
  },
  {
    pattern: 'math:error',
    handler: async (msg, resolve) => {
      const response = await MathInterface.errorServer();
      resolve(response);
    },
  },
  {
    pattern: 'math:bussinesError',
    handler: async (msg, resolve) => {
      const response = await MathInterface.bussinessError();
      resolve(response);
    },
  },
];

module.exports = handlers;
