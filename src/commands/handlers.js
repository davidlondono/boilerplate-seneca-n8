import { MathInterface } from '../interfaces';

const handlers =  [
  {
    pin: 'math:sum',
    handler: (msg, resolve) => {
      const { a, b } = msg;
      const response = MathInterface.sum(a, b);
      resolve(response);
    },
  },
  {
    pin: 'math:times',
    handler: async (msg, resolve) => {
      const { a, b } = msg;
      const response = await MathInterface.pow(a, b);
      resolve(response);
    },
  },
];

export default handlers;
