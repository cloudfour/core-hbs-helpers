'use strict';

const Capitalize = require('capitalize');
const R = require('ramda');

/**
 * Capitalize each word in a String. Works with punctuation and international
 * characters.
 *
 * @since 0.4.0
 * @param {string | *} str - String to capitalize. Other types will be converted.
 * @returns {string}
 * @example
 * {{capitalizeWords "hello world"}} //=> "Hello World"
 * {{capitalizeWords "hello-cañapolísas"}} //=> "Hello-Cañapolísas"
 * {{capitalizeWords "it's a nice day"}} //=> "It's A Nice Day"
 */

function capitalizeWords (str) {
  if (R.isNil(str)) {
    throw new TypeError('The "capitalizeWords" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize.words(str);
};

module.exports = capitalizeWords;
