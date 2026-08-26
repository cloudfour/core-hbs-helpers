'use strict';

const R = require('ramda');

const operators = {
  '+': R.add,
  '-': R.subtract,
  '*': R.multiply,
  '/': R.divide,
  '%': R.modulo,
  '**': Math.pow,
  '++': R.inc,
  '--': R.dec
};

/**
 * Perform mathematical operations on one or two values.
 *
 * @param {any} left
 * @param {string} operator
 * @param {any} right
 * @param {object} options
 * @returns {number}
 * @example
 * {{math 1 "+" 2}} //=> 3
 * {{math 2 "-" 1}} //=> 1
 * {{math 2 "*" 3}} //=> 6
 * {{math 9 "/" 3}} //=> 3
 * {{math 17 "%" 3}} //=> 2
 * {{math 2 "**" 3}} //=> 8
 * {{math 1 "++"}} //=> 2
 * {{math 2 "--"}} //=> 1
 */

function math (...args) {
  // The last argument is always the Handlebars options object, which this
  // helper has no use for.
  const values = args.slice(0, -1);

  if (values.length < 2) {
    throw new Error('The "math" helper needs at least two arguments.');
  }

  // `right` is left undefined for the unary operators, `++` and `--`.
  const [left, operator, right] = values;

  if (operators[operator] === undefined) {
    throw new Error ('The "math" helper needs a valid operator.');
  }

  return operators[operator](Number.parseFloat(left), Number.parseFloat(right));
}

module.exports = math;
