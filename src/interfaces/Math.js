

const sum = (a, b) => ({ ok: true, data: (a + b) });

const pow = async (a, b) => ({ ok: true, data: (a * b) });

const bussinessError = async () => ({ error: 'BUSINESS_ERROR', ok: false });
const errorServer = async () => { throw new Error('Server error'); };

module.exports = {
  sum, pow, bussinessError, errorServer,
};
