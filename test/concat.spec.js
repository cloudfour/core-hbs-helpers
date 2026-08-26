'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const concat = require('../').concat;

Handlebars.registerHelper(concat.name, concat);

tape('concat', (test) => {
  let template;
  let result;

  test.plan(4);

  template = Handlebars.compile('{{concat "Hello"}}');
  result = template();
  test.equal(result, 'Hello', 'Works with single string');

  template = Handlebars.compile('{{concat "Hello " "there, " "world!"}}');
  result = template();
  test.equal(result, 'Hello there, world!', 'Works with multiple strings');

  template = Handlebars.compile('{{concat 2 true}}');
  result = template();
  test.equal(result, '2true', 'Works with non-strings');

  template = Handlebars.compile('{{concat}}');
  test.throws(
    () => {
      template();
    },
    /at least one argument\.$/v,
    'Errors when passed zero arguments'
  );
});
