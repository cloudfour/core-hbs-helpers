'use strict';

/**
 * Format number to two fixed decimal points (like a price).
 *
 * @since v0.0.1
 * @param {number | string} num
 * @returns {string}
 * @example
 * {{toFixed 1}} //=> 1.00
 */

function toFixed (num) {
  const int = Number.parseFloat(num);
  if (Number.isNaN(int)) {
    throw new TypeError('The "toFixed" helper must be passed a number-like value.');
  }
  return int.toFixed(2);
};

module.exports = toFixed;
