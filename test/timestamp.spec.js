'use strict';

var timestamp = require('../').timestamp;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(timestamp.name, timestamp);

tape('timestamp', function (test) {
  var template;
  var actual;
  var expected;
  var iso8601 = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  var today = new Date();

  test.plan(7);

  template = Handlebars.compile('{{timestamp}}');
  test.ok(template().match(iso8601).length > 0, 'Works');

  template = Handlebars.compile('{{timestamp format="YYYY"}}');
  expected = today.getFullYear().toString();
  actual = template();
  test.equal(actual, expected, 'Works with a specified format');

  template = Handlebars.compile('{{timestamp date format="MMM Do YY"}}');
  expected = 'Aug 9th 95';
  actual = template({ date: new Date('Aug 9, 1995') });
  test.equal(actual, expected, 'Works with Date input');

  template = Handlebars.compile('{{timestamp date format="MMM Do, YYYY"}}');
  expected = 'Oct 21st, 2015';
  actual = template({ date: '2015-10-21' });
  test.equal(actual, expected, 'Works with string input');

  template = Handlebars.compile('{{timestamp date inputFormat="MMM DD YY" format="YYYY-MM-DD"}}');
  expected = '2015-10-21';
  actual = template({ date: 'Oct 21 15' });
  test.equal(actual, expected, 'Works with custom input format');

  template = Handlebars.compile('{{timestamp format="ZZ" utc=false}}');
  expected = (function (date) {
    var offset = today.getTimezoneOffset() / 0.6;
    var result = '';
    if (offset > 0) {
      result += '-';
      if (offset.toString().length < 4) {
        result += '0';
      }
      result += offset;
    }
    return result;
  })(today);
  actual = template();
  test.equal(actual, expected, 'Maintains timezone offset in non-UTC mode');

  template = Handlebars.compile('{{timestamp date}}');
  test.throws(
    function () {
      template({ date: 'abc123' });
    },
    /valid Date-like value\.$/,
    'Errors when passed an invalid date value'
  );
});
