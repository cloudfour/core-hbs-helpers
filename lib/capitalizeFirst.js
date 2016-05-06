'use strict';

var R = require('ramda');
var capitalize = require('capitalize');

/**
 * Capitalize the first letter of a String.
 *
 * @since 0.5.0
 * @param {String|*} str - String to capitalize. Other types will be converted.
 * @return {String}
 * @example:
 *
 *    {{capitalizeFirst "hello world"}} //=> "Hello world"
 */

module.exports = function capitalizeFirst (str) {
  if (R.isNil(str)) {
    throw new Error('The "capitalizeFirst" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return capitalize(str);
};
