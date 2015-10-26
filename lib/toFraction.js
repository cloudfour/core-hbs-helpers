'use strict';

var fractionMap = {
  25: 188,
  50: 189,
  75: 190,
  33: 8531,
  66: 8532,
  20: 8533,
  40: 8534,
  60: 8535,
  80: 8536,
  16: 8537,
  83: 8538,
  12: 8539,
  37: 8540,
  62: 8541,
  87: 8542
};

module.exports = function toFraction (value) {
  var integer = Math.floor(value);
  var decimal = value - integer;
  var key = Math.floor(decimal * 100);

  if (fractionMap.hasOwnProperty(key)) {
    value = integer + '&#' + fractionMap[key] + ';';
  }
  return value;
};
