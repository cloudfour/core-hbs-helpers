'use strict';

const R = require('ramda');

/**
 * Output a block (or its inverse) based on whether or not either of the supplied
 * arguments are truthy.
 *
 * @since v0.0.1
 * @deprecated Use the more flexible `any` helper instead.
 * @param {any} left
 * @param {any} right
 * @param {object} options
 * @throws {Error} An error is thrown unless exactly two values are supplied.
 * @returns {string}
 * @example
 * var a = true;
 * var b = 1;
 * var c = false;
 * var d = 0;
 *
 * {{#or a c}}✔︎{{else}}✘{{/or}} //=> ✔︎
 * {{#or b c}}✔︎{{else}}✘{{/or}} //=> ✔︎
 * {{#or c d}}✔︎{{else}}✘{{/or}} //=> ✘
 */

function or (...args) {
  const options = args.pop();

  if (args.length !== 2) {
    throw new Error('The "or" helper needs two arguments.');
  }

  const [left, right] = args;

  return R.or(left, right) ?
    options.fn(this) : options.inverse(this);
}

module.exports = or;
