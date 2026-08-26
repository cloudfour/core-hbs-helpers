'use strict';

/**
 * Converts a string to JSON; useful when used in helper sub-expressions.
 *
 * @since v0.0.1
 * @param {string} str
 * @returns {Array | object}
 * @example
 * {{#each (toJSON '[1,2,3]')}}{{this}}{{/each}} //=> '123'
 */

function toJSON (str) {
  str = str.toString();
  try {
    return JSON.parse(str);
  } catch {
    throw new Error(
      'The "toJSON" helper must be passed a valid JSON string.'
    );
  }
};

module.exports = toJSON;
