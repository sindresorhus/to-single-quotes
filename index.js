'use strict';
module.exports = function (str) {
	var result = '';
	var i;
	var betweenQuotes = false;
	var quoteChar;
	for (i = 0; i < str.length; i++) {
		// found double-quote or single-quote
		if (str[i] === '"' || str[i] === '\'') {
			// if not processing in between quotes
			if (!betweenQuotes) {
				quoteChar = str[i];
				betweenQuotes = true;
				result += '\'';
			} else if (quoteChar === str[i]) {
				// if processing between quotes
				// close quotes
				result += '\'';
				betweenQuotes = false;
			} else {
				// still inside quotes
				result += '\\\'';
			}
		} else if (str[i] === '\\' && (str[i + 1] === '\'' || str[i + 1] === '"')) {
			// if escape character is found and double or single quote after
			// escape + single-quote
			if (str[i + 1] === '\'') {
				result += '\\\\\'';
				i++;
			} else if (str[i + 1] === '"') {
				// escape + double-quote
				result += '"';
				i++;
			} else {
				result += str[i];
			}
		} else if (str[i] === '\\' && str[i + 1] === '\\') {
			// don't touch backslashes
			result += '\\\\';
			i++;
		} else {
			result += str[i];
		}
	}
	return result;
};
