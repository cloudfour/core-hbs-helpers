'use strict';

var and = require('../').and;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(and.name, and);

tape('and', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(2);

  template = Handlebars.compile('{{#and a b}}✔︎{{/and}}');
  actual = template({ a: true, b: true });
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{#and a}}✔︎{{/and}}');
  test.throws(
    function () {
      template({ a: true })
    },
    /needs two arguments\.$/,
    'Errors with missing arguments.'
  );
});
