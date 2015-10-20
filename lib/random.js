'use strict';

module.exports = function random (arr) {
  var isArray = Array.isArray(arr);
  if (!isArray)
    throw new Error('The helper "randomOf" must be passed an Array.');
  return arr[Math.floor(Math.random() * arr.length)];
};
