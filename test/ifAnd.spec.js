'use strict';

var ifAnd = require('../').ifAnd;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(ifAnd.name, ifAnd);

tape('ifAnd', function (test) {
  var template = Handlebars.compile('{{#ifAnd val1 val2}}pass{{/ifAnd}}');
  var expected = 'pass';
  var actual = template({
    val1: true,
    val2: true
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
