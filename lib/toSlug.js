'use strict';

/**
 * Format a string as a lowercase, URL-friendly value.
 *
 * @since v0.0.1
 * @param {string} str
 * @returns {string}
 * @example
 * {{toSlug "Well, hello there!"}} //=> "well-hello-there"
 */

function toSlug (str) {
  return str
    .toString()
    .toLowerCase()
    .replaceAll(/\s+/gv, '-')       // Replace spaces with -
    .replaceAll(/[^\w\-]+/gv, '-')  // Remove all non-word chars
    .replaceAll(/-{2,}/gv, '-')     // Replace multiple - with single -
    // Runs of hyphens have already been collapsed above, so at most one can be
    // left at either end. Matching a single character rather than `-+` keeps
    // this linear on adversarial input.
    .replace(/^-/v, '')             // Trim - from start of text
    .replace(/-$/v, '');            // Trim - from end of text
};

module.exports = toSlug;
