'use strict';

var math = require('../').math;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(math.name, math);

tape('math', function (test) {
  var template;
  var actual;
  var expected;

  test.plan(10);

  template = Handlebars.compile('{{math 1 "+" 2}}');
  actual = template();
  expected = '3';
  test.equal(actual, expected, 'Works with +');

  template = Handlebars.compile('{{math 2 "-" 1}}');
  actual = template();
  expected = '1';
  test.equal(actual, expected, 'Works with -');

  template = Handlebars.compile('{{math 2 "*" 3}}');
  actual = template();
  expected = '6';
  test.equal(actual, expected, 'Works with *');

  template = Handlebars.compile('{{math 9 "/" 3}}');
  actual = template();
  expected = '3';
  test.equal(actual, expected, 'Works with /');

  template = Handlebars.compile('{{math 17 "%" 3}}');
  actual = template();
  expected = '2';
  test.equal(actual, expected, 'Works with %');

  template = Handlebars.compile('{{math 1 "++"}}');
  actual = template();
  expected = '2';
  test.equal(actual, expected, 'Works with ++');

  template = Handlebars.compile('{{math 2 "--"}}');
  actual = template();
  expected = '1';
  test.equal(actual, expected, 'Works with --');

  template = Handlebars.compile('{{math 1 "++" 2}}');
  actual = template();
  expected = '2';
  test.equal(actual, expected, 'Disregards extra arguments');

  template = Handlebars.compile('{{math 1 "foo" 2}}');
  test.throws(
    function () {
      template();
    },
    /needs a valid operator\.$/,
    'Errors with an invalid operator'
  );

  template = Handlebars.compile('{{math}}');
  test.throws(
    function () {
      template();
    },
    /needs two arguments\.$/,
    'Errors with too few arguments'
  );
});
