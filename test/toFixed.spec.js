'use strict';

var toFixed = require('../').toFixed;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(toFixed.name, toFixed);

tape('toFixed', function (test) {
  var template = Handlebars.compile('{{toFixed number}}');
  var expected = '1.00';
  var actual = template({ number: 1 });
  test.plan(2);
  test.equal(actual, expected, 'Works');
  test.throws(
    function () {
      template({ number: 'abc123' })
    },
    /number\-like value\.$/,
    'Errors when passed an unparseable value'
  );
});
