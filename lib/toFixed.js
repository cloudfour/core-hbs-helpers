'use strict';

/**
 * Format number to two fixed decimal points (like a price).
 *
 * @since v0.0.1
 * @param {Number} num
 * @return {String}
 * @example
 *
 *   {{toFixed 1}} //=> 1.00
 */

module.exports = function toFixed (num) {
  return num.toFixed(2);
};
