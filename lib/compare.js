'use strict';

const R = require('ramda');

const operators = {
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
