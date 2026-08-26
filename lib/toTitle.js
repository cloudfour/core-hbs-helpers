'use strict';

/**
 * Strip leading alphanumeric characters plus spaces from a string. Useful for
 * converting filenames to more usable strings or IDs.
 *
 * @since v0.0.1
 * @param {string} name
 * @returns {string}
 * @example
 * {{toTitle "01 Introduction"}} //=> "Introduction"
 */

function toTitle (name) {
  // The trailing quantifier is lazy with a minimum of one, so it only ever
  // matched a single whitespace character.
  const pattern = /^\d{0,4}[\-_]?\s/v;
  name = name.toString();
  return name.replace(pattern, '');
};

module.exports = toTitle;
