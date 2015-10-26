'use strict';

/**
 * Average an array of numeric values.
 *
 * @since v0.0.1
 * @param {Array} arr
 * @return {Number} Returns the average of all values.
 * @example
 *
 *   var numbers = [1, 2, 3];
 *   var products = [{rating: 1}, {rating: 2}, {rating: 3}];
 *
 *   {{average ratings}} //=> 2
 *   {{average products key="rating"}} //=> 2
 */

module.exports = function average (arr, options) {
  var isArray = Array.isArray(arr);
  var key = options.hash.key;
  var sum;

  if (!isArray) {
    throw new Error('The helper "average" must be passed an Array.');
  }
  if (key) {
    arr = arr.map(function (item) {
      return item[key];
    });
  }
  sum = arr.reduce(function (prev, current) {
    return prev + current;
  });
  return sum / arr.length;
}
