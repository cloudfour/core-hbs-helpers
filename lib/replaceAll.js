'use strict';

/**
 * Replace all occurrences of a string in another string
 * Can also be used on numbers, though they'll be treated as strings.
 * Case sensitive
 *
 * @since 0.6.1
 * @returns {string}
 * @param {number | string} input
 * @param {number | string} find
 * @param {number | string} replace
 * @example
 * {{replaceAll "9:00" ":00" ""}} //=> "9"
 * {{replaceAll "excellent" "e" ""}} //=> xcllnt
 * {{replaceAll "She sells sea shells by the seashore" "sh" "barb"}} //=> "She sells sea barbells by the seabarbore"
 * {{replaceAll "30 bucks" 30, 1000000000}} //=> "1000000000 bucks"
 */

function replaceAll (input, find, replace) {
  // `find` and `replace` come straight from a template. Adding the `v` flag
  // would reject patterns this accepts today, and switching to a literal
  // String#replaceAll would stop treating `find` as a pattern at all. Both are
  // changes to what the helper does, so neither is decided here.
  // eslint-disable-next-line require-unicode-regexp -- See above.
  const regex = new RegExp(find, 'g');
  // eslint-disable-next-line unicorn/no-unsafe-string-replacement -- See above.
  return input.toString().replace(regex, replace);
};

module.exports = replaceAll;
