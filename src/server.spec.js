const senecaConfig = require('./config/seneca');
const commands = require('./commands')
const server = require('./server');
const seneca = require('seneca');
const Promise = require('bluebird');
const test = require('ava');


const { pins } = commands.start();
senecaConfig.pin = pins;
const listener = seneca({ timeout: 500 })
  .use('seneca-amqp-transport')
  .client(senecaConfig);

listener.actAsync = Promise.promisify(listener.act);
const act = Promise.promisify(listener.act, { context: listener });


test.before(() => server.start());

test.cb('make a sum', (t) => {
  return listener.act({ math: 'sum', a: 1, b: 5 }, (e, msg) => {
    console.log(e, msg);
    if (e) {
      return t.fail(e);
    }
    const { data } = msg;
    t.is(data, 6);
    t.end();
  });
});


test('make a sum promise', async (t) => {
  t.plan(1);
  await listener.actAsync({ math: 'sum', a: 1, b: 5 }).then((msg) => {
    console.log('it works!!', msg);
    const { data } = msg;
    t.is(data, 6);
  });
});


test('make a sum promise2', async (t) => {
  // t.plan(1);
  const msg = await act({ math: 'sum', a: 1, b: 5 });
  console.log('it works!!2', msg);
  const { data } = msg;
  t.is(data, 6);
});
