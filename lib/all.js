'use strict';

var R = require('ramda');

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
  var values = R.dropLast(1, arguments);
  var options = R.last(arguments);
  var result = true;
  var i;

  for (i = 0; i < values.length; i++) {
    if (!values[i]) {
      result = false;
      break;
    }
  }

  if (options.fn) {
    return result ? options.fn(this) : options.inverse(this);
  }

  return result;
}

module.exports = all;
