'use strict';

var concat = require('../').concat;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(concat.name, concat);

tape('concat', function (test) {
  var template;
  var result;

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
    function () {
      template();
    },
    /at least one argument\.$/,
    'Errors when passed zero arguments'
  );
});
