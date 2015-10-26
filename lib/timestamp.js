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

module.exports = function timestamp (context, options) {
	var date = options ? context : Date.now();
	var options = options || context;
	var format = options.hash.format || defaultFormat;
	return moment(date).format(format);
};
