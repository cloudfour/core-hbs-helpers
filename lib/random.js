'use strict';

var R = require('ramda');
var Chance = require('chance');
var chance;

/**
 * Generate a random integer or any other type of random content supported by
 * [Chance.js](http://chancejs.com).
 *
 * @since v0.4.0
 * @param {String} [method=integer] - Chance method to use.
 * @param {Object} options
 * @param {Object} options.hash - Additional options to pass to method.
 * @return {*}
 * @see {@link http://chancejs.com|Chance.js}
 * @example
 *
 *    {{random}} //=> 1839473434
 *    {{random min=5 max=10}} //=> 7
 *    {{random "state"}} //=> WA
 *    {{random "dollar" max=20}} //=> $17.42
 */

module.exports = function random () {
  var options = R.last(arguments);
  var hash = options.hash || {};
  var method = arguments.length > 1 ? arguments[0] : 'integer';

  if (!R.is(String, method)) {
    throw new Error('The "random" helper\'s first argument must be a String.');
  }

  chance = chance || new Chance();

  if (!R.propIs(Function, method, chance)) {
    throw new Error('The "random" helper does not support the "' + method + '" method.');
  }

  return chance[method](hash);
};
