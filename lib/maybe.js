'use strict';

/**
 * Output a block randomly (50% chance of being output). Useful for prototyping
 * multiple content scenarios, outputting one or two "dummy" blocks of markup.
 *
 * @since v0.0.1
 * @example
 *
 *   {{#maybe}}
 *     Heads!
 *   {{else}}
 *     Tails!
 *   {{/maybe}}
 */

module.exports = function maybe (options) {
  if (Math.round(Math.random())) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
