'use strict';

var ifEqual = require('../').ifEqual;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(ifEqual.name, ifEqual);

tape('ifEqual', function (test) {
  var template = Handlebars.compile('{{#ifEqual val1 val2}}pass{{/ifEqual}}');
  var expected = 'pass';
  var actual = template({
    val1: 'pass',
    val2: 'pass'
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
