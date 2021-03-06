'use strict';

var R = require('ramda');

/**
 * Output a block (or its inverse) based on whether or not both of the supplied
 * arguments are truthy.
 *
 * @since v0.0.1
 * @deprecated Use the more flexible `all` helper instead.
 * @param {*} left
 * @param {*} right
 * @param {Object} options
 * @throws {Error} An error is thrown when the `right` argument is missing.
 * @return {String}
 * @example
 * var a = true;
 * var b = 1;
 * var c = false;
 *
 * {{#and a b}}✔︎{{else}}✘{{/and}} //=> ✔︎
 * {{#and b c}}✔︎{{else}}✘{{/and}} //=> ✘
 */

function and (left, right, options) {
  if (arguments.length < 3) {
    throw new Error('The "and" helper needs two arguments.');
  }
  return R.and(left, right) ?
    options.fn(this) : options.inverse(this);
}

module.exports = and;
