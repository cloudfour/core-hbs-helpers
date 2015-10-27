'use strict';

var compare = require('../').compare;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(compare.name, compare);

tape('compare', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(11);

  template = Handlebars.compile('{{#compare a "==" b}}✔︎{{/compare}}');
  actual = template({ a: true, b: true });
  test.equal(actual, expected, 'Works with ==');

  template = Handlebars.compile('{{#compare a "===" b}}✔︎{{/compare}}');
  actual = template({ a: true, b: true });
  test.equal(actual, expected, 'Works with ===');

  template = Handlebars.compile('{{#compare a "!=" b}}✔︎{{/compare}}');
  actual = template({ a: true, b: false });
  test.equal(actual, expected, 'Works with !=');

  template = Handlebars.compile('{{#compare a "!==" b}}✔︎{{/compare}}');
  actual = template({ a: true, b: 1 });
  test.equal(actual, expected, 'Works with !==');

  template = Handlebars.compile('{{#compare a "<" b}}✔︎{{/compare}}');
  actual = template({ a: 0, b: 1 });
  test.equal(actual, expected, 'Works with <');

  template = Handlebars.compile('{{#compare a ">" b}}✔︎{{/compare}}');
  actual = template({ a: 1, b: 0 });
  test.equal(actual, expected, 'Works with >');

  template = Handlebars.compile('{{#compare a "<=" b}}✔︎{{/compare}}');
  actual = template({ a: 0, b: 1 });
  test.equal(actual, expected, 'Works with <=');

  template = Handlebars.compile('{{#compare a ">=" b}}✔︎{{/compare}}');
  actual = template({ a: 1, b: 0 });
  test.equal(actual, expected, 'Works with >=');

  template = Handlebars.compile('{{#compare a "typeof" "Array"}}✔︎{{/compare}}');
  actual = template({ a: [] });
  test.equal(actual, expected, 'Works with typeof');

  template = Handlebars.compile('{{#compare a "foo" b}}✔︎{{/compare}}');
  test.throws(
    function () {
      template({ a: 1, b: 2 });
    },
    /needs a valid operator\.$/,
    'Errors with an invalid operator.'
  );

  template = Handlebars.compile('{{#compare a}}✔︎{{/compare}}');
  test.throws(
    function () {
      template({ a: 1 });
    },
    /needs two arguments\.$/,
    'Errors with missing arguments.'
  );
});
