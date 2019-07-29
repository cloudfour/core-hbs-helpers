'use strict';

var any = require('../').any;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(any.name, any);

tape('any', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(7);

  template = Handlebars.compile('{{#any a b c}}✔︎{{/any}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Resolves to true when all values are true');

  template = Handlebars.compile('{{#any a b c d e f g}}✔︎{{/any}}');
  actual = template({ a: true, b: 14, c: 'false', d: {}, e: [], f: '0', g: -42 });
  test.equal(actual, expected, 'Resolves to true when all values are truthy');

  template = Handlebars.compile('{{#any a b c}}✔︎{{/any}}');
  actual = template({ a: false, b: true, c: false });
  test.equal(actual, expected, 'Resolves to true when any value is true');

  template = Handlebars.compile('{{#any a b c}}✔︎{{/any}}');
  actual = template({ a: false, b: 14, c: false });
  test.equal(actual, expected, 'Resolves to true when any value is truthy');

  template = Handlebars.compile('{{#any a b c}}{{else}}✔︎{{/any}}');
  actual = template({ a: false, b: false, c: false });
  test.equal(actual, expected, 'Resolves to false when no value is true');

  template = Handlebars.compile('{{#any a b c}}{{else}}✔︎{{/any}}');
  actual = template({ a: false, b: undefined, c: false });
  test.equal(actual, expected, 'Resolves to false when no value is truthy');

  template = Handlebars.compile('{{#if (any a b c)}}✔︎{{/if}}');
  actual = template({ a: false, b: true, c: false });
  test.equal(actual, expected, 'Works as an inline helper');
});
