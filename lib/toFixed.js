'use strict';

/**
 * Format number to two fixed decimal points (like a price).
 *
 * @since v0.0.1
 * @param {Number|String} num
 * @return {String}
 * @example
 *
 *   {{toFixed 1}} //=> 1.00
 */

module.exports = function toFixed (num) {
  var int = parseFloat(num);
  if (isNaN(int)) {
    throw new Error('The "toFixed" helper must be passed a number-like value.');
  }
  return int.toFixed(2);
};
