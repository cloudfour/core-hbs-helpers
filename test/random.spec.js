'use strict';

var random = require('../').random;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(random.name, random);

tape('random', function (test) {
  var items = ['a', 'b', 'c'];
  var template;
  var result;

  test.plan(4);

  template = Handlebars.compile('{{random items}}');
  result = template({ items: items });
  test.ok(items.indexOf(result) !== -1, 'Works with a single Array');

  template = Handlebars.compile('{{random "' + items.join('" "') + '"}}');
  result = template();
  test.ok(items.indexOf(result) !== -1, 'Works with multiple arguments');

  template = Handlebars.compile('{{random "a"}}');
  result = template();
  test.equal(result, 'a', 'Works with only a single item');

  template = Handlebars.compile('{{random}}');
  test.throws(
    function () {
      template();
    },
    /at least one argument\.$/,
    'Errors when passed zero arguments'
  );
});
