'use strict';

var capitalize = require('../').capitalize;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(capitalize.name, capitalize);

tape('capitalize', function (test) {
  var template = Handlebars.compile('{{capitalize content}}');
  var expected;
  var actual;

  test.plan(3);

  expected = 'Hello world';
  actual = template({ content: 'hello world' });
  test.equal(actual, expected, 'Works');

  expected = 'True';
  actual = template({ content: true });
  test.equal(actual, expected, 'Works with non-String arguments');

  test.throws(
    function () {
      template();
    },
    /requires one argument\.$/,
    'Errors when argument is missing'
  );
});
