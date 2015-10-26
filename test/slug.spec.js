'use strict';

var slug = require('../').slug;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(slug.name, slug);

tape('slug', function (test) {
  var template = Handlebars.compile('{{slug title}}');
  var actual;
  var expected;

  test.plan(6);

  expected = '1';
  actual = template({ title: 1 });
  test.equal(actual, expected, 'Converts input to a string');

  expected = 'lowercase';
  actual = template({ title: 'LoWeRcAsE' });
  test.equal(actual, expected, 'Converts input to lowercase');

  expected = 'many-words';
  actual = template({ title: 'Many Words' });
  test.equal(actual, expected, 'Replaces spaces with hyphens');

  expected = 'a-b-c-1-2-3';
  actual = template({ title: '!a@b#c$1%2^3&' });
  test.equal(actual, expected, 'Replaces non-words with hyphens');

  expected = 'one-hyphen';
  actual = template({ title: 'One--Hyphen' });
  test.equal(actual, expected, 'Replaces sequential hyphens');

  expected = 'title';
  actual = template({ title: '-Title-' });
  test.equal(actual, expected, 'Trims leading and trailing hyphens');
});
