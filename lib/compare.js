'use strict';

var R = require('ramda');

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
 * {{#compare 1 "<" 2}}
 *   This is true.
 * {{else}}
 *   This is false.
 * {{/compare}}
 *
 * {{#if (compare 1 "<" 2)}}
 *   Also works inline!
 * {{/if}}
 */

function compare (left, operator, right, options) {
  var result;
  
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

  result = operators[operator](left, right);
  
  if (R.isNil(options.fn)) {
    return result;
  }

  return result ? options.fn(this) : options.inverse(this);
};

module.exports = compare;
