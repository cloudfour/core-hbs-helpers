'use strict';

var fraction = require('../').fraction;
var tape = require('tape');
var Entities = require('html-entities').Html5Entities;
var Handlebars = require('handlebars');

Handlebars.registerHelper(fraction.name, fraction);

tape('fraction', function (test) {
  var entities = new Entities();
  var actual;
  var expected;
  var template;

  test.plan(2);

  template = Handlebars.compile('{{{fraction number}}}');
  expected = '1¼';
  actual = entities.decode(template({
    number: 1.25
  }));
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{{fraction number}}}');
  expected = '1';
  actual = entities.decode(template({
    number: 1
  }));
  test.equal(actual, expected, 'Ignores non-fractions');
});
