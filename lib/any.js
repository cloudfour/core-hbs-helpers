'use strict';

var R = require('ramda');

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
  var options = R.last(arguments);
  var result = false;
  var values;
  var i;
  
  if (R.isNil(options.fn)) {
    options = undefined;
    values = arguments;
  } else {
    values = R.dropLast(1, arguments);
  }
  
  for (i = 0; i < values.length; i++) {
    if (values[i]) {
      result = true;
      break;
    }
  }
  
  if (options) {
    return result ? options.fn(this) : options.inverse(this);
  }
  
  return result;
}

module.exports = any;
