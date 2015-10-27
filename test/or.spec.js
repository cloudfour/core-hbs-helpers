'use strict';

var or = require('../').or;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(or.name, or);

tape('or', function (test) {
  var expected = '✔︎';
  var template;
  var actual;

  test.plan(2);

  template = Handlebars.compile('{{#or a b}}✔︎{{/or}}');
  actual = template({ a: false, b: true });
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{#or a}}✔︎{{/or}}');
  test.throws(
    function () {
      template({ a: false })
    },
    /needs two arguments\.$/,
    'Errors with missing arguments.'
  );
});
