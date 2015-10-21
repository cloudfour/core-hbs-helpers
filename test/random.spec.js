'use strict';

var random = require('../').random;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(random.name, random);

tape('random', function (test) {
  var template = Handlebars.compile('{{random items}}');
  var items;
  var result;

  test.plan(2);

  items = ['a', 'b', 'c'];
  result = template({ items: items });
  test.ok(items.indexOf(result) !== -1, 'Works');

  test.throws(
    function () {
      template({ items: 'not an array' })
    },
    /passed an Array\.$/,
    'Errors when passed a non-array'
  );
});
