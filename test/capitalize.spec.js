'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const capitalize = require('../').capitalize;

Handlebars.registerHelper(capitalize.name, capitalize);

tape('capitalize', (test) => {
  const template = Handlebars.compile('{{capitalize content}}');
  let expected;
  let actual;

  test.plan(4);

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

  // `{{capitalize}}` with no value at all reaches a different path: Handlebars
  // passes only its options object, which used to be stringified and
  // capitalized into "[object Object]".
  test.throws(
    () => {
      Handlebars.compile('{{capitalize}}')();
    },
    /requires one argument\.$/v,
    'Errors when called with no arguments'
  );
});
