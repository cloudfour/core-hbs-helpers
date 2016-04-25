'use strict';

var R = require('ramda');

/**
 * Output the first provided value that exists, or fallback to a default if
 * none do.
 *
 * @since v0.0.1
 * @param {...*} value
 * @return {String}
 * @example
 *
 *  var doesExist = 'Hello';
 *
 *  {{defaultTo doesExist "Goodbye"}} // => "Hello"
 *  {{defaultTo doesNotExist "Goodbye"}} // => "Goodbye"
 *  {{defaultTo doesNotExist}} // => ""
 *  {{defaultTo doesNotExist doesExist "Goodbye"}} // => "Hello"
 */

module.exports = function defaultTo () {
  var values = R.append('', R.dropLast(1, arguments));
  return R.head(R.reject(R.isNil, values));
};
