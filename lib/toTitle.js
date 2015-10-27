'use strict';

/**
 * Strip leading alphanumeric characters plus spaces from a string. Useful for
 * converting filenames to more usable strings or IDs.
 *
 * @since v0.0.1
 * @param {String} name
 * @return {String}
 * @example
 *
 *   {{toTitle "01 Introduction"}} //=> "Introduction"
 */

module.exports = function toTitle (name) {
  var pattern = /^[0-9]{0,4}[-_]?\s+?/;
  name = name.toString();
  return name.replace(pattern, '');
};
