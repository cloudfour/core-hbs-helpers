'use strict';

/**
 * Output a block (or its inverse) based on whether or not any of the supplied
 * arguments are truthy.
 *
 * @since v0.11.0
 * @param {...*} values One or more values to test against.
 * @param {Object} options
 * @return {String|Boolean}
 * @example
 * var a = true;
 * var b = 0;
 * var c = false;
 *
 * {{#any a b}}✔︎{{else}}✘{{/all}} //=> ✔︎
 * {{#any b c}}✔︎{{else}}✘{{/all}} //=> ✘
 * 
 * {{#if (any a b)}}
 *   Also works inline!
 * {{/if}}
 */

function any() {
  var values = Array.prototype.slice.call(arguments);
  var options = values.pop();
  var result = values.some(function (value) {
    return value;
  });
  
  if (options.fn) {
    return result ? options.fn(this) : options.inverse(this);
  }
  
  return result;
}

module.exports = any;
