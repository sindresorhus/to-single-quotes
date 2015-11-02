'use strict';
module.exports = function toSingleQuotes(str) {
	var transformed = str.replace(/(?:\\*)?(["`])([^"`\\]*\\.)*[^"`]*\1/g, function (match) {
		return match
			// unescape double-quotes
			.replace(/\\"/g, '"')
			// unescape backticks
			.replace(/\\`/g, '`')
			// escape escapes
			.replace(/(^|[^\\])(\\+)'/g, '$1$2\\\'')
			// escape single-quotes - round 1
			.replace(/([^\\])'/g, '$1\\\'')
			// escape single-quotes - round 2 (for consecutive single-quotes)
			.replace(/([^\\])'/g, '$1\\\'')
			// convert
			.replace(/^["`]|["`]$/g, '\'');
	});
	if (transformed === str) {
		return transformed;
	}
	return toSingleQuotes(transformed);
};
