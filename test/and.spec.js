'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const and = require('../').and;

Handlebars.registerHelper(and.name, and);

tape('and', (test) => {
  const expected = '✔︎';
  let template;
  let actual;

  test.plan(6);

  template = Handlebars.compile('{{#and a b}}✔︎{{else}}✘{{/and}}');

  actual = template({ a: true, b: true });
  test.equal(actual, expected, 'Outputs the block when both values are truthy');

  actual = template({ a: 1, b: 'zero' });
  test.equal(actual, expected, 'Outputs the block for non-Boolean truthy values');

  actual = template({ a: true, b: false });
  test.equal(actual, '✘', 'Outputs the inverse block when the right value is falsy');

  actual = template({ a: false, b: true });
  test.equal(actual, '✘', 'Outputs the inverse block when the left value is falsy');

  template = Handlebars.compile('{{#and a b}}✔︎{{/and}}');
  actual = template({ a: true, b: false });
  test.equal(actual, '', 'Outputs nothing when falsy and no inverse block is given');

  template = Handlebars.compile('{{#and a}}✔︎{{/and}}');
  test.throws(
    () => {
      template({ a: true })
    },
    /needs two arguments\.$/v,
    'Errors with missing arguments.'
  );
});
