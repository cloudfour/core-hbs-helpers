'use strict';

var randomItem = require('../').randomItem;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(randomItem.name, randomItem);

tape('randomItem', function (test) {
  var items = ['a', 'b', 'c'];
  var template;
  var result;

  test.plan(4);

  template = Handlebars.compile('{{randomItem items}}');
  result = template({ items: items });
  test.ok(items.indexOf(result) !== -1, 'Works with a single Array');

  template = Handlebars.compile('{{randomItem "' + items.join('" "') + '"}}');
  result = template();
  test.ok(items.indexOf(result) !== -1, 'Works with multiple arguments');

  template = Handlebars.compile('{{randomItem "a"}}');
  result = template();
  test.equal(result, 'a', 'Works with only a single item');

  template = Handlebars.compile('{{randomItem}}');
  test.throws(
    function () {
      template();
    },
    /at least one argument\.$/,
    'Errors when passed zero arguments'
  );
});
