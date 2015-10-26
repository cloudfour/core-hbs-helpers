'use strict';

var toFraction = require('../').toFraction;
var tape = require('tape');
var Entities = require('html-entities').Html5Entities;
var Handlebars = require('handlebars');

Handlebars.registerHelper(toFraction.name, toFraction);

tape('toFraction', function (test) {
  var entities = new Entities();
  var actual;
  var expected;
  var template;

  test.plan(2);

  template = Handlebars.compile('{{{toFraction number}}}');
  expected = '1¼';
  actual = entities.decode(template({
    number: 1.25
  }));
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{{toFraction number}}}');
  expected = '1';
  actual = entities.decode(template({
    number: 1
  }));
  test.equal(actual, expected, 'Ignores non-fractions');
});
