'use strict';

/**
 * Strip decimal points from a number.
 *
 * @since v0.0.1
 * @param {Number} num
 * @return {Number}
 * @example
 *
 *   {{toFixed 19.99}} //=> 19
 */

module.exports = function toFixed (num) {
  return num.toFixed(2);
};
