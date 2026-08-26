'use strict';

const R = require('ramda');

const defaults = {
  offset: 0
};

/**
 * Slices a list based on a center-point and a maximum amount of "padding"
 * before and after. Useful for pagination.
 *
 * Supports an optional `offset` hash option in case your center
 * value isn't matching up with your array indexes.
 *
 * @since v0.0.1
 * @param {Array} items - Collection to iterate over.
 * @param {number} center - The center-point of the collection (for example, current page).
 * @param {number} padding - The amount of items to allow before or after the center.
 * @param {object} block
 * @returns {string}
 * @example
 * <ul>
 *   {{#around pages 5 2 offset=-1}}
 *     <li><a href="/page/{{num}}">Page {{num}}</a></li>
 *   {{/around}}
 * </ul>
 *
 * {{! Output: }}
 * <ul>
 *   <li><a href="/page/3">Page 3</a></li>
 *   <li><a href="/page/4">Page 4</a></li>
 *   <li><a href="/page/5">Page 5</a></li>
 *   <li><a href="/page/6">Page 6</a></li>
 *   <li><a href="/page/7">Page 7</a></li>
 * </ul>
 */

function around (items, center, padding, block) {
  let result = '';
  const options =
    block && block.hash
      ? R.mergeRight(defaults, block.hash)
      : R.clone(defaults);
  let start; let end;

  center = Number.parseFloat(center) + options.offset;
  padding = Number.parseFloat(padding);
  const max = (padding * 2) + 1;

  if (items.length > max) {
    start = center - padding;
    end = center + padding + 1;

    if (start < 0) {
      end -= start;
      start = 0;
    }

    if (end > items.length) {
      start -= end - items.length;
      end = items.length;
    }

    items = items.slice(start, end);
  }

  for (const item of items) {
    result += block.fn(item);
  }

  return result;
};

module.exports = around;
