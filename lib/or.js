'use strict';

var R = require('ramda');

module.exports = function or (left, right, options) {
  if (arguments.length < 3) {
    throw new Error('The "or" helper needs two arguments.');
  }
  return R.or(left, right) ?
    options.fn(this) : options.inverse(this);
}
