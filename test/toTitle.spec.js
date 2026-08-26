'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const toTitle = require('../').toTitle;

Handlebars.registerHelper(toTitle.name, toTitle);

tape('toTitle', (test) => {
  const template = Handlebars.compile('{{toTitle title}}');
  const expected = 'title';
  const actual = template({
    title: '01 title'
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
