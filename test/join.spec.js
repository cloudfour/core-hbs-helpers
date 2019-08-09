'use strict';

var join = require('../').join;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(join.name, join);

tape('join', function (test) {
  var items = ['a', 'b', 'c', 'd'];
  var template;
  var actual;
  var expected;

  test.plan(9);

  template = Handlebars.compile('{{join items}}');
  actual = template({ items: items });
  expected = 'a, b, c, d';
  test.equal(actual, expected, 'Works with default separator');

  template = Handlebars.compile('{{join items separator="!"}}');
  actual = template({ items: items });
  expected = 'a!b!c!d';
  test.equal(actual, expected, 'Works with custom separator');

  template = Handlebars.compile('{{join items lastSeparator=" and "}}');
  actual = template({ items: items });
  expected = 'a, b, c and d';
  test.equal(actual, expected, 'Works with custom last separator');

  template = Handlebars.compile('{{{join items separator="+" lastSeparator="="}}}');
  actual = template({ items: items });
  expected = 'a+b+c=d';
  test.equal(actual, expected, 'Works with custom normal and last separators');

  template = Handlebars.compile('{{join items separator=42 lastSeparator=true}}');
  actual = template({ items: items });
  expected = 'a, b, c, d';
  test.equal(actual, expected, 'Ignores non-string separators');

  template = Handlebars.compile('{{join}}');
  actual = template();
  expected = '';
  test.equal(actual, expected, 'Outputs nothing if list is omitted');

  template = Handlebars.compile('{{join items}}');
  actual = template({ items: [] });
  expected = '';
  test.equal(actual, expected, 'Outputs nothing if list is empty');

  template = Handlebars.compile('{{join 42}}');
  actual = template();
  expected = '';
  test.equal(actual, expected, 'Outputs nothing if argument is not a list');

  template = Handlebars.compile('{{join items}}');
  actual = template({ items: ['a'] });
  expected = 'a';
  test.equal(actual, expected, 'Inserts no separators for lists of one item');
});
