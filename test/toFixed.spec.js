'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const toFixed = require('../').toFixed;

Handlebars.registerHelper(toFixed.name, toFixed);

tape('toFixed', (test) => {
  const template = Handlebars.compile('{{toFixed number}}');
  const expected = '1.00';
  const actual = template({ number: 1 });
  test.plan(2);
  test.equal(actual, expected, 'Works');
  test.throws(
    () => {
      template({ number: 'abc123' })
    },
    /number-like value\.$/v,
    'Errors when passed an unparseable value'
  );
});
