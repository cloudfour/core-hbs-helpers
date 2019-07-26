'use strict';

var all = require('../').all;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(all.name, all);

tape('all', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(3);

  template = Handlebars.compile('{{#all a b c}}✔︎{{/all}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Resolves to true when all values are true');

  template = Handlebars.compile('{{#all a b c}}{{else}}✔︎{{/all}}');
  actual = template({ a: true, b: false, c: true });
  test.equal(actual, expected, 'Resolves to false when any value is false');

  template = Handlebars.compile('{{#if (all a b c)}}✔︎{{/if}}');
  actual = template({ a: true, b: true, c: true });
  test.equal(actual, expected, 'Works as an inline helper');
});
