'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const capitalize = require('../').capitalize;

Handlebars.registerHelper(capitalize.name, capitalize);

tape('capitalize', (test) => {
  const template = Handlebars.compile('{{capitalize content}}');
  let expected;
  let actual;

  test.plan(3);

  expected = 'Hello world';
  actual = template({ content: 'hello world' });
  test.equal(actual, expected, 'Works');

  expected = 'True';
  actual = template({ content: true });
  test.equal(actual, expected, 'Works with non-String arguments');

  test.throws(
    () => {
      template();
    },
    /requires one argument\.$/v,
    'Errors when argument is missing'
  );
});
