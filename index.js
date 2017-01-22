'use strict';
module.exports = function (str) {
	var result = '';
	var x;
	var len = str.length;
	var betweenQuotes = false;
	var quoteChar;
	for (x = 0; x < len; x++) {
		// found double-quote or single-quote
		if (str[x] === '"' || str[x] === '\'') {
			// if not processing in between quotes
			if (!betweenQuotes) {
				quoteChar = str[x];
				betweenQuotes = true;
				result += '\'';
			} else if (quoteChar === str[x]) {
				// if processing between quotes
				// close quotes
				result += '\'';
				betweenQuotes = false;
			} else {
				// still inside quotes
				result += '\\\'';
			}
		} else if (str[x] === '\\' && (str[x + 1] === '\'' || str[x + 1] === '"')) {
			// if escape character is found and double or single quote after
			// escape + single-quote
			if (str[x + 1] === '\'') {
				result += '\\\\\'';
				x++;
			} else if (str[x + 1] === '"') {
				// escape + double-quote
				result += '"';
				x++;
			} else {
				result += str[x];
			}
		} else if (str[x] === '\\' && str[x + 1] === '\\') {
			// backslashes --> don't touch them
			result += '\\\\';
			x++;
		} else {
			result += str[x];
		}
	}
	return result;
};
