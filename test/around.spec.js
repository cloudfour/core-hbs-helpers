'use strict';

var around = require('../').around;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(around.name, around);

tape('around', function (test) {
  var template;
  var expected;
  var actual;
  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  test.plan(5);

  template = Handlebars.compile('{{#around items center padding}}{{.}}{{/around}}');

  expected = '34567';
  actual = template({
    center: 4,
    padding: 2,
    items: items
  });
  test.equal(actual, expected, 'Works');

  expected = '12345';
  actual = template({
    center: 1,
    padding: 2,
    items: items
  });
  test.equal(actual, expected, 'Works when center is below left padding');

  expected = '56789';
  actual = template({
    center: 7,
    padding: 2,
    items: items
  });
  test.equal(actual, expected, 'Works when center is above right padding');

  template = Handlebars.compile('{{#around items center padding offset=-1}}{{.}}{{/around}}');

  expected = '34567';
  actual = template({
    center: 5,
    padding: 2,
    items: items
  });
  test.equal(actual, expected, 'Adjusts center based on offset value');

  expected = '123456789';
  actual = template({
    center: 5,
    padding: 100,
    items: items
  });
  test.equal(actual, expected, 'Works when padding exceeds length');
});
