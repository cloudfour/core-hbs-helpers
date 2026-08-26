'use strict';

const R = require('ramda');

/**
 * Output a block (or its inverse) based on whether or not both of the supplied
 * arguments are truthy.
 *
 * @since v0.0.1
 * @deprecated Use the more flexible `all` helper instead.
 * @param {any} left
 * @param {any} right
 * @param {object} options
 * @throws {Error} An error is thrown unless exactly two values are supplied.
 * @returns {string}
 * @example
 * var a = true;
 * var b = 1;
 * var c = false;
 *
 * {{#and a b}}✔︎{{else}}✘{{/and}} //=> ✔︎
 * {{#and b c}}✔︎{{else}}✘{{/and}} //=> ✘
 */

function and (...args) {
  const options = args.pop();

  if (args.length !== 2) {
    throw new Error('The "and" helper needs two arguments.');
  }

  const [left, right] = args;

  return R.and(left, right) ?
    options.fn(this) : options.inverse(this);
}

module.exports = and;
