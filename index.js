'use strict';
module.exports = function (str) {
	return str.replace(/(?:\\*)?"([^"\\]*\\.)*[^"]*"/g, function (match) {
		return match
			.replace(/\\"/g, '"')            // unescape double-quotes
			.replace(/([^\\])'/g, '$1\\\'')  // escape single-quotes
			.replace(/^"|"$/g, '\'');        // convert
	});
};
