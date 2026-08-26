'use strict';

const R = require('ramda');

/**
 * Concatenate items into a single string.
 *
 * @since v0.8.0
 * @param {...*} items
 * @returns {string}
 * @example
 * {{concat "foo" "bar"}} //=> "foobar"
 */
function concat (...items) {
  const values = R.dropLast(1, items);

  if (values.length === 0) {
    throw new Error('The helper "concat" must be passed at least one argument.');
  }

  return values.join('');
}

module.exports = concat;
