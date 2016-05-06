'use strict';

var R = require('ramda');
var Capitalize = require('capitalize');

/**
 * Capitalize the first letter of a String.
 *
 * @since 0.4.0
 * @param {String|*} str - String to capitalize. Other types will be converted.
 * @return {String}
 * @example:
 *
 *    {{capitalize "hello world"}} //=> "Hello world"
 */

module.exports = function capitalize (str) {
  if (R.isNil(str)) {
    throw new Error('The "capitalize" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize(str);
};
