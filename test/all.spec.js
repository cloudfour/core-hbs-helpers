'use strict';

var all = require('../').all;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(all.name, all);

tape('all', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(5);

  template = Handlebars.compile('{{#all a b c}}✔︎{{/all}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Resolves to true when all values are true');

  template = Handlebars.compile('{{#all a b c d e f g}}✔︎{{/all}}');
  actual = template({ a: true, b: 14, c: 'false', d: {}, e: [], f: '0', g: -42 });
  test.equal(actual, expected, 'Resolves to true when all values are truthy');

  template = Handlebars.compile('{{#all a b c}}{{else}}✔︎{{/all}}');
  actual = template({ a: true, b: false, c: true });
  test.equal(actual, expected, 'Resolves to false when any value is false');

  template = Handlebars.compile('{{#all a b c}}{{else}}✔︎{{/all}}');
  actual = template({ a: true, b: undefined, c: true });
  test.equal(actual, expected, 'Resolves to false when any value is falsy');

  template = Handlebars.compile('{{#if (all a b c)}}✔︎{{/if}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Works as an inline helper');
});
