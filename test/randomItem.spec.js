'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

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
