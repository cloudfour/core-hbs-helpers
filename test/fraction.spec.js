'use strict';

var fraction = require('../').fraction;
var tape = require('tape');
var Entities = require('html-entities').Html5Entities;
var Handlebars = require('handlebars');

Handlebars.registerHelper(fraction.name, fraction);

tape('fraction', function (test) {
  var entities = new Entities();
  var template = Handlebars.compile('{{{fraction number}}}');
  var expected = '1¼';
  var actual = entities.decode(template({
    number: 1.25
  }));
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
