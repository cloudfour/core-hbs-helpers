'use strict';

module.exports = function randomIf (options) {
  if (Math.round(Math.random())) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
