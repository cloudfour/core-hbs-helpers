'use strict';

const R = require('ramda');

/**
 * Output the first provided value that exists, or fallback to a default if
 * none do.
 *
 * @since v0.0.1
 * @param {...*} value
 * @returns {string}
 * @example
 * var doesExist = 'Hello';
 *
 * {{defaultTo doesExist "Goodbye"}} // => "Hello"
 * {{defaultTo doesNotExist "Goodbye"}} // => "Goodbye"
 * {{defaultTo doesNotExist}} // => ""
 * {{defaultTo doesNotExist doesExist "Goodbye"}} // => "Hello"
 */

function defaultTo (...args) {
  const values = R.append('', R.dropLast(1, args));
  return R.head(R.reject(R.isNil, values));
};

module.exports = defaultTo;
