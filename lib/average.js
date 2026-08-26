'use strict';

/**
 * Average an array of numeric values.
 *
 * @since v0.0.1
 * @param {Array} arr
 * @returns {number} Returns the average of all values.
 * @example
 * var numbers = [1, 2, 3];
 * var products = [{rating: 1}, {rating: 2}, {rating: 3}];
 *
 * {{average ratings}} //=> 2
 * {{average products key="rating"}} //=> 2
 */

function average (arr, options) {
  if (!Array.isArray(arr)) {
    throw new TypeError('The helper "average" must be passed an Array.');
  }

  const key = options.hash.key;
  if (key) {
    arr = arr.map((item) => item[key]);
  }

  const sum = arr.reduce((prev, current) => prev + current);
  return sum / arr.length;
}

module.exports = average;
