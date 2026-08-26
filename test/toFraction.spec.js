'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const toFraction = require('../').toFraction;

Handlebars.registerHelper(toFraction.name, toFraction);

tape('toFraction', (test) => {
  const template = Handlebars.compile('{{{toFraction number}}}');
  let expected;
  let actual;

  test.plan(3);

  expected = '1¼';
  actual = template({ number: 1.25 });
  test.equal(actual, expected, 'Works');

  expected = '1';
  actual = template({ number: 1 });
  test.equal(actual, expected, 'Ignores non-fractions');

  expected = '1.42';
  actual = template({ number: 1.42 });
  test.equal(actual, expected, 'Ignores fractions with no applicable vulgarity');
});
