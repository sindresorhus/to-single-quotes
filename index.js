'use strict';
module.exports = str => {
	let result = '';
	let betweenQuotes = false;
	let quoteChar;

	for (let i = 0; i < str.length; i++) {
		const current = str[i];
		const next = str[i + 1];

		// Found double-quote or single-quote
		if (current === '"' || current === '\'') {
			// If not processing in between quotes
			if (!betweenQuotes) {
				quoteChar = current;
				betweenQuotes = true;
				result += '\'';
			} else if (quoteChar === current) {
				// If processing between quotes, close quotes
				result += '\'';
				betweenQuotes = false;
			} else {
				// Still inside quotes
				result += '\\\'';
			}
		} else if (current === '\\' && (next === '\'' || next === '"')) {
			// If escape character is found and double or single quote after
			// Escape + single-quote
			if (next === '\'') {
				result += '\\\\\'';
				i++;
			} else if (next === '"') {
				// Escape + double-quote
				result += '"';
				i++;
			} else {
				result += current;
			}
		} else if (current === '\\' && next === '\\') {
			// Don't touch backslashes
			result += '\\\\';
			i++;
		} else {
			result += current;
		}
	}

	return result;
};
