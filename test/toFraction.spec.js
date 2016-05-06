'use strict';

var toFraction = require('../').toFraction;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(toFraction.name, toFraction);

tape('toFraction', function (test) {
  var template = Handlebars.compile('{{{toFraction number}}}');
  var expected;
  var actual;

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
