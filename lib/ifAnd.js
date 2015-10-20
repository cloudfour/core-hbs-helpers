'use strict';

module.exports = function ifAnd (test1, test2, options) {
  if (test1 && test2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
