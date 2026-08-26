'use strict';

const Capitalize = require('capitalize');
const R = require('ramda');

/**
 * Capitalize each word in a String. Works with punctuation and international
 * characters.
 *
 * @since 0.4.0
 * @param {string | *} str - String to capitalize. Other types will be converted.
 * @param {object} options
 * @returns {string}
 * @throws {TypeError} An error is thrown when no value is supplied.
 * @example
 * {{capitalizeWords "hello world"}} //=> "Hello World"
 * {{capitalizeWords "hello-cañapolísas"}} //=> "Hello-Cañapolísas"
 * {{capitalizeWords "it's a nice day"}} //=> "It's A Nice Day"
 */

function capitalizeWords (...args) {
  // Handlebars always appends its options object, so the value to capitalize is
  // the argument before it. Reading `args[0]` instead would mistake the options
  // object for the value when the helper is called as bare `{{capitalizeWords}}`.
  let [str] = args.slice(0, -1);

  if (R.isNil(str)) {
    throw new TypeError('The "capitalizeWords" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize.words(str);
};

module.exports = capitalizeWords;
