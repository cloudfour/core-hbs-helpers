'use strict';

var timestamp = require('../').timestamp;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(timestamp.name, timestamp);

tape('timestamp', function (test) {
  var template = Handlebars.compile('{{timestamp date}}');
  var expected = '1995-08-09';
  var actual = template({
    date: Date.parse('Aug 9, 1995')
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
