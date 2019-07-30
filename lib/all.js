'use strict';

/**
 * Output a block (or its inverse) based on whether or not all of the supplied
 * arguments are truthy.
 *
 * @since v0.11.0
 * @param {...*} values One or more values to test against.
 * @param {Object} options
 * @return {String|Boolean}
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

function all() {
  var values = Array.prototype.slice.call(arguments);
  var options = values.pop();
  var result = values.every(function (value) {
    return value;
  });

  if (options.fn) {
    return result ? options.fn(this) : options.inverse(this);
  }

  return result;
}

module.exports = all;
