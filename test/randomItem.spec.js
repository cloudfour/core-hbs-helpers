'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const random = require('../').random;
const randomItem = require('../').randomItem;

Handlebars.registerHelper('randomItem', randomItem);

tape('randomItem', (test) => {
  const items = ['a', 'b', 'c'];
  let template;
  let result;

  test.plan(4);

  template = Handlebars.compile('{{randomItem items}}');
  result = template({ items });
  test.ok(items.includes(result), 'Works with a single Array');

  template = Handlebars.compile(`{{randomItem "${items.join('" "')}"}}`);
  result = template();
  test.ok(items.includes(result), 'Works with multiple arguments');

  template = Handlebars.compile('{{randomItem "a"}}');
  result = template();
  test.equal(result, 'a', 'Works with only a single item');

  template = Handlebars.compile('{{randomItem}}');
  test.throws(
    () => {
      template();
    },
    /at least one argument\.$/v,
    'Errors when passed zero arguments'
  );
});

tape('randomItem.create', (test) => {
  const items = Array.from({ length: 1000 }, (_, index) => index);

  const render = (source, settings) => {
    const hbs = Handlebars.create();
    hbs.registerHelper('random', random.create(settings));
    hbs.registerHelper('randomItem', randomItem.create(settings));
    return hbs.compile(source)({ items });
  };

  test.plan(4);

  randomItem.create().reset();
  const first = render('{{randomItem items}}', { seed: 'fixed' });
  test.ok(items.includes(Number(first)), 'Works with a seed');

  randomItem.create().reset();
  test.equal(
    render('{{randomItem items}}', { seed: 'fixed' }),
    first,
    'After a reset, the next render repeats the first'
  );

  randomItem.create().reset();
  test.notEqual(
    render('{{random}} {{randomItem items}}', { seed: 'fixed' }).split(' ', 2)[1],
    first,
    'Shares a sequence with random helpers given the same seed'
  );

  test.equal(typeof randomItem.create().reset, 'function', 'Exposes reset()');
});
