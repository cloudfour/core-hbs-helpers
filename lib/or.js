'use strict';

var R = require('ramda');

/**
 * Output a block (or its inverse) based on whether or not either of the suppied
 * arguments are truthy.
 *
 * @since v0.0.1
 * @param {*} left
 * @param {*} right
 * @param {Object} options
 * @throws {Error} An error is thrown when the `right` argument is missing.
 * @return {String}
 * @example
 *
 *  var a = true;
 *  var b = 1;
 *  var c = false;
 *  var d = 0;
 *
 *  {{#or a c}}✔︎{{else}}✘{{/or}} //=> ✔︎
 *  {{#or b c}}✔︎{{else}}✘{{/or}} //=> ✔︎
 *  {{#or c d}}✔︎{{else}}✘{{/or}} //=> ✘
 */

module.exports = function or (left, right, options) {
  if (arguments.length < 3) {
    throw new Error('The "or" helper needs two arguments.');
  }
  return R.or(left, right) ?
    options.fn(this) : options.inverse(this);
}
