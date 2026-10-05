'use strict';

/**
 * Output a block randomly (50% chance of being output). Useful for prototyping
 * multiple content scenarios, outputting one or two "dummy" blocks of markup.
 *
 * @since v0.0.1
 * @example
 * {{#maybe}}
 *   Heads!
 * {{else}}
 *   Tails!
 * {{/maybe}}
 */

function maybe (options) {
  return Math.round(Math.random()) ? options.fn(this) : options.inverse(this);
};

module.exports = maybe;
