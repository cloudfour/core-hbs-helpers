'use strict';

var timestamp = require('../').timestamp;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(timestamp.name, timestamp);

tape('timestamp', function (test) {
  var template;
  var actual;
  var expected;

  test.plan(4);

  template = Handlebars.compile('{{timestamp date}}');
  expected = '1995-08-09';
  actual = template({ date: new Date('Aug 9, 1995') });
  test.equal(actual, expected, 'Works');

  test.throws(
    function () {
      template({ date: 'abc123' })
    },
    /Date-parseable value\.$/,
    'Errors when passed an invalid date value'
  );

  template = Handlebars.compile('{{timestamp date format="MMM Do YY"}}');
  expected = 'Aug 9th 95';
  actual = template({ date: new Date('Aug 9, 1995') });
  test.equal(actual, expected, 'Works with a specified format');

  template = Handlebars.compile('{{timestamp date format="YYYY"}}');
  expected = '2045';
  actual = template({ date: '2045-01-01' });
  test.equal(actual, expected, 'Works with a string input value');
});
