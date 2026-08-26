'use strict';

const Capitalize = require('capitalize');
const R = require('ramda');

/**
 * Capitalize the first letter of a String.
 *
 * @since 0.4.0
 * @param {string | *} str - String to capitalize. Other types will be converted.
 * @param {object} options
 * @returns {string}
 * @throws {TypeError} An error is thrown when no value is supplied.
 * @example
 * {{capitalize "hello world"}} //=> "Hello world"
 */

function capitalize (...args) {
  // Handlebars always appends its options object, so the value to capitalize is
  // the argument before it. Reading `args[0]` instead would mistake the options
  // object for the value when the helper is called as bare `{{capitalize}}`.
  let [str] = args.slice(0, -1);

  if (R.isNil(str)) {
    throw new TypeError('The "capitalize" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize(str); // eslint-disable-line new-cap -- The published export is capitalized.
};

module.exports = capitalize;
