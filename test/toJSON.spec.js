'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const toJSON = require('../').toJSON;

Handlebars.registerHelper('toJSON', toJSON);

tape('toJSON', (test) => {
  let template = Handlebars.compile('{{#each (toJSON data)}}{{this}}{{/each}}');
  let actual;
  let expected;

  test.plan(5);

  expected = '123';
  actual = template({ data: '[1, 2, 3]' });
  test.equal(actual, expected, 'Handles arrays');

  expected = 'abc';
  actual = template({ data: '{"0":"a", "1":"b", "2":"c"}' });
  test.equal(actual, expected, 'Handles objects');

  template = Handlebars.compile('{{#each (toJSON "[1, 2, 3]")}}{{this}}{{/each}}');
  expected = '123';
  actual = template();
  test.equal(actual, expected, 'Handles array literals');

  template = Handlebars.compile('{{#each (toJSON \'{"foo": "bar"}\')}}{{this}}{{/each}}');
  expected = 'bar';
  actual = template();
  test.equal(actual, expected, 'Handles object literals');

  template = Handlebars.compile('{{toJSON data}}');
  test.throws(
    () => {
      template({ data: 'not JSON' });
    },
    /must be passed a valid JSON string\.$/v,
    'Errors when passed invalid JSON'
  );
});
