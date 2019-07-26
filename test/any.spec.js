'use strict';

var any = require('../').any;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(any.name, any);

tape('any', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(4);

  template = Handlebars.compile('{{#any a b c}}✔︎{{/any}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Resolves to true when all values are true');

  template = Handlebars.compile('{{#any a b c}}✔︎{{/any}}');
  actual = template({ a: false, b: true, c: false });
  test.equal(actual, expected, 'Resolves to true when any value is true');

  template = Handlebars.compile('{{#any a b c}}{{else}}✔︎{{/any}}');
  actual = template({ a: false, b: false, c: false });
  test.equal(actual, expected, 'Resolves to false when no value is true');

  template = Handlebars.compile('{{#if (any a b c)}}✔︎{{/if}}');
  actual = template({ a: false, b: true, c: false });
  test.equal(actual, expected, 'Works as an inline helper');
});
