'use strict';

var moment = require('moment');
var R = require('ramda');

var defaults = {
  format: undefined,
  inputFormat: undefined,
  utc: true
};

/**
 * Format a date or time using <a href="http://momentjs.com/">Moment.js</a>.
 *
 * Defaults to UTC mode since most use-cases in markup-land do not take
 * timezones into account, which results in some counter-intuitive output and
 * inconsistent behavior.
 *
 * @since v0.0.1
 * @param {Date|String|Number|Array|Object} [context]
 * @return {String}
 * @example
 *
 *   {{timestamp "2015-10-21" format="MMM Do, YYYY"}} //=> "Oct 21st, 2015"
 *
 *   {{timestamp "Oct 21 15" inputFormat="MMM DD YY" format="YYYY-MM-DD"}} //=> "2015-10-21"
 *
 *   {{timestamp "2000-01-01" format="YYYY" utc=false}} //=> "1999"
 */

module.exports = function timestamp (context, block) {
  var options, constructor, date;

  if (context && context.hash) {
    block = context;
    context = undefined;
  }

  options = (block && block.hash) ? R.merge(defaults, block.hash) : R.clone(defaults);
  constructor = (options.utc) ? moment.utc : moment;

  if (R.is(String, context) && R.isNil(options.inputFormat)) {
    context = Date.parse(context);
  }

  date = constructor(context, options.inputFormat);

  if (!date.isValid()) {
    throw new Error(
      'The "timestamp" helper must be passed a valid Date-like value.'
    );
  }

  return date.format(options.format);
};
