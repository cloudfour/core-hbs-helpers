'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const math = require('../').math;

Handlebars.registerHelper(math.name, math);

tape('math', (test) => {
  let template;
  let actual;
  let expected;

  test.plan(11);

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

  template = Handlebars.compile('{{math 2 "**" 3}}');
  actual = template();
  expected = '8';
  test.equal(actual, expected, 'Works with **');

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
    () => {
      template();
    },
    /needs a valid operator\.$/v,
    'Errors with an invalid operator'
  );

  template = Handlebars.compile('{{math}}');
  test.throws(
    () => {
      template();
    },
    /needs at least two arguments\.$/v,
    'Errors with too few arguments'
  );
});
