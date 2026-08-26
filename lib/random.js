'use strict';

const Chance = require('chance');
const R = require('ramda');

let chance;

/**
 * Generate a random integer or any other type of random content supported by
 * [Chance.js](https://chancejs.com).
 *
 * @since v0.4.0
 * @param {string} [method=integer] - Chance method to use.
 * @param {object} options
 * @param {object} options.hash - Additional options to pass to method.
 * @returns {any}
 * @see {@link https://chancejs.com|Chance.js}
 * @example
 * {{random}} //=> 1839473434
 * {{random min=5 max=10}} //=> 7
 * {{random "state"}} //=> WA
 * {{random "dollar" max=20}} //=> $17.42
 */

function random (...args) {
  const options = args.pop();
  const hash = options.hash || {};
  const [method = 'integer'] = args;

  if (!R.is(String, method)) {
    throw new Error('The "random" helper\'s first argument must be a String.');
  }

  chance ||= new Chance();

  if (!R.propIs(Function, method, chance)) {
    throw new Error(`The "random" helper does not support the "${method}" method.`);
  }

  return chance[method](hash);
};

module.exports = random;
