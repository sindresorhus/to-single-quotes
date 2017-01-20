'use strict';
module.exports = function (str) {
	var result = '';
	var x;
	var len = str.length;
	var betweenQuotes = false;
	var QuoteChar;
	for (x = 0; x < len; x++) {
		// FOUND DOUBLE-QUOTE OR SINGLE-QUOTE
		if (str[x] === '"' || str[x] === '\'') {
			// IF NOT PROCESSING IN BETWEEN QUOTES
			if (betweenQuotes === false) {
				QuoteChar = str[x];
				betweenQuotes = true;
				result += '\'';
			} else if (QuoteChar === str[x]) {
				// IF PROCESSING IN BETWEEN QUOTES
				// CLOSE QUOTES
				result += '\'';
				betweenQuotes = false;
			}	else {
					// STILL INSIDE QUOTES
				result += '\\\'';
			}
		} else if (str[x] === '\\' && (str[x + 1] === '\'' || str[x + 1] === '"')) {
			// IF ESCAPE CHARACTER IS FOUND AND DOUBLE OR SINGLE QUOTE AFTER
			// ESCAPE + SINGLE QUOTE
			if (str[x + 1] === '\'') {
				result += '\\\\\'';
				x++;
			} else if (str[x + 1] === '"') {
				// ESCAPE + DOUBLE QUOTE
				result += '"';
				x++;
			}			else				{
				result += str[x];
			}
		}		else if (str[x] === '\\' && str[x + 1] === '\\') {
			// BACKSLASHES --> DON'T TOUCHE THEM
			result += '\\\\';
			x++;
		}		else			{
			result += str[x];
		}
	}
	return result;
};
