'use strict';

var R = require('ramda');
var Capitalize = require('capitalize');

/**
 * Capitalize each word in a String. Works with punctuation and international
 * characters.
 *
 * @since 0.4.0
 * @param {String|*} str - String to capitalize. Other types will be converted.
 * @return {String}
 * @example:
 *
 *    {{capitalizeWords "hello world"}} //=> "Hello World"
 *    {{capitalizeWords "hello-cañapolísas"}} //=> "Hello-Cañapolísas"
 *    {{capitalizeWords "it's a nice day"}} //=> "It's A Nice Day"
 */

module.exports = function capitalizeWords (str) {
  if (R.isNil(str)) {
    throw new Error('The "capitalizeWords" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize.words(str);
};
