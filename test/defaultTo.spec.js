'use strict';

var defaultTo = require('../').defaultTo;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(defaultTo.name, defaultTo);

tape('defaultTo', function (test) {
  var template;
  var expected;
  var actual;

  test.plan(4);

  template = Handlebars.compile('{{defaultTo doesExist "Goodbye"}}');
  expected = 'Hello';
  actual = template({ doesExist: 'Hello' });
  test.equal(actual, expected, 'Works with value set');

  template = Handlebars.compile('{{defaultTo doesNotExist "Goodbye"}}');
  expected = 'Goodbye';
  actual = template({});
  test.equal(actual, expected, 'Works with value not set');

  template = Handlebars.compile('{{defaultTo doesNotExist}}');
  expected = '';
  actual = template({});
  test.equal(actual, expected, 'Works with value and fallback not set');

  template = Handlebars.compile('{{defaultTo doesNotExist doesExist "Goodbye"}}');
  expected = 'Hello';
  actual = template({ doesExist: 'Hello' });
  test.equal(actual, expected, 'Works with variable arguments');
});
