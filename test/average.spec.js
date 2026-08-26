'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const average = require('../').average;

Handlebars.registerHelper(average.name, average);

tape('average', (test) => {
  let template;
  let expected;
  let actual;

  test.plan(2);

  template = Handlebars.compile('{{average numbers}}');
  expected = '5';
  actual = template({
    numbers: [2, 4, 6, 8]
  });
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{average items key="number"}}');
  expected = '50';
  actual = template({
    items: [
      { number: 20 },
      { number: 40 },
      { number: 60 },
      { number: 80 }
    ]
  });
  test.equal(actual, expected, 'Works with key hash');
});
