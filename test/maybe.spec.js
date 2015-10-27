'use strict';

var maybe = require('../').maybe;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(maybe.name, maybe);

tape('maybe', function (test) {
  var template = Handlebars.compile(
    '{{#maybe}}pass{{else}}fail{{/maybe}}'
  );
  var result = template();
  var isMatch = result.search(/(pass|fail)/) !== -1;

  test.plan(1);
  test.ok(isMatch, 'works');
});
