'use strict';

const Capitalize = require('capitalize');
const R = require('ramda');

/**
 * Capitalize the first letter of a String.
 *
 * @since 0.4.0
 * @param {string | *} str - String to capitalize. Other types will be converted.
 * @returns {string}
 * @example
 * {{capitalize "hello world"}} //=> "Hello world"
 */

function capitalize (str) {
  if (R.isNil(str)) {
    throw new TypeError('The "capitalize" helper requires one argument.')
  }

  if (!R.is(String, str)) {
    str = str.toString();
  }

  return Capitalize(str); // eslint-disable-line new-cap -- The published export is capitalized.
};

module.exports = capitalize;
