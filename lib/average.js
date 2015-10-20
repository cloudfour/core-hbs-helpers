'use strict';

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
