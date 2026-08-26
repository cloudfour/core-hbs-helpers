'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const iterate = require('../').iterate;

Handlebars.registerHelper('iterate', iterate);

tape('iterate', (test) => {
  const template = Handlebars.compile(
    '{{#iterate 3}}<{{@index}},{{@count}}>{{/iterate}}'
  );
  const actual = template();
  const expected = '<0,1><1,2><2,3>';

  test.plan(1);
  test.equal(actual, expected, 'works');
});
