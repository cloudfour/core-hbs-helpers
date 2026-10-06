'use strict';

const { execFileSync } = require('node:child_process');
const path = require('node:path');
const process = require('node:process');

const Chance = require('chance');
const Handlebars = require('handlebars');
const R = require('ramda');
const tape = require('tape');

const random = require('../').random;

const chance = new Chance();

Handlebars.registerHelper('random', random);

tape('random', (test) => {
  let template;
  let result;
  let parsed;

  test.plan(6);

  template = Handlebars.compile('{{random}}');
  result = template();
  parsed = Number(result);
  test.ok(Number.isSafeInteger(parsed), 'Works');

  template = Handlebars.compile('{{random min=5 max=10}}');
  result = template();
  parsed = Number(result);
  test.ok(parsed >= 5 && parsed <= 10, 'Works with hash');

  template = Handlebars.compile('{{random "state"}}');
  result = template();
  test.ok(R.find(R.propEq(result, 'abbreviation'))(chance.states()), 'Works with method');

  template = Handlebars.compile('{{random "dollar" max=20}}');
  result = template();
  parsed = Number(result.slice(1));
  test.ok(result[0] === '$' && parsed <= 20, 'Works with method and hash');

  template = Handlebars.compile('{{random 42}}');
  test.throws(
    () => {
      template();
    },
    /first argument must be a String\.$/v,
    'Errors when method is not a String'
  );

  template = Handlebars.compile('{{random "whatever"}}');
  test.throws(
    () => {
      template();
    },
    /does not support the "whatever" method\.$/v,
    'Errors when method does not exist'
  );

});

tape('random.create', (test) => {
  const root = path.join(__dirname, '..');
  const source = '{{random}} {{random "word"}} {{random min=1 max=1000}}';

  const render = (settings, context) => {
    const hbs = Handlebars.create();
    hbs.registerHelper('random', random.create(settings));
    return hbs.compile(source)(context);
  };

  test.plan(8);

  random.create().reset();

  const unseeded = random.create();
  test.notEqual(
    render({}),
    render({}),
    'Without a seed, output differs between renders'
  );
  test.equal(typeof unseeded.reset, 'function', 'Exposes reset()');

  const first = render({ seed: 'fixed' });
  test.notEqual(first, render({ seed: 'fixed' }), 'A seed keeps advancing across renders');

  random.create().reset();
  test.equal(render({ seed: 'fixed' }), first, 'After a reset, the next render repeats the first');

  const script = `
    const Handlebars = require('handlebars');
    const random = require('./lib/random.js');
    const hbs = Handlebars.create();
    hbs.registerHelper('random', random.create({ seed: 'fixed' }));
    process.stdout.write(hbs.compile(${JSON.stringify(source)})());
  `;
  test.equal(
    execFileSync(process.execPath, ['-e', script], { cwd: root, encoding: 'utf8' }),
    first,
    'The same seed produces the same output in another process'
  );

  const calls = [];
  const perPage = {
    seed (options) {
      calls.push(options);
      return options.data.root.page;
    },
  };

  random.create().reset();
  const a = [render(perPage, { page: 'a' }), render(perPage, { page: 'a' })];
  test.equal(calls[0].data.root.page, 'a', 'A seed function receives the helper options');

  random.create().reset();
  const interleaved = [
    render(perPage, { page: 'a' }),
    render(perPage, { page: 'b' }),
    render(perPage, { page: 'a' }),
  ];
  test.deepEqual(
    [interleaved[0], interleaved[2]],
    a,
    'Different seeds produce independent sequences'
  );

  test.throws(
    () => {
      render(perPage, {});
    },
    /seed function returned undefined\.$/v,
    'Errors when a seed function returns nothing'
  );
});
