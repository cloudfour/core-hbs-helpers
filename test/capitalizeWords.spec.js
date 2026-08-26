'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const capitalizeWords = require('../').capitalizeWords;

Handlebars.registerHelper(capitalizeWords.name, capitalizeWords);

tape('capitalizeWords', (test) => {
  const template = Handlebars.compile('{{{capitalizeWords content}}}');
  let expected;
  let actual;

  test.plan(3);

  expected = '"How\'s It Going?"';
  actual = template({ content: '"how\'s it going?"' });
  test.equal(actual, expected, 'Works');

  expected = 'A,B,C';
  actual = template({ content: ['a', 'b', 'c'] });
  test.equal(actual, expected, 'Works with non-String arguments');

  test.throws(
    () => {
      template();
    },
    /requires one argument\.$/v,
    'Errors when argument is missing'
  );
});
