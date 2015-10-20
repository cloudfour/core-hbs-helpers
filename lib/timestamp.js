'use strict';

var moment = require('moment');
var defaultFormat = 'YYYY-MM-DD';

module.exports = function timestamp (context, options) {
	var date = options ? context : Date.now();
	var options = options || context;
	var format = options.hash.format || defaultFormat;
	return moment(date).format(format);
};
