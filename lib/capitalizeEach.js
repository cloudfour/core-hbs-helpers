'use strict';

var R = require('ramda');
var capitalize = require('capitalize');

/**
 * Capitalize each word in a String. Works with punctuation and international
 * characters.
 *
 * @since 0.5.0
 * @param {String|*} str - String to capitalize. Other types will be converted.
 * @return {String}
 * @example:
 *
 *    {{capitalizeEach "hello world"}} //=> "Hello World"
 *    {{capitalizeEach "hello-cañapolísas"}} //=> "Hello-Cañapolísas"
 *    {{capitalizeEach "it's a nice day"}} //=> "It's A Nice Day"
 */

module.exports = function capitalizeEach (str) {
  if (R.isNil(str)) {
    throw new Error('The "capitalizeEach" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return capitalize.words(str);
};
