'use strict';

function transform(input, toSingleQuotes) {
	let result = '';
	let betweenQuotes = false;
	let quoteChar;
	let changeTo = '';
	let toChange = '';

	if (toSingleQuotes) {
		changeTo = '\'';
		toChange = '"';
	}	else {
		changeTo = '"';
		toChange = '\'';
	}

	for (let i = 0; i < input.length; i++) {
		const current = input[i];
		const next = input[i + 1];

		// Found double-quote or single-quote
		if (current === '"' || current === '\'') {
			// If not processing in between quotes
			if (!betweenQuotes) {
				quoteChar = current;
				betweenQuotes = true;
				result += changeTo;
			} else if (quoteChar === current) {
				// If processing between quotes, close quotes
				result += changeTo;
				betweenQuotes = false;
			} else {
				// Still inside quotes
				result += '\\' + changeTo;
			}
		} else if (current === '\\' && (next === '\'' || next === '"')) {
			// If escape character is found and double or single quote after
			// Escape + quote to change to
			if (next === changeTo) {
				// If in between quotes and quote is equal to changeTo only escape once
				if (betweenQuotes && quoteChar === changeTo) {
					result += '\\' + changeTo;
				}	else {
					// Not between quotes, escape twice
					result += '\\\\' + changeTo;
				}
				i++;
			} else if (next === toChange) {
				// Escape + quote to be changed
				// If between quotes can mantain tochange
				if (betweenQuotes) {
					result += toChange;
				}	else {
					// Otherwise replace it by quote changeto
					result += changeTo;
				}
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
}

module.exports = input => transform(input, true);

module.exports._transform = transform;
