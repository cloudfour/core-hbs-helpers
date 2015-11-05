'use strict';

/**
 * Converts a string to JSON; useful when used in helper sub-expressions.
 *
 * @since v0.0.1
 * @param {String} str
 * @return {Array|Object}
 * @example
 *
 *    {{toJSON '[1,2,3]'}} //=> [1, 2, 3]
 *
 *    {{toJSON '{"foo": "bar"}'}} //=> {"foo": "bar"}
 *
 *    {{#each (toJSON '[1,2,3]')}}{{this}}{{/each}} //=> '123'
 */

module.exports = function toJSON (str) {
  str = str.toString();
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error(
      'The "toJSON" helper must be passed a valid JSON string.'
    );
  }
};
