'use strict';

/**
 * Format a string as a lowercase, URL-friendly value.
 *
 * @since v0.0.1
 * @param {String} str
 * @return {String}
 * @example
 *
 *   {{toSlug "Well, hello there!"}} //=> "well-hello-there"
 */

module.exports = function toSlug (str) {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '-')  // Remove all non-word chars
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
};
