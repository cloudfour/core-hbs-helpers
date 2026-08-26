'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const or = require('../').or;

Handlebars.registerHelper(or.name, or);

tape('or', (test) => {
  const expected = '✔︎';
  let template;
  let actual;

  test.plan(6);

  template = Handlebars.compile('{{#or a b}}✔︎{{else}}✘{{/or}}');

  actual = template({ a: false, b: true });
  test.equal(actual, expected, 'Outputs the block when the right value is truthy');

  actual = template({ a: true, b: false });
  test.equal(actual, expected, 'Outputs the block when the left value is truthy');

  actual = template({ a: 0, b: 'zero' });
  test.equal(actual, expected, 'Outputs the block for non-Boolean truthy values');

  actual = template({ a: false, b: 0 });
  test.equal(actual, '✘', 'Outputs the inverse block when both values are falsy');

  template = Handlebars.compile('{{#or a b}}✔︎{{/or}}');
  actual = template({ a: false, b: 0 });
  test.equal(actual, '', 'Outputs nothing when falsy and no inverse block is given');

  template = Handlebars.compile('{{#or a}}✔︎{{/or}}');
  test.throws(
    () => {
      template({ a: false })
    },
    /needs two arguments\.$/v,
    'Errors with missing arguments.'
  );
});
