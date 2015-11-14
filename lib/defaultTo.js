'use strict';

var R = require('ramda');

/**
 * Output a value if it exists, or fallback to a default if it does not.
 *
 * @since v0.0.1
 * @param {*} value
 * @param {*} fallback
 * @param {Object} options
 * @return {String}
 * @example
 *
 *  var doesExist = 'Hello';
 *
 *  {{defaultTo doesExist "Goodbye"}} // => "Hello"
 *  {{defaultTo doesNotExist "Goodbye"}} // => "Goodbye"
 *  {{defaultTo doesNotExist}} // => ""
 */

module.exports = function defaultTo (value, fallback, options) {
  var defaultBlank = R.defaultTo('');
  var defaultFallback = R.defaultTo(fallback);
  return R.isNil(options) ?
    defaultBlank(value) : R.pipe(defaultFallback, defaultBlank)(value);
};
