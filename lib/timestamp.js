'use strict';

/**
 * Format a date or time using <a href="http://momentjs.com/">Moment.js</a>.
 *
 * @since v0.0.1
 * @param {Date|String|Number} context
 * @return {String}
 * @example
 *
 *   {{timestamp "2015-10-21" format="MMM Do, YYYY"}} //=> "Oct 21st, 2015"
 */

var moment = require('moment');
var defaultFormat = 'YYYY-MM-DD';

module.exports = function timestamp (fromDate, options) {
  var date = options ? fromDate : Date.now();
  var opts = options || fromDate;
  var format = opts.hash.format || defaultFormat;
  var isInvalid = isNaN(Date.parse(date));

  if (isInvalid) {
    throw new Error(
      'The "timestamp" helper must be passed a Date-parseable value.'
    );
  }
  return moment(date).format(format);
};
