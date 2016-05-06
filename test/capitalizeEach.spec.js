'use strict';

var capitalizeEach = require('../').capitalizeEach;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(capitalizeEach.name, capitalizeEach);

tape('capitalizeEach', function (test) {
  var template = Handlebars.compile('{{{capitalizeEach content}}}');
  var expected;
  var actual;

  test.plan(3);

  expected = '"How\'s It Going?"';
  actual = template({ content: '"how\'s it going?"' });
  test.equal(actual, expected, 'Works');

  expected = 'A,B,C';
  actual = template({ content: ['a', 'b', 'c'] });
  test.equal(actual, expected, 'Works with non-String arguments');

  test.throws(
    function () {
      template();
    },
    /requires one argument\.$/,
    'Errors when argument is missing'
  );
});
