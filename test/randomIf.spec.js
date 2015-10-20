'use strict';

var randomIf = require('../').randomIf;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(randomIf.name, randomIf);

tape('randomIf', function (test) {
  var template = Handlebars.compile(
    '{{#randomIf}}pass{{else}}fail{{/randomIf}}'
  );
  var result = template();
  var isMatch = result.search(/(pass|fail)/) !== -1;

  test.plan(1);
  test.ok(isMatch, 'works');
});
