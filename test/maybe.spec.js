'use strict';

var maybe = require('../').maybe;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(maybe.name, maybe);

tape('maybe', function (test) {
  var template = Handlebars.compile(
    '{{#maybe}}pass{{else}}fail{{/maybe}}'
  );
  var realRandom = Math.random;

  test.plan(2);

  // `maybe` is genuinely random, so each branch has to be forced to be checked
  // at all. It rounds `Math.random()`, which makes 0.5 the lowest value that
  // selects the primary block.
  test.teardown(function () {
    Math.random = realRandom;
  });

  Math.random = function () {
    return 0.5;
  };
  test.equal(template(), 'pass', 'Outputs the block');

  Math.random = function () {
    return 0.49;
  };
  test.equal(template(), 'fail', 'Outputs the inverse block');
});
