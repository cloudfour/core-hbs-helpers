'use strict';

var average = require('../').average;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(average.name, average);

tape('average', function (test) {
  var template = Handlebars.compile('{{average numbers}}');
  var expected = '5';
  var actual = template({
    numbers: [2, 4, 6, 8]
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
