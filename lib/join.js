'use strict';

var R = require('ramda');

var defaults = {
  separator: ', ',
  lastSeparator: false
};

/**
 * Output a string by concatening all the items in an array separated by commas
 * or an optional custom separator. Final separator may be customized as well.
 *
 * @since v0.12.0
 * @param {Array} list
 * @param {String} [options.hash.separator=", "]
 * @param {String} [options.hash.lastSeparator] Optional different separator to
 * use before the last item in the array.
 * @return string
 * @example
 * var items = ["a", "b", "c", "d"];
 * {{join items}} //=> a, b, c, d
 * {{join items separator="; "}} // => a; b; c; d
 * {{join items lastSeparator=" and "}} //=> a, b, c and d
 */

function join (list, options) {
  if (!Array.isArray(list) || list.length < 1) {
    return '';
  }

  if (list.length === 1) {
    return list[0];
  }

  var settings = R.merge(defaults, options.hash);
  var items = list;
  var lastItem;

  if (!R.is(String, settings.separator)) {
    settings.separator = defaults.separator;
  }

  if (R.is(String, settings.lastSeparator)) {
    lastItem = R.last(items);
    items = R.dropLast(1, items);
  }

  var result = items.join(settings.separator);

  if (lastItem) {
    result = [result, lastItem].join(settings.lastSeparator);
  }

  return result;
}

module.exports = join;