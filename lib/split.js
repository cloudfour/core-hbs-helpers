'use strict';

/**
 * Splits a string or number by a separator string or number.
 * Returns an array that can be iterated over.
 *
 * @since v0.10.0
 * @returns {Array}
 * @param {number | string} input
 * @param {number | string} separator
 * @example
 * {{split "hello" ""}} //=> ["h", "e", "l", "l", "o"]
 * {{split "hello world" " "}} //=> ["hello", "world"]
 * {{split "lions, tigers, and bears" ", "}} //=> ["lions", "tigers", "and bears"]
 * {{split 2020 2}} //=> ["", "0", "0"]
 * {{split 1.35 "."}} //=> ["1", "35"]
 */

function split (input, separator) {
  return input.toString().split(separator);
};

module.exports = split;
