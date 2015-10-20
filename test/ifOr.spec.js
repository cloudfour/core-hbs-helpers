'use strict';

var ifOr = require('../').ifOr;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(ifOr.name, ifOr);

tape('ifOr', function (test) {
  var template = Handlebars.compile('{{#ifOr val1 val2}}pass{{/ifOr}}');
  var expected = 'pass';
  var actual = template({
    val1: false,
    val2: true
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
