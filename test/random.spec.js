'use strict';

var random = require('../').random;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(random.name, random);

tape('random', function (test) {
  var template = Handlebars.compile('{{random items}}');
  var items = ['a', 'b', 'c'];
  var result = template({ items: items });
  var inArray = items.indexOf(result) !== -1;

  test.plan(1);
  test.ok(inArray, 'Works');
});
