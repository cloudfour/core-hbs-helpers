'use strict';

var R = require('ramda');

/**
 * Concatenate items into a single string.
 *
 * @since v0.8.0
 * @param {...*} items
 * @return string
 * @example
 *
 *  {{concat "foo" "bar"}} //=> "foobar"
 */
module.exports = function concat () {
  var items = R.dropLast(1, arguments);

  if (!items.length) {
    throw new Error('The helper "concat" must be passed at least one argument.');
  }

  return items.join('');
}
