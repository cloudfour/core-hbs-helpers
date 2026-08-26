'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const maybe = require('../').maybe;

Handlebars.registerHelper('maybe', maybe);

tape('maybe', (test) => {
  const template = Handlebars.compile(
    '{{#maybe}}pass{{else}}fail{{/maybe}}'
  );
  const realRandom = Math.random;

  test.plan(2);

  // `maybe` is genuinely random, so each branch has to be forced to be checked
  // at all. It rounds `Math.random()`, which makes 0.5 the lowest value that
  // selects the primary block.
  test.teardown(() => {
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
