'use strict';

/**
 * Output a block (or its inverse) based on whether or not all of the supplied
 * arguments are truthy.
 *
 * @since v0.11.0
 * @param {...*} values One or more values to test against.
 * @param {object} options
 * @returns {string | boolean}
 * @example
 * var a = true;
 * var b = 1;
 * var c = false;
 *
 * {{#all a b}}✔︎{{else}}✘{{/all}} //=> ✔︎
 * {{#all b c}}✔︎{{else}}✘{{/all}} //=> ✘
 * 
 * {{#if (all a b)}}
 *   Also works inline!
 * {{/if}}
 */

function all(...values) {
  const options = values.pop();
  const result = values.every(Boolean);

  if (options.fn) {
    return result ? options.fn(this) : options.inverse(this);
  }

  return result;
}

module.exports = all;
