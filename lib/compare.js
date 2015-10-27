'use strict';

var R = require('ramda');

/**
 * Compare two values using logical operators.
 *
 * @credit: github.com/assemble
 * @param {*} left
 * @param {String} operator
 * @param {*} right
 * @param {Object} options
 * @return {String} formatted html
 * @example:
 *
 *  {{#compare 1 "<" 2}}
 *    This is true.
 *  {{else}}
 *    This is false.
 *  {{/compare}}
 */

module.exports = function compare (left, operator, right, options) {
  var operators = {
    '==': R.equals,
    '===': R.identical,
    '!=': R.complement(R.equals),
    '!==': R.complement(R.identical),
    '<': R.lt,
    '>': R.gt,
    '<=': R.lte,
    '>=': R.gte,
    'typeof': R.type(R.__)
  };

  if (arguments.length < 3) {
    throw new Error('The "compare" helper needs two arguments.');
  }

  if (options === undefined) {
    options = right;
    right = operator;
    operator = '===';
  }

  if (operators[operator] === undefined) {
    throw new Error('The "compare" helper needs a valid operator.')
  }

  return operators[operator](left, right) ?
    options.fn(this) : options.inverse(this);
};
