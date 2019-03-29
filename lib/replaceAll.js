'use strict';

/**
 * Replace all occurrences of a string in another string
 * Can also be used on numbers, though they'll be treated as strings.
 * Case sensitive
 *
 * @since 0.6.1
 * @return {String}
 * @param {Number|String} input
 * @param {Number|String} find
 * @param {Number|String} replace
 * @example
 * {{replaceAll "9:00" ":00" ""}} //=> "9"
 * {{replaceAll "excellent" "e" ""}} //=> xcllnt
 * {{replaceAll "She sells sea shells by the seashore" "sh" "barb"}} //=> "She sells sea barbells by the seabarbore"
 * {{replaceAll "30 bucks" 30, 1000000000}} //=> "1000000000 bucks"
 */

function replaceAll (input, find, replace) {
  let regex = new RegExp(find, 'g');
  return input.replace(regex, replace);
};

module.exports = replaceAll;
