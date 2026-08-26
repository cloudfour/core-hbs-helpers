'use strict';

var and = require('../').and;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(and.name, and);

tape('and', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

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
    function () {
      template({ a: true })
    },
    /needs two arguments\.$/,
    'Errors with missing arguments.'
  );
});
