const senecaConfig = require('./config/amqp');
const commands = require('./commands');
const server = require('./server');
const seneca = require('seneca');
const Promise = require('bluebird');
const test = require('ava');


const { pins } = commands.start();
senecaConfig.pin = pins;
const listener = seneca()
  .use('seneca-amqp-transport')
  .client(senecaConfig);

const repeatBench = (name, times, callback) => {
  console.time(name);
  return Promise.map(new Array(times), callback)
    .then((o) => {
      console.timeEnd(name);
      return o;
    }, { concurrency: 1 });
};


listener.actAsync = Promise.promisify(listener.act);
const act = Promise.promisify(listener.act, { context: listener });


// test.before(() => server.start());

test.cb('make a sum', (t) => {
  listener.act({ math: 'sum', a: 1, b: 5 }, (e, msg) => {
    if (e) {
      return t.fail(e);
    }
    const { data } = msg;
    t.is(data, 6);
    return t.end();
  });
});

test.cb('make a sum sending pin', (t) => {
  listener.act('math:sum', { a: 1, b: 5 }, (e, msg) => {
    if (e) {
      return t.fail(e);
    }
    const { data } = msg;
    t.is(data, 6);
    return t.end();
  });
});

test('make a sum listener.actAsync', async (t) => {
  t.plan(1);
  await listener.actAsync({ math: 'sum', a: 1, b: 5 }).then((msg) => {
    const { data } = msg;
    t.is(data, 6);
  });
});


test('make a sum act', async (t) => {
  // t.plan(1);
  const msg = await act({ math: 'sum', a: 1, b: 5 });
  const { data } = msg;
  t.is(data, 6);
});


test('make internal sum', async (t) => {
  // t.plan(1);
  const msg = await act('math:sumInternal', { a: 1, b: 5 });
  console.log(msg);
  const { data } = msg;
  t.is(data, 6);
});


test.only('make benchmark internal sum', async (t) => {
  // t.plan(1);
  await repeatBench('double sum', 1, () => act('math:sum', { a: 1, b: 5 }));
  t.pass();
});
