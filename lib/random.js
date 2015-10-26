'use strict';

/**
 * Return only one random item from an array.
 *
 * @since v0.0.1
 * @param {Array} arr
 * @return One random item.
 * @example
 *
 *   var beatles = ["John", "Paul", "George", "Ringo"];
 *   {{random beatles}} //=> "George"
 */

module.exports = function random (arr) {
  var isArray = Array.isArray(arr);
  if (!isArray)
    throw new Error('The helper "random" must be passed an Array.');
  return arr[Math.floor(Math.random() * arr.length)];
};
