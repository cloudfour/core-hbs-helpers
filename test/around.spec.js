'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const around = require('../').around;

Handlebars.registerHelper(around.name, around);

tape('around', (test) => {
  let template;
  let expected;
  let actual;
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  test.plan(5);

  template = Handlebars.compile('{{#around items center padding}}{{.}}{{/around}}');

  expected = '34567';
  actual = template({
    center: 4,
    padding: 2,
    items
  });
  test.equal(actual, expected, 'Works');

  expected = '12345';
  actual = template({
    center: 1,
    padding: 2,
    items
  });
  test.equal(actual, expected, 'Works when center is below left padding');

  expected = '56789';
  actual = template({
    center: 7,
    padding: 2,
    items
  });
  test.equal(actual, expected, 'Works when center is above right padding');

  template = Handlebars.compile('{{#around items center padding offset=-1}}{{.}}{{/around}}');

  expected = '34567';
  actual = template({
    center: 5,
    padding: 2,
    items
  });
  test.equal(actual, expected, 'Adjusts center based on offset value');

  expected = '123456789';
  actual = template({
    center: 5,
    padding: 100,
    items
  });
  test.equal(actual, expected, 'Works when padding exceeds length');
});
