'use strict';

const R = require('ramda');

const operators = {
  // These four are named after JavaScript's operators but do not behave like
  // them, in both directions. `R.equals` is deep structural equality: stricter
  // than JS `==` on primitives, because it never coerces, and looser than JS
  // `===` on objects, because it compares contents rather than references.
  // `R.identical` is SameValue, which is JS `===` plus NaN equalling itself.
  // Documented rather than changed -- see issue #198.
  '==': R.equals,
  '===': R.identical,
  '!=': R.complement(R.equals),
  '!==': R.complement(R.identical),
  '<': R.lt,
  '>': R.gt,
  '<=': R.lte,
  '>=': R.gte,
  // `R.type` is unary, so `R.type(R.__)` would be a unary function that ignores
  // the right operand entirely and returns the type name of the left one --
  // always truthy, so the block always rendered. Compare the names explicitly.
  'typeof' (left, right) {
    return R.type(left) === right;
  }
};

/**
 * Compare two values using logical operators.
 *
 * The operators are named after JavaScript's, but the equality ones do not
 * behave like JavaScript's, so read this before reaching for `==`.
 *
 * `==` and `!=` are **deep structural** equality. No coercion happens, so
 * `1 == "1"` is false where JavaScript would say true; and objects are compared
 * by contents, so two separate arrays holding the same values are equal where
 * JavaScript would say false. This matters most for values arriving from JSON,
 * front matter, or query strings, where a number may well be a string.
 *
 * `===` and `!==` compare identity, matching JavaScript's `===` except that
 * `NaN` equals itself.
 *
 * The relational operators (`<`, `>`, `<=`, `>=`) behave as expected, and
 * `typeof` compares against a type name such as `"Array"` or `"Number"`.
 *
 * @credit github.com/assemble
 * @param {any} left
 * @param {string} operator
 * @param {any} right
 * @param {object} options
 * @returns {(string | boolean)} formatted html if block, true/false if inline
 * @example
 * {{#compare 1 "<" 2}}
 *   This is true.
 * {{else}}
 *   This is false.
 * {{/compare}}
 *
 * {{#if (compare 1 "<" 2)}}
 *   Also works inline!
 * {{/if}}
 *
 * {{#compare items "typeof" "Array"}}
 *   The "typeof" operator compares against a type name.
 * {{/compare}}
 *
 * {{#compare 1 "==" "1"}}
 *   Not rendered: "==" does not coerce, unlike JavaScript's.
 * {{/compare}}
 *
 * {{#compare listA "==" listB}}
 *   Rendered when both lists hold equal values, even as separate arrays.
 * {{/compare}}
 */

function compare (...args) {
  const options = args.pop();

  if (args.length < 2 || args.length > 3) {
    throw new Error('The "compare" helper needs two arguments.');
  }

  // The operator may be omitted, in which case the values are compared for
  // identity: `{{#compare a b}}`.
  const [left, operator, right] = args.length === 2
    ? [args[0], '===', args[1]]
    : args;

  if (operators[operator] === undefined) {
    throw new Error('The "compare" helper needs a valid operator.')
  }

  const result = operators[operator](left, right);

  if (R.isNil(options.fn)) {
    return result;
  }

  return result ? options.fn(this) : options.inverse(this);
};

module.exports = compare;
