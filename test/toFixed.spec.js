'use strict';

var toFixed = require('../').toFixed;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(toFixed.name, toFixed);

tape('toFixed', function (test) {
  var template = Handlebars.compile('{{toFixed number}}');
  var expected = '1.00';
  var actual = template({ number: 1 });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
