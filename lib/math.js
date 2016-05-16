'use strict';

var R = require('ramda');

var operators = {
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
 * @param {*} left
 * @param {String} operator
 * @param {*} right
 * @param {Object} options
 * @return {Number}
 * @example:
 *
 *  {{math 1 "+" 2}} //=> 3
 *  {{math 2 "-" 1}} //=> 1
 *  {{math 2 "*" 3}} //=> 6
 *  {{math 9 "/" 3}} //=> 3
 *  {{math 17 "%" 3}} //=> 2
 *  {{math 2 "**" 3}} //=> 8
 *  {{math 1 "++"}} //=> 2
 *  {{math 2 "--"}} //=> 1
 */

module.exports = function math (left, operator, right, options) {
  if (arguments.length < 3) {
    throw new Error('The "math" helper needs at least two arguments.');
  }

  if (options === undefined) {
    options = right;
    right = undefined;
  }

  left = parseFloat(left);
  right = parseFloat(right);

  if (operators[operator] === undefined) {
    throw new Error ('The "math" helper needs a valid operator.');
  }

  return operators[operator](left, right);
}
