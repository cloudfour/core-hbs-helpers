'use strict';

var compare = require('../').compare;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(compare.name, compare);

tape('compare', function (test) {
  var match = '✔︎';
  var noMatch = '✘';
  var block;
  var inline;

  test.plan(42);

  // Each operator is checked in both directions. A block helper that only ever
  // gets its truthy case asserted will happily pass with `options.inverse`
  // stubbed out, which is how these all went uncovered for so long.

  block = Handlebars.compile('{{#compare a "==" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "==" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, true, true), match, 'Block == resolves to true');
  test.equal(template(block, true, false), noMatch, 'Block == resolves to false');
  test.equal(template(inline, true, true), match, 'Inline == resolves to true');
  test.equal(template(inline, true, false), noMatch, 'Inline == resolves to false');

  block = Handlebars.compile('{{#compare a "===" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "===" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, true, true), match, 'Block === resolves to true');
  test.equal(template(block, true, 1), noMatch, 'Block === resolves to false');
  test.equal(template(inline, true, true), match, 'Inline === resolves to true');
  test.equal(template(inline, true, 1), noMatch, 'Inline === resolves to false');

  block = Handlebars.compile('{{#compare a "!=" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "!=" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, true, false), match, 'Block != resolves to true');
  test.equal(template(block, true, true), noMatch, 'Block != resolves to false');
  test.equal(template(inline, true, false), match, 'Inline != resolves to true');
  test.equal(template(inline, true, true), noMatch, 'Inline != resolves to false');

  block = Handlebars.compile('{{#compare a "!==" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "!==" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, true, 1), match, 'Block !== resolves to true');
  test.equal(template(block, true, true), noMatch, 'Block !== resolves to false');
  test.equal(template(inline, true, 1), match, 'Inline !== resolves to true');
  test.equal(template(inline, true, true), noMatch, 'Inline !== resolves to false');

  block = Handlebars.compile('{{#compare a "<" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "<" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, 0, 1), match, 'Block < resolves to true');
  test.equal(template(block, 1, 0), noMatch, 'Block < resolves to false');
  test.equal(template(inline, 0, 1), match, 'Inline < resolves to true');
  test.equal(template(inline, 1, 0), noMatch, 'Inline < resolves to false');

  block = Handlebars.compile('{{#compare a ">" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a ">" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, 1, 0), match, 'Block > resolves to true');
  test.equal(template(block, 0, 1), noMatch, 'Block > resolves to false');
  test.equal(template(inline, 1, 0), match, 'Inline > resolves to true');
  test.equal(template(inline, 0, 1), noMatch, 'Inline > resolves to false');

  block = Handlebars.compile('{{#compare a "<=" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "<=" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, 0, 1), match, 'Block <= resolves to true');
  test.equal(template(block, 1, 0), noMatch, 'Block <= resolves to false');
  test.equal(template(inline, 0, 1), match, 'Inline <= resolves to true');
  test.equal(template(inline, 1, 0), noMatch, 'Inline <= resolves to false');

  block = Handlebars.compile('{{#compare a ">=" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a ">=" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, 1, 0), match, 'Block >= resolves to true');
  test.equal(template(block, 0, 1), noMatch, 'Block >= resolves to false');
  test.equal(template(inline, 1, 0), match, 'Inline >= resolves to true');
  test.equal(template(inline, 0, 1), noMatch, 'Inline >= resolves to false');

  // The right operand is a type name, not a value. Asserting the mismatch here
  // matters more than usual: this operator used to ignore the right operand
  // altogether and match everything.
  block = Handlebars.compile('{{#compare a "typeof" b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a "typeof" b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, [], 'Array'), match, 'Block typeof resolves to true');
  test.equal(template(block, [], 'Number'), noMatch, 'Block typeof resolves to false');
  test.equal(template(inline, [], 'Array'), match, 'Inline typeof resolves to true');
  test.equal(template(inline, [], 'Number'), noMatch, 'Inline typeof resolves to false');

  // Omitting the operator falls back to ===.
  block = Handlebars.compile('{{#compare a b}}✔︎{{else}}✘{{/compare}}');
  inline = Handlebars.compile('{{#if (compare a b)}}✔︎{{else}}✘{{/if}}');
  test.equal(template(block, 'x', 'x'), match, 'Block defaults to === and resolves to true');
  test.equal(template(block, 'x', 'y'), noMatch, 'Block defaults to === and resolves to false');
  test.equal(template(inline, 'x', 'x'), match, 'Inline defaults to === and resolves to true');
  test.equal(template(inline, 'x', 'y'), noMatch, 'Inline defaults to === and resolves to false');

  block = Handlebars.compile('{{#compare a "foo" b}}✔︎{{/compare}}');
  test.throws(
    function () {
      template(block, 1, 2);
    },
    /needs a valid operator\.$/,
    'Errors with an invalid operator.'
  );

  block = Handlebars.compile('{{#compare a}}✔︎{{/compare}}');
  test.throws(
    function () {
      block({ a: 1 });
    },
    /needs two arguments\.$/,
    'Errors with missing arguments.'
  );
});

function template (compiled, a, b) {
  return compiled({ a: a, b: b });
}
