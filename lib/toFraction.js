'use strict';

const n2f = require('num2fraction');

const vulgarities = {
  '1/4': '¼',
  '1/2': '½',
  '3/4': '¾',
  '1/3': '⅓',
  '2/3': '⅔',
  '1/5': '⅕',
  '2/5': '⅖',
  '3/5': '⅗',
  '4/5': '⅘',
  '1/6': '⅙',
  '5/6': '⅚',
  '1/8': '⅛',
  '3/8': '⅜',
  '5/8': '⅝',
  '7/8': '⅞'
};

/**
 * Format a decimal as a fractional HTML entity if possible.
 *
 * @since v0.0.1
 * @param {number} value
 * @returns {string | number}
 * @example
 * {{toFraction 1.25}} //=> "1¼"
 * {{toFraction 3.1666}} //=> "3⅙"
 * {{toFraction 2.7}} //=> 2.7
 */

function toFraction (value) {
  const integer = Math.floor(value);
  const decimal = value - integer;
  const key = n2f(decimal);
  return Object.hasOwn(vulgarities, key) ? integer + vulgarities[key] : value;
};

module.exports = toFraction;
